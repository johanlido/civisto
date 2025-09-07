import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface NotificationRequest {
  reportId: string
  municipalityCode: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface MunicipalityConfig {
  name: string
  email: string
  api_endpoint?: string
  webhook_url?: string
  notification_preferences: {
    email: boolean
    api: boolean
    webhook: boolean
  }
}

const MUNICIPALITIES: Record<string, MunicipalityConfig> = {
  '0180': {
    name: 'Stockholm',
    email: 'medborgarservice@stockholm.se',
    api_endpoint: 'https://api.stockholm.se/reports',
    webhook_url: 'https://webhook.stockholm.se/civisto',
    notification_preferences: {
      email: true,
      api: true,
      webhook: true
    }
  },
  '1480': {
    name: 'Göteborg',
    email: 'kontakt@goteborg.se',
    webhook_url: 'https://webhook.goteborg.se/civisto',
    notification_preferences: {
      email: true,
      api: false,
      webhook: true
    }
  },
  '1280': {
    name: 'Malmö',
    email: 'kontakt@malmo.se',
    notification_preferences: {
      email: true,
      api: false,
      webhook: false
    }
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const { reportId, municipalityCode, priority }: NotificationRequest = await req.json()

    if (!reportId || !municipalityCode) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: reportId, municipalityCode' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get report details
    const { data: report, error: reportError } = await supabaseClient
      .from('reports')
      .select(`
        *,
        users (
          username,
          display_name
        )
      `)
      .eq('id', reportId)
      .single()

    if (reportError || !report) {
      return new Response(
        JSON.stringify({ error: 'Report not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get municipality configuration
    const municipalityConfig = MUNICIPALITIES[municipalityCode]
    if (!municipalityConfig) {
      return new Response(
        JSON.stringify({ error: 'Municipality not supported' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const notifications: any[] = []

    // Send email notification
    if (municipalityConfig.notification_preferences.email) {
      const emailResult = await sendEmailNotification(report, municipalityConfig)
      notifications.push({
        type: 'email',
        success: emailResult.success,
        message: emailResult.message,
        timestamp: new Date().toISOString()
      })
    }

    // Send API notification
    if (municipalityConfig.notification_preferences.api && municipalityConfig.api_endpoint) {
      const apiResult = await sendApiNotification(report, municipalityConfig)
      notifications.push({
        type: 'api',
        success: apiResult.success,
        message: apiResult.message,
        timestamp: new Date().toISOString()
      })
    }

    // Send webhook notification
    if (municipalityConfig.notification_preferences.webhook && municipalityConfig.webhook_url) {
      const webhookResult = await sendWebhookNotification(report, municipalityConfig)
      notifications.push({
        type: 'webhook',
        success: webhookResult.success,
        message: webhookResult.message,
        timestamp: new Date().toISOString()
      })
    }

    // Log notification attempts
    const { error: logError } = await supabaseClient
      .from('notification_logs')
      .insert({
        report_id: reportId,
        municipality_code: municipalityCode,
        notifications: notifications
      })

    if (logError) {
      console.error('Failed to log notifications:', logError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        municipality: municipalityConfig.name,
        notifications,
        message: 'Municipality notifications sent successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in notify-municipality function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function sendEmailNotification(report: any, municipality: MunicipalityConfig) {
  try {
    const emailContent = generateEmailContent(report, municipality)
    
    // Use SendGrid or similar email service
    const response = await fetch('https://api.sendgrid.v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: municipality.email }],
          subject: `Ny medborgarrapport: ${report.title} [${report.priority.toUpperCase()}]`
        }],
        from: { email: 'noreply@civisto.com', name: 'Civisto' },
        content: [{
          type: 'text/html',
          value: emailContent
        }]
      })
    })

    if (response.ok) {
      return { success: true, message: 'Email sent successfully' }
    } else {
      const errorText = await response.text()
      return { success: false, message: `Email failed: ${errorText}` }
    }
  } catch (error) {
    return { success: false, message: `Email error: ${error.message}` }
  }
}

async function sendApiNotification(report: any, municipality: MunicipalityConfig) {
  try {
    const apiPayload = {
      id: report.id,
      title: report.title,
      description: report.description,
      category: report.category,
      priority: report.priority,
      location: {
        latitude: report.location?.coordinates?.[1],
        longitude: report.location?.coordinates?.[0]
      },
      reporter: {
        username: report.users?.username,
        display_name: report.users?.display_name
      },
      created_at: report.created_at,
      ai_analysis: report.ai_analysis
    }

    const response = await fetch(municipality.api_endpoint!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('MUNICIPALITY_API_KEY')}`,
        'X-Source': 'Civisto'
      },
      body: JSON.stringify(apiPayload)
    })

    if (response.ok) {
      return { success: true, message: 'API notification sent successfully' }
    } else {
      const errorText = await response.text()
      return { success: false, message: `API failed: ${errorText}` }
    }
  } catch (error) {
    return { success: false, message: `API error: ${error.message}` }
  }
}

async function sendWebhookNotification(report: any, municipality: MunicipalityConfig) {
  try {
    const webhookPayload = {
      event: 'report.created',
      data: {
        id: report.id,
        title: report.title,
        category: report.category,
        priority: report.priority,
        municipality_code: report.municipality_code,
        created_at: report.created_at
      },
      timestamp: new Date().toISOString()
    }

    // Generate HMAC signature for webhook security
    const signature = await generateWebhookSignature(JSON.stringify(webhookPayload))

    const response = await fetch(municipality.webhook_url!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Civisto-Signature': signature,
        'X-Civisto-Event': 'report.created'
      },
      body: JSON.stringify(webhookPayload)
    })

    if (response.ok) {
      return { success: true, message: 'Webhook sent successfully' }
    } else {
      const errorText = await response.text()
      return { success: false, message: `Webhook failed: ${errorText}` }
    }
  } catch (error) {
    return { success: false, message: `Webhook error: ${error.message}` }
  }
}

function generateEmailContent(report: any, municipality: MunicipalityConfig): string {
  const priorityColor = {
    low: '#28a745',
    medium: '#ffc107', 
    high: '#fd7e14',
    critical: '#dc3545'
  }[report.priority] || '#6c757d'

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Ny medborgarrapport från Civisto</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h1 style="color: #2c3e50; margin: 0;">Ny medborgarrapport</h1>
                <p style="margin: 10px 0 0 0; color: #6c757d;">Från Civisto till ${municipality.name}</p>
            </div>
            
            <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <h2 style="margin: 0; color: #2c3e50;">${report.title}</h2>
                    <span style="background: ${priorityColor}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-left: 15px;">
                        ${report.priority.toUpperCase()}
                    </span>
                </div>
                
                <p><strong>Kategori:</strong> ${report.category.replace('_', ' ')}</p>
                <p><strong>Beskrivning:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
                    ${report.description}
                </p>
                
                <p><strong>Rapporterad av:</strong> ${report.users?.display_name || 'Anonym'}</p>
                <p><strong>Datum:</strong> ${new Date(report.created_at).toLocaleString('sv-SE')}</p>
                
                ${report.ai_analysis ? `
                <div style="background: #e3f2fd; padding: 15px; border-radius: 4px; margin-top: 15px;">
                    <h3 style="margin: 0 0 10px 0; color: #1976d2;">AI-analys</h3>
                    <p><strong>Föreslagna åtgärder:</strong></p>
                    <ul>
                        ${report.ai_analysis.municipality_suggestions?.map((suggestion: string) => 
                            `<li>${suggestion}</li>`
                        ).join('') || '<li>Inga specifika förslag</li>'}
                    </ul>
                </div>
                ` : ''}
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0; color: #6c757d; font-size: 14px;">
                    Detta meddelande skickades automatiskt från Civisto.<br>
                    För frågor, kontakta <a href="mailto:support@civisto.com">support@civisto.com</a>
                </p>
            </div>
        </div>
    </body>
    </html>
  `
}

async function generateWebhookSignature(payload: string): Promise<string> {
  const secret = Deno.env.get('WEBHOOK_SECRET') || 'default-secret'
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload))
  const hashArray = Array.from(new Uint8Array(signature))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return `sha256=${hashHex}`
}
