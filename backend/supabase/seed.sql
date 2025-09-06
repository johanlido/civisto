-- Civisto Database Seed Data
-- This file populates the database with sample data for development and testing

-- Insert sample users (these would normally be created through auth.users)
-- Note: In production, users are created through Supabase Auth
INSERT INTO civisto.users (id, username, display_name, avatar_url, total_points, current_level) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'jane_hero', 'Jane the Hero', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane', 450, 5),
('550e8400-e29b-41d4-a716-446655440002', 'civic_mike', 'Mike Civic', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike', 280, 3),
('550e8400-e29b-41d4-a716-446655440003', 'anna_reporter', 'Anna Reporter', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna', 150, 2),
('550e8400-e29b-41d4-a716-446655440004', 'erik_guardian', 'Erik Guardian', 'https://api.dicebear.com/7.x/avataaars/svg?seed=erik', 720, 8);

-- Insert sample reports with various categories and priorities
INSERT INTO civisto.reports (id, user_id, title, description, category, status, priority, location, images, municipality_code, ai_analysis) VALUES
(
    '660e8400-e29b-41d4-a716-446655440001',
    '550e8400-e29b-41d4-a716-446655440001',
    'Broken Swing at Tantolunden Park',
    'The main swing set has a broken chain and poses a safety risk for children. The metal is rusted and the seat is hanging dangerously.',
    'parks_green_areas',
    'submitted',
    'high',
    ST_GeogFromText('POINT(18.0686 59.3293)'),
    '["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"]',
    '0180',
    '{"has_people": false, "damage_detected": true, "suggested_priority": "high", "sentiment_score": 0.3, "keywords": ["broken", "swing", "safety", "children", "rusted"]}'
),
(
    '660e8400-e29b-41d4-a716-446655440002',
    '550e8400-e29b-41d4-a716-446655440002',
    'Pothole on Drottninggatan',
    'Large pothole near the intersection with Kungsgatan. Cars are swerving to avoid it, creating traffic hazards.',
    'road_issues',
    'reviewing',
    'critical',
    ST_GeogFromText('POINT(18.0649 59.3326)'),
    '["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"]',
    '0180',
    '{"has_people": false, "damage_detected": true, "suggested_priority": "critical", "sentiment_score": 0.2, "keywords": ["pothole", "traffic", "hazard", "intersection"]}'
),
(
    '660e8400-e29b-41d4-a716-446655440003',
    '550e8400-e29b-41d4-a716-446655440003',
    'Graffiti on Historic Building',
    'Fresh graffiti appeared on the side of the old town hall. It covers about 3 square meters of the historic stone facade.',
    'graffiti_vandalism',
    'in_progress',
    'medium',
    ST_GeogFromText('POINT(18.0710 59.3251)'),
    '["https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400"]',
    '0180',
    '{"has_people": false, "damage_detected": true, "suggested_priority": "medium", "sentiment_score": 0.4, "keywords": ["graffiti", "historic", "building", "facade"]}'
),
(
    '660e8400-e29b-41d4-a716-446655440004',
    '550e8400-e29b-41d4-a716-446655440004',
    'Cyberbullying in Local Facebook Group',
    'Persistent harassment and hate speech targeting a local business owner in the "Stockholm Community" Facebook group. Multiple offensive comments and personal attacks.',
    'digital_harassment',
    'submitted',
    'high',
    ST_GeogFromText('POINT(18.0686 59.3293)'),
    '[]',
    '0180',
    '{"has_people": true, "damage_detected": false, "suggested_priority": "high", "sentiment_score": 0.1, "keywords": ["harassment", "hate", "speech", "bullying", "facebook"]}'
),
(
    '660e8400-e29b-41d4-a716-446655440005',
    '550e8400-e29b-41d4-a716-446655440001',
    'Missing Wheelchair Ramp',
    'The new cafe on Södermalm has no wheelchair accessibility. There are 3 steps to enter with no alternative access route.',
    'accessibility',
    'submitted',
    'medium',
    ST_GeogFromText('POINT(18.0649 59.3162)'),
    '["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"]',
    '0180',
    '{"has_people": false, "damage_detected": true, "suggested_priority": "medium", "sentiment_score": 0.5, "keywords": ["wheelchair", "accessibility", "ramp", "steps", "cafe"]}'
);

-- Insert sample comments
INSERT INTO civisto.report_comments (report_id, user_id, content) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'I saw this too! My kids love this park, hope it gets fixed soon.'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Thanks for reporting this. I''ll avoid bringing my toddler here until it''s repaired.'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'This pothole has been growing for weeks. Definitely needs urgent attention!'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Such a shame to see historic buildings vandalized like this.');

-- Insert sample reactions
INSERT INTO civisto.report_reactions (report_id, user_id, reaction_type) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'support'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'support'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440004', 'like'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'concern'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'concern'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'support'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 'like'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'support'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'support');

-- Assign user badges based on their activity
INSERT INTO civisto.user_badges (user_id, badge_id) 
SELECT u.id, b.id 
FROM civisto.users u, civisto.badges b 
WHERE (u.username = 'jane_hero' AND b.name IN ('first_report', 'reporter_pro', 'park_guardian'))
   OR (u.username = 'civic_mike' AND b.name IN ('first_report', 'reporter_pro'))
   OR (u.username = 'anna_reporter' AND b.name = 'first_report')
   OR (u.username = 'erik_guardian' AND b.name IN ('first_report', 'reporter_pro', 'community_hero', 'digital_defender'));

-- Create some additional weekly/daily quests
INSERT INTO civisto.quests (title, description, type, requirements, rewards, is_active) VALUES
('Weekly Warrior', 'Submit 3 reports this week', 'weekly', 
 '{"action": "submit_report", "count": 3, "timeframe": "week"}', 
 '{"points": 200}', true),
('Daily Difference', 'Submit 1 report today', 'daily',
 '{"action": "submit_report", "count": 1, "timeframe": "day"}',
 '{"points": 50}', true),
('Accessibility Advocate', 'Report 3 accessibility issues', 'milestone',
 '{"action": "submit_report", "category": "accessibility", "count": 3}',
 '{"points": 300, "badge": "accessibility_champion"}', true),
('Digital Defender Pro', 'Report 10 instances of digital harassment', 'milestone',
 '{"action": "submit_report", "category": "digital_harassment", "count": 10}',
 '{"points": 500, "badge": "digital_defender_pro"}', true);

-- Assign active quests to users
INSERT INTO civisto.user_quests (user_id, quest_id, status, progress)
SELECT u.id, q.id, 'active', '{}'::jsonb
FROM civisto.users u
CROSS JOIN civisto.quests q
WHERE q.is_active = true;

-- Update some quest progress for demonstration
UPDATE civisto.user_quests 
SET progress = '{"count": 2}'::jsonb
WHERE user_id = '550e8400-e29b-41d4-a716-446655440001' 
  AND quest_id IN (SELECT id FROM civisto.quests WHERE title = 'Weekly Warrior');

UPDATE civisto.user_quests 
SET status = 'completed', progress = '{"count": 1}'::jsonb, completed_at = NOW()
WHERE user_id = '550e8400-e29b-41d4-a716-446655440002' 
  AND quest_id IN (SELECT id FROM civisto.quests WHERE title = 'Daily Difference');

-- Add notification logs table for tracking municipality notifications
CREATE TABLE IF NOT EXISTS civisto.notification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES civisto.reports(id) NOT NULL,
    municipality_code VARCHAR(10) NOT NULL,
    notifications JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample notification logs
INSERT INTO civisto.notification_logs (report_id, municipality_code, notifications) VALUES
('660e8400-e29b-41d4-a716-446655440001', '0180', '[{"type": "email", "success": true}, {"type": "api", "success": true}]'),
('660e8400-e29b-41d4-a716-446655440002', '0180', '[{"type": "email", "success": true}, {"type": "api", "success": false}]'),
('660e8400-e29b-41d4-a716-446655440003', '0180', '[{"type": "email", "success": true}]');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON civisto.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_category ON civisto.reports(category);
CREATE INDEX IF NOT EXISTS idx_reports_status ON civisto.reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_priority ON civisto.reports(priority);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON civisto.reports(created_at);
CREATE INDEX IF NOT EXISTS idx_user_quests_user_id ON civisto.user_quests(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quests_status ON civisto.user_quests(status);
CREATE INDEX IF NOT EXISTS idx_report_comments_report_id ON civisto.report_comments(report_id);
CREATE INDEX IF NOT EXISTS idx_report_reactions_report_id ON civisto.report_reactions(report_id);

-- Create a view for report statistics
CREATE OR REPLACE VIEW civisto.report_stats AS
SELECT 
    category,
    status,
    priority,
    COUNT(*) as count,
    AVG(CASE WHEN ai_analysis ? 'sentiment_score' THEN (ai_analysis->>'sentiment_score')::float ELSE NULL END) as avg_sentiment
FROM civisto.reports
GROUP BY category, status, priority;

-- Create a view for user leaderboard
CREATE OR REPLACE VIEW civisto.user_leaderboard AS
SELECT 
    u.id,
    u.username,
    u.display_name,
    u.avatar_url,
    u.total_points,
    u.current_level,
    COUNT(r.id) as total_reports,
    COUNT(CASE WHEN r.created_at > NOW() - INTERVAL '30 days' THEN 1 END) as reports_last_30_days,
    ARRAY_AGG(DISTINCT b.name) FILTER (WHERE b.name IS NOT NULL) as badges,
    ROW_NUMBER() OVER (ORDER BY u.total_points DESC) as rank
FROM civisto.users u
LEFT JOIN civisto.reports r ON u.id = r.user_id
LEFT JOIN civisto.user_badges ub ON u.id = ub.user_id
LEFT JOIN civisto.badges b ON ub.badge_id = b.id
GROUP BY u.id, u.username, u.display_name, u.avatar_url, u.total_points, u.current_level
ORDER BY u.total_points DESC;

-- Create a function to get nearby reports
CREATE OR REPLACE FUNCTION civisto.get_nearby_reports(
    center_lat FLOAT,
    center_lng FLOAT,
    radius_meters INTEGER DEFAULT 1000,
    limit_count INTEGER DEFAULT 50
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    category civisto.report_category_enum,
    status civisto.report_status_enum,
    priority civisto.priority_enum,
    distance_meters FLOAT,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id,
        r.title,
        r.category,
        r.status,
        r.priority,
        ST_Distance(r.location, ST_GeogFromText('POINT(' || center_lng || ' ' || center_lat || ')')) as distance_meters,
        r.created_at
    FROM civisto.reports r
    WHERE ST_DWithin(
        r.location, 
        ST_GeogFromText('POINT(' || center_lng || ' ' || center_lat || ')'), 
        radius_meters
    )
    ORDER BY distance_meters
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA civisto TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA civisto TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA civisto TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA civisto TO authenticated;

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE civisto.reports;
ALTER PUBLICATION supabase_realtime ADD TABLE civisto.report_comments;
ALTER PUBLICATION supabase_realtime ADD TABLE civisto.report_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE civisto.users;

