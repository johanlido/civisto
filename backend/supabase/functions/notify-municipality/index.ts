// Civisto Municipality Notification Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface NotificationRequest {
  reportId: string
  municipalityCode: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface MunicipalityContact {
  code: string
  name: string
  email: string
  api_endpoint?: string
  notification_preferences: {
    email: boolean
    api: boolean
    webhook: boolean
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { reportId, municipalityCode, priority }: NotificationRequest = await req.json()

    // Get report details
    const { data: report, error: reportError } = await supabaseClient
      .from('reports')
      .select(`
        *,
        users:user_id (username, display_name)
      `)
      .eq('id', reportId)
      .single()

    if (reportError) throw reportError

    // Get municipality contact information
    const municipalityContact = await getMunicipalityContact(municipalityCode)

    // Send notifications based on municipality preferences
    const notifications = []

    if (municipalityContact.notification_preferences.email) {
      const emailResult = await sendEmailNotification(municipalityContact, report)
      notifications.push({ type: 'email', success: emailResult.success })
    }

    if (municipalityContact.notification_preferences.api && municipalityContact.api_endpoint) {
      const apiResult = await sendApiNotification(municipalityContact, report)
      notifications.push({ type: 'api', success: apiResult.success })
    }

    if (municipalityContact.notification_preferences.webhook) {
      const webhookResult = await sendWebhookNotification(municipalityContact, report)
      notifications.push({ type: 'webhook', success: webhookResult.success })
    }

    // Log notification attempt
    await logNotification(supabaseClient, reportId, municipalityCode, notifications)

    return new Response(
      JSON.stringify({ 
        success: true, 
        notifications,
        municipality: municipalityContact.name
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

async function getMunicipalityContact(code: string): Promise<MunicipalityContact> {
  // In a real implementation, this would be stored in the database
  // For now, we'll use a mock mapping of Swedish municipalities
  const municipalities: Record<string, MunicipalityContact> = {
    '0180': {
      code: '0180',
      name: 'Stockholm',
      email: 'medborgarservice@stockholm.se',
      api_endpoint: 'https://api.stockholm.se/reports',
      notification_preferences: {
        email: true,
        api: true,
        webhook: false
      }
    },
    '1480': {
      code: '1480',
      name: 'Göteborg',
      email: 'kontakt@goteborg.se',
      notification_preferences: {
        email: true,
        api: false,
        webhook: true
      }
    },
    '1280': {
      code: '1280',
      name: 'Malmö',
      email: 'kontakt@malmo.se',
      notification_preferences: {
        email: true,
        api: false,
        webhook: false
      }
    }
  }

  return municipalities[code] || {
    code,
    name: 'Unknown Municipality',
    email: 'info@kommun.se',
    notification_preferences: {
      email: true,
      api: false,
      webhook: false
    }
  }
}

async function sendEmailNotification(municipality: MunicipalityContact, report: any) {
  try {
    // In a real implementation, use a service like SendGrid, Resend, or similar
    const emailData = {
      to: municipality.email,
      from: 'noreply@civisto.com',
      subject: `[Civisto] New ${report.priority} Priority Report: ${report.title}`,
      html: generateEmailTemplate(municipality, report)
    }

    // Mock email sending - replace with actual email service
    console.log('Sending email:', emailData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100))

    return { success: true, method: 'email' }
  } catch (error) {
    console.error('Email notification failed:', error)
    return { success: false, method: 'email', error: error.message }
  }
}

async function sendApiNotification(municipality: MunicipalityContact, report: any) {
  try {
    const apiData = {
      id: report.id,
      title: report.title,
      description: report.description,
      category: report.category,
      priority: report.priority,
      location: {
        latitude: report.location.coordinates[1],
        longitude: report.location.coordinates[0]
      },
      images: report.images,
      reporter: {
        username: report.users.username,
        display_name: report.users.display_name
      },
      created_at: report.created_at,
      civisto_url: `https://civisto.com/reports/${report.id}`
    }

    const response = await fetch(municipality.api_endpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('MUNICIPALITY_API_KEY')}`
      },
      body: JSON.stringify(apiData)
    })

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`)
    }

    return { success: true, method: 'api' }
  } catch (error) {
    console.error('API notification failed:', error)
    return { success: false, method: 'api', error: error.message }
  }
}

async function sendWebhookNotification(municipality: MunicipalityContact, report: any) {
  try {
    // Mock webhook URL - in real implementation, this would be configured per municipality
    const webhookUrl = `https://webhook.${municipality.code}.se/civisto-reports`

    const webhookData = {
      event: 'report.created',
      report: {
        id: report.id,
        title: report.title,
        category: report.category,
        priority: report.priority,
        location: report.location,
        created_at: report.created_at
      },
      municipality_code: municipality.code
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Civisto-Signature': await generateWebhookSignature(webhookData)
      },
      body: JSON.stringify(webhookData)
    })

    return { success: response.ok, method: 'webhook' }
  } catch (error) {
    console.error('Webhook notification failed:', error)
    return { success: false, method: 'webhook', error: error.message }
  }
}

async function generateWebhookSignature(data: any): Promise<string> {
  // Generate HMAC signature for webhook security
  const secret = Deno.env.get('WEBHOOK_SECRET') || 'default-secret'
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(JSON.stringify(data))
  
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, messageData)
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

function generateEmailTemplate(municipality: MunicipalityContact, report: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Civisto Report</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #00B67A; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .priority-${report.priority} { 
                border-left: 4px solid ${getPriorityColor(report.priority)}; 
                padding-left: 15px; 
            }
            .footer { background: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🏛️ Civisto Report Notification</h1>
        </div>
        <div class="content">
            <h2>New ${report.priority.toUpperCase()} Priority Report</h2>
            
            <div class="priority-${report.priority}">
                <h3>${report.title}</h3>
                <p><strong>Category:</strong> ${report.category.replace('_', ' ')}</p>
                <p><strong>Description:</strong> ${report.description}</p>
                <p><strong>Priority:</strong> ${report.priority.toUpperCase()}</p>
                <p><strong>Reported by:</strong> ${report.users.display_name} (@${report.users.username})</p>
                <p><strong>Date:</strong> ${new Date(report.created_at).toLocaleString()}</p>
            </div>

            ${report.images && report.images.length > 0 ? `
                <h4>Attached Images:</h4>
                <ul>
                    ${report.images.map((img: string) => `<li><a href="${img}">View Image</a></li>`).join('')}
                </ul>
            ` : ''}

            <p>
                <a href="https://civisto.com/reports/${report.id}" 
                   style="background: #00B67A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    View Full Report on Civisto
                </a>
            </p>
        </div>
        <div class="footer">
            <p>This report was submitted through Civisto - AI-Driven Civic Intelligence Platform</p>
            <p>Municipality: ${municipality.name} | Report ID: ${report.id}</p>
        </div>
    </body>
    </html>
  `
}

function getPriorityColor(priority: string): string {
  const colors = {
    low: '#28a745',
    medium: '#ffc107', 
    high: '#fd7e14',
    critical: '#dc3545'
  }
  return colors[priority as keyof typeof colors] || '#6c757d'
}

async function logNotification(supabaseClient: any, reportId: string, municipalityCode: string, notifications: any[]) {
  // Log the notification attempt for tracking and analytics
  const { error } = await supabaseClient
    .from('notification_logs')
    .insert({
      report_id: reportId,
      municipality_code: municipalityCode,
      notifications: notifications,
      created_at: new Date().toISOString()
    })

  if (error) {
    console.error('Failed to log notification:', error)
  }
}

