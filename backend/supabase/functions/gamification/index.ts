// Civisto Gamification Edge Function
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

interface GamificationRequest {
  userId: string
  action: 'complete_quest' | 'award_badge' | 'calculate_leaderboard' | 'generate_personal_quests'
  data?: any
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

    const { userId, action, data }: GamificationRequest = await req.json()

    let result

    switch (action) {
      case 'complete_quest':
        result = await completeQuest(supabaseClient, userId, data.questId)
        break
      case 'award_badge':
        result = await awardBadge(supabaseClient, userId, data.badgeId)
        break
      case 'calculate_leaderboard':
        result = await calculateLeaderboard(supabaseClient, data.timeframe)
        break
      case 'generate_personal_quests':
        result = await generatePersonalQuests(supabaseClient, userId)
        break
      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify({ success: true, result }),
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

async function completeQuest(supabaseClient: any, userId: string, questId: string) {
  // Get quest details
  const { data: quest, error: questError } = await supabaseClient
    .from('quests')
    .select('*')
    .eq('id', questId)
    .single()

  if (questError) throw questError

  // Mark quest as completed
  const { error: updateError } = await supabaseClient
    .from('user_quests')
    .update({ 
      status: 'completed', 
      completed_at: new Date().toISOString() 
    })
    .eq('user_id', userId)
    .eq('quest_id', questId)

  if (updateError) throw updateError

  // Award rewards
  if (quest.rewards.points) {
    await awardPoints(supabaseClient, userId, quest.rewards.points)
  }

  if (quest.rewards.badge) {
    await awardBadgeByName(supabaseClient, userId, quest.rewards.badge)
  }

  return { questCompleted: true, rewards: quest.rewards }
}

async function awardBadge(supabaseClient: any, userId: string, badgeId: string) {
  const { error } = await supabaseClient
    .from('user_badges')
    .insert({ user_id: userId, badge_id: badgeId })

  if (error && !error.message.includes('duplicate')) {
    throw error
  }

  return { badgeAwarded: true }
}

async function awardBadgeByName(supabaseClient: any, userId: string, badgeName: string) {
  // Get badge by name
  const { data: badge, error: badgeError } = await supabaseClient
    .from('badges')
    .select('id')
    .eq('name', badgeName)
    .single()

  if (badgeError) throw badgeError

  return await awardBadge(supabaseClient, userId, badge.id)
}

async function awardPoints(supabaseClient: any, userId: string, points: number) {
  // Get current user points
  const { data: user, error: userError } = await supabaseClient
    .from('users')
    .select('total_points')
    .eq('id', userId)
    .single()

  if (userError) throw userError

  const newTotal = (user.total_points || 0) + points
  const newLevel = calculateLevel(newTotal)

  // Update user points and level
  const { error: updateError } = await supabaseClient
    .from('users')
    .update({ 
      total_points: newTotal,
      current_level: newLevel
    })
    .eq('id', userId)

  if (updateError) throw updateError

  return { pointsAwarded: points, newTotal, newLevel }
}

function calculateLevel(points: number): number {
  // Level progression: 100 points per level for first 5 levels, then 200 per level
  if (points < 500) {
    return Math.max(1, Math.floor(points / 100) + 1)
  } else {
    return Math.max(6, Math.floor((points - 500) / 200) + 6)
  }
}

async function calculateLeaderboard(supabaseClient: any, timeframe: string = 'all_time') {
  let query = supabaseClient
    .from('users')
    .select('id, username, display_name, avatar_url, total_points, current_level')
    .order('total_points', { ascending: false })
    .limit(100)

  // For weekly/monthly leaderboards, we'd need to track points by time period
  // This is a simplified version showing all-time leaderboard
  
  const { data: leaderboard, error } = await query

  if (error) throw error

  return leaderboard.map((user, index) => ({
    ...user,
    rank: index + 1
  }))
}

async function generatePersonalQuests(supabaseClient: any, userId: string) {
  // Get user's profile and history
  const { data: user, error: userError } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (userError) throw userError

  // Get user's report history
  const { data: reports, error: reportsError } = await supabaseClient
    .from('reports')
    .select('category, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50)

  if (reportsError) throw reportsError

  // Analyze user behavior and generate personalized quests
  const personalQuests = []

  // Quest based on favorite category
  if (reports.length > 0) {
    const categoryCount = reports.reduce((acc, report) => {
      acc[report.category] = (acc[report.category] || 0) + 1
      return acc
    }, {})

    const favoriteCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    )

    personalQuests.push({
      title: `${favoriteCategory.replace('_', ' ')} Expert`,
      description: `Continue your expertise in ${favoriteCategory.replace('_', ' ')} - submit 3 more reports`,
      type: 'personal',
      requirements: {
        action: 'submit_report',
        category: favoriteCategory,
        count: 3
      },
      rewards: {
        points: 200,
        badge: `${favoriteCategory}_expert`
      }
    })
  }

  // Streak quest
  const recentReports = reports.filter(report => {
    const reportDate = new Date(report.created_at)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return reportDate > weekAgo
  })

  if (recentReports.length > 0) {
    personalQuests.push({
      title: 'Keep the Momentum',
      description: 'You\'re on a roll! Submit 2 more reports this week',
      type: 'weekly',
      requirements: {
        action: 'submit_report',
        count: 2,
        timeframe: 'week'
      },
      rewards: {
        points: 150
      }
    })
  }

  // New area exploration quest
  personalQuests.push({
    title: 'Area Explorer',
    description: 'Explore a new area and submit a report there',
    type: 'exploration',
    requirements: {
      action: 'submit_report',
      count: 1,
      new_area: true
    },
    rewards: {
      points: 100,
      badge: 'explorer'
    }
  })

  return personalQuests
}

