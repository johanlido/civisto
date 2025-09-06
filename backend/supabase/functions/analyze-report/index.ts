// Civisto AI Report Analysis Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface ReportAnalysisRequest {
  reportId: string
  title: string
  description: string
  category: string
  images?: string[]
}

interface AIAnalysisResult {
  has_people: boolean
  damage_detected: boolean
  suggested_priority: 'low' | 'medium' | 'high' | 'critical'
  sentiment_score: number
  keywords: string[]
  municipality_suggestions?: string[]
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

    const { reportId, title, description, category, images }: ReportAnalysisRequest = await req.json()

    // Perform AI analysis
    const analysis = await analyzeReport(title, description, category, images)

    // Update report with AI analysis
    const { error } = await supabaseClient
      .from('reports')
      .update({ 
        ai_analysis: analysis,
        priority: analysis.suggested_priority 
      })
      .eq('id', reportId)

    if (error) {
      throw error
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
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

async function analyzeReport(
  title: string, 
  description: string, 
  category: string, 
  images?: string[]
): Promise<AIAnalysisResult> {
  // Combine text for analysis
  const fullText = `${title} ${description}`.toLowerCase()
  
  // Basic sentiment analysis
  const negativeWords = ['broken', 'damaged', 'dangerous', 'unsafe', 'dirty', 'blocked', 'missing']
  const urgentWords = ['emergency', 'urgent', 'critical', 'immediate', 'danger', 'hazard']
  
  const negativeScore = negativeWords.filter(word => fullText.includes(word)).length
  const urgentScore = urgentWords.filter(word => fullText.includes(word)).length
  
  // Determine priority based on category and content
  let priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  
  if (urgentScore > 0 || category === 'safety_hazards') {
    priority = 'critical'
  } else if (negativeScore > 2 || ['road_issues', 'accessibility'].includes(category)) {
    priority = 'high'
  } else if (negativeScore > 0) {
    priority = 'medium'
  } else {
    priority = 'low'
  }

  // Extract keywords
  const keywords = extractKeywords(fullText)
  
  // Mock image analysis (in real implementation, use computer vision API)
  const has_people = images ? Math.random() > 0.7 : false
  const damage_detected = negativeScore > 0 || Math.random() > 0.5

  // Generate municipality suggestions based on category
  const municipality_suggestions = generateMunicipalitySuggestions(category, fullText)

  return {
    has_people,
    damage_detected,
    suggested_priority: priority,
    sentiment_score: Math.max(0, 1 - (negativeScore * 0.2)),
    keywords,
    municipality_suggestions
  }
}

function extractKeywords(text: string): string[] {
  const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'cannot', 'this', 'that', 'these', 'those']
  
  return text
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word))
    .slice(0, 10) // Top 10 keywords
}

function generateMunicipalitySuggestions(category: string, text: string): string[] {
  const suggestions: Record<string, string[]> = {
    'road_issues': [
      'Contact road maintenance department',
      'Report to traffic safety unit',
      'Schedule infrastructure inspection'
    ],
    'parks_green_areas': [
      'Forward to parks and recreation',
      'Schedule maintenance crew visit',
      'Contact environmental services'
    ],
    'safety_hazards': [
      'Immediate safety assessment required',
      'Contact emergency services if urgent',
      'Schedule safety inspection'
    ],
    'accessibility': [
      'Review ADA compliance',
      'Contact accessibility coordinator',
      'Schedule accessibility audit'
    ],
    'digital_harassment': [
      'Forward to cybercrime unit',
      'Document evidence for investigation',
      'Provide victim support resources'
    ]
  }

  return suggestions[category] || [
    'Review and categorize report',
    'Assign to appropriate department',
    'Schedule follow-up within 48 hours'
  ]
}

