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
  municipality_suggestions: string[]
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
    const { reportId, title, description, category, images = [] }: ReportAnalysisRequest = await req.json()

    // Validate required fields
    if (!reportId || !title || !description || !category) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: reportId, title, description, category' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Prepare AI analysis prompt
    const analysisPrompt = `
    Analyze this civic report and provide structured analysis:
    
    Title: ${title}
    Description: ${description}
    Category: ${category}
    
    Please analyze and return JSON with:
    1. has_people: boolean (are people visible/mentioned in safety context)
    2. damage_detected: boolean (is there physical damage or deterioration)
    3. suggested_priority: "low" | "medium" | "high" | "critical" (urgency level)
    4. sentiment_score: number 0.0-1.0 (0=very negative, 1=very positive)
    5. keywords: string[] (5-10 relevant keywords for search)
    6. municipality_suggestions: string[] (2-3 actionable suggestions for local authorities)
    
    Consider:
    - Safety implications for priority
    - Community impact
    - Urgency based on description
    - Actionable next steps for municipalities
    `

    // Call OpenAI API for analysis
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant specialized in analyzing civic reports for municipalities. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`)
    }

    const openaiData = await openaiResponse.json()
    const aiContent = openaiData.choices[0]?.message?.content

    if (!aiContent) {
      throw new Error('No analysis content received from AI')
    }

    // Parse AI response
    let analysis: AIAnalysisResult
    try {
      analysis = JSON.parse(aiContent)
    } catch (parseError) {
      // Fallback analysis if AI response is malformed
      console.error('Failed to parse AI response:', parseError)
      analysis = {
        has_people: description.toLowerCase().includes('people') || description.toLowerCase().includes('person'),
        damage_detected: description.toLowerCase().includes('broken') || description.toLowerCase().includes('damage'),
        suggested_priority: category === 'safety_hazards' ? 'high' : 'medium',
        sentiment_score: 0.3, // Assume negative since it's a problem report
        keywords: [title.toLowerCase(), category.replace('_', ' ')],
        municipality_suggestions: [
          'Investigate reported issue',
          'Schedule appropriate response team'
        ]
      }
    }

    // Update report with AI analysis
    const { error: updateError } = await supabaseClient
      .from('reports')
      .update({ 
        ai_analysis: analysis,
        priority: analysis.suggested_priority 
      })
      .eq('id', reportId)

    if (updateError) {
      throw new Error(`Failed to update report: ${updateError.message}`)
    }

    // Log successful analysis
    console.log(`AI analysis completed for report ${reportId}:`, analysis)

    return new Response(
      JSON.stringify({ 
        success: true, 
        analysis,
        message: 'Report analysis completed successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in analyze-report function:', error)
    
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

