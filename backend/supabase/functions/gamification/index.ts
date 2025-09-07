import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface GamificationRequest {
  userId: string
  action: 'generate_personal_quests' | 'check_badge_eligibility' | 'calculate_leaderboard'
  data?: any
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
    const { userId, action, data = {} }: GamificationRequest = await req.json()

    if (!userId || !action) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: userId, action' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    let result: any = {}

    switch (action) {
      case 'generate_personal_quests':
        result = await generatePersonalQuests(supabaseClient, userId)
        break
      
      case 'check_badge_eligibility':
        result = await checkBadgeEligibility(supabaseClient, userId)
        break
      
      case 'calculate_leaderboard':
        result = await calculateLeaderboard(supabaseClient)
        break
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: result,
        message: `${action} completed successfully`
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in gamification function:', error)
    
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

async function generatePersonalQuests(supabaseClient: any, userId: string) {
  // Get user's report history to generate personalized quests
  const { data: userReports } = await supabaseClient
    .from('reports')
    .select('category, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: userStats } = await supabaseClient
    .from('users')
    .select('total_points, current_level')
    .eq('id', userId)
    .single()

  // Generate personalized quest suggestions based on user behavior
  const personalQuests = []
  
  if (!userReports || userReports.length === 0) {
    // New user quests
    personalQuests.push({
      title: "Welcome to Civisto!",
      description: "Submit your first community report and start making a difference",
      type: "milestone",
      requirements: { action: "submit_report", count: 1 },
      rewards: { points: 100, badge: "first_report" },
      priority: "high"
    })
  } else {
    // Experienced user quests based on their activity
    const recentCategories = [...new Set(userReports.map(r => r.category))]
    
    if (recentCategories.length === 1) {
      // Encourage diversity
      personalQuests.push({
        title: "Expand Your Impact",
        description: "Try reporting in a different category to help more areas of your community",
        type: "weekly",
        requirements: { action: "submit_report", different_category: true, count: 2 },
        rewards: { points: 150 },
        priority: "medium"
      })
    }
    
    if (userStats?.current_level >= 3) {
      // Advanced user quests
      personalQuests.push({
        title: "Community Leader",
        description: "Help engage the community by commenting on 5 other reports",
        type: "weekly",
        requirements: { action: "comment_on_report", count: 5 },
        rewards: { points: 200 },
        priority: "medium"
      })
    }
  }

  return { personalQuests, userStats }
}

async function checkBadgeEligibility(supabaseClient: any, userId: string) {
  // Get user's current stats
  const { data: userStats } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  const { data: userReports } = await supabaseClient
    .from('reports')
    .select('category, created_at')
    .eq('user_id', userId)

  const { data: userBadges } = await supabaseClient
    .from('user_badges')
    .select('badge_id, badges(name)')
    .eq('user_id', userId)

  const earnedBadgeNames = userBadges?.map(ub => ub.badges.name) || []
  const eligibleBadges = []

  // Check badge eligibility
  const reportCount = userReports?.length || 0
  const categoryCount = (category: string) => 
    userReports?.filter(r => r.category === category).length || 0

  // Reporter Pro badge
  if (reportCount >= 10 && !earnedBadgeNames.includes('reporter_pro')) {
    eligibleBadges.push({
      name: 'reporter_pro',
      title: 'Reporter Pro',
      description: 'Submit 10 reports',
      progress: reportCount,
      required: 10
    })
  }

  // Community Hero badge
  if (reportCount >= 50 && !earnedBadgeNames.includes('community_hero')) {
    eligibleBadges.push({
      name: 'community_hero',
      title: 'Community Hero',
      description: 'Submit 50 reports',
      progress: reportCount,
      required: 50
    })
  }

  // Park Guardian badge
  const parkReports = categoryCount('parks_green_areas')
  if (parkReports >= 5 && !earnedBadgeNames.includes('park_guardian')) {
    eligibleBadges.push({
      name: 'park_guardian',
      title: 'Park Guardian',
      description: 'Submit 5 park-related reports',
      progress: parkReports,
      required: 5
    })
  }

  // Safety Champion badge
  const safetyReports = categoryCount('safety_hazards')
  if (safetyReports >= 10 && !earnedBadgeNames.includes('safety_champion')) {
    eligibleBadges.push({
      name: 'safety_champion',
      title: 'Safety Champion',
      description: 'Submit 10 safety reports',
      progress: safetyReports,
      required: 10
    })
  }

  // Digital Defender badge
  const digitalReports = categoryCount('digital_harassment')
  if (digitalReports >= 5 && !earnedBadgeNames.includes('digital_defender')) {
    eligibleBadges.push({
      name: 'digital_defender',
      title: 'Digital Defender',
      description: 'Submit 5 digital harassment reports',
      progress: digitalReports,
      required: 5
    })
  }

  return { eligibleBadges, currentStats: userStats }
}

async function calculateLeaderboard(supabaseClient: any) {
  // Get top users for leaderboard
  const { data: leaderboard } = await supabaseClient
    .from('user_leaderboard')
    .select('*')
    .limit(100)

  // Calculate additional stats
  const { data: totalStats } = await supabaseClient
    .from('reports')
    .select('id, created_at')

  const totalReports = totalStats?.length || 0
  const reportsThisWeek = totalStats?.filter(r => 
    new Date(r.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length || 0

  return {
    leaderboard,
    stats: {
      totalReports,
      reportsThisWeek,
      activeUsers: leaderboard?.length || 0
    }
  }
}
