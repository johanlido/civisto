-- Civisto Seed Data
-- Sample data for testing and development

-- Insert sample users (these will be created when users sign up via auth)
-- We'll create some sample data that references these user IDs

-- Sample user data (assuming these users have signed up)
INSERT INTO civisto.users (id, username, display_name, avatar_url, total_points, current_level, badges) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'jane_hero', 'Jane Hero', 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane', 750, 5, '["first_report", "reporter_pro"]'::jsonb),
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'civic_mike', 'Mike Civic', 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike', 450, 3, '["first_report"]'::jsonb),
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'anna_reporter', 'Anna Reporter', 'https://api.dicebear.com/7.x/avataaars/svg?seed=anna', 250, 2, '["first_report"]'::jsonb),
('d4e5f6g7-h8i9-0123-4567-890123defghi', 'erik_guardian', 'Erik Guardian', 'https://api.dicebear.com/7.x/avataaars/svg?seed=erik', 1200, 8, '["first_report", "reporter_pro", "community_hero", "park_guardian"]'::jsonb);

-- Sample reports with geospatial data (Stockholm coordinates)
INSERT INTO civisto.reports (id, user_id, title, description, category, status, priority, location, images, municipality_code, ai_analysis) VALUES
(
    'f1e2d3c4-b5a6-7890-1234-abcdef123456',
    'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    'Broken Swing at Tantolunden Park',
    'The main swing set has a broken chain and poses a safety hazard for children. The metal is rusted and the seat is hanging dangerously. This needs immediate attention as many families use this playground daily.',
    'parks_green_areas',
    'submitted',
    'high',
    ST_GeogFromText('POINT(18.0686 59.3293)'),
    '["https://example.com/images/broken-swing-1.jpg", "https://example.com/images/broken-swing-2.jpg"]'::jsonb,
    '0180',
    '{
        "has_people": false,
        "damage_detected": true,
        "suggested_priority": "high",
        "sentiment_score": 0.2,
        "keywords": ["broken", "swing", "safety", "children", "playground", "tantolunden"],
        "municipality_suggestions": [
            "Forward to parks and recreation department",
            "Schedule immediate safety inspection",
            "Consider temporary closure until repair"
        ]
    }'::jsonb
),
(
    'g2f3e4d5-c6b7-8901-2345-bcdef1234567',
    'b2c3d4e5-f6g7-8901-2345-678901bcdefg',
    'Large Pothole on Drottninggatan',
    'There is a significant pothole on Drottninggatan near the intersection with Kungsgatan. It is causing damage to vehicles and creating a traffic hazard. The hole is approximately 1 meter wide and 20cm deep.',
    'road_issues',
    'reviewing',
    'medium',
    ST_GeogFromText('POINT(18.0649 59.3326)'),
    '["https://example.com/images/pothole-drottninggatan.jpg"]'::jsonb,
    '0180',
    '{
        "has_people": false,
        "damage_detected": true,
        "suggested_priority": "medium",
        "sentiment_score": 0.3,
        "keywords": ["pothole", "road", "traffic", "damage", "drottninggatan"],
        "municipality_suggestions": [
            "Forward to road maintenance department",
            "Schedule road repair within 2 weeks",
            "Consider temporary traffic cones for safety"
        ]
    }'::jsonb
),
(
    'h3g4f5e6-d7c8-9012-3456-cdef12345678',
    'c3d4e5f6-g7h8-9012-3456-789012cdefgh',
    'Graffiti on Historic Building',
    'Someone has spray-painted graffiti on the side of the historic Gamla Stan building at Stortorget. The graffiti covers a significant portion of the medieval wall and detracts from the historic character of the area.',
    'graffiti_vandalism',
    'in_progress',
    'low',
    ST_GeogFromText('POINT(18.0710 59.3251)'),
    '["https://example.com/images/graffiti-gamla-stan.jpg"]'::jsonb,
    '0180',
    '{
        "has_people": false,
        "damage_detected": true,
        "suggested_priority": "low",
        "sentiment_score": 0.4,
        "keywords": ["graffiti", "vandalism", "historic", "gamla stan", "building"],
        "municipality_suggestions": [
            "Contact heritage preservation team",
            "Schedule professional graffiti removal",
            "Consider increased surveillance in the area"
        ]
    }'::jsonb
),
(
    'i4h5g6f7-e8d9-0123-4567-def123456789',
    'd4e5f6g7-h8i9-0123-4567-890123defghi',
    'Cyberbullying on Local Facebook Group',
    'There has been persistent harassment and cyberbullying in the "Stockholm Neighbors" Facebook group. Multiple users are targeting a local business owner with false accusations and personal attacks. This is affecting the person''s mental health and business reputation.',
    'digital_harassment',
    'submitted',
    'high',
    ST_GeogFromText('POINT(18.0686 59.3293)'),
    '["https://example.com/images/cyberbullying-screenshot.jpg"]'::jsonb,
    '0180',
    '{
        "has_people": true,
        "damage_detected": false,
        "suggested_priority": "high",
        "sentiment_score": 0.1,
        "keywords": ["cyberbullying", "harassment", "facebook", "mental health", "business"],
        "municipality_suggestions": [
            "Forward to digital safety coordinator",
            "Provide resources for cyberbullying support",
            "Consider mediation services"
        ]
    }'::jsonb
),
(
    'j5i6h7g8-f9e0-1234-5678-ef1234567890',
    'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    'Missing Wheelchair Ramp at Library',
    'The main entrance to Södermalm Library does not have a wheelchair ramp, making it inaccessible for people with mobility issues. There are three steps leading to the entrance with no alternative accessible route.',
    'accessibility',
    'submitted',
    'medium',
    ST_GeogFromText('POINT(18.0649 59.3181)'),
    '["https://example.com/images/library-steps.jpg"]'::jsonb,
    '0180',
    '{
        "has_people": false,
        "damage_detected": false,
        "suggested_priority": "medium",
        "sentiment_score": 0.3,
        "keywords": ["accessibility", "wheelchair", "ramp", "library", "mobility"],
        "municipality_suggestions": [
            "Forward to accessibility compliance team",
            "Schedule accessibility audit",
            "Plan ramp installation project"
        ]
    }'::jsonb
);

-- Sample comments on reports
INSERT INTO civisto.report_comments (report_id, user_id, content) VALUES
('f1e2d3c4-b5a6-7890-1234-abcdef123456', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'I saw this too when I was there with my kids yesterday. Definitely needs to be fixed ASAP!'),
('f1e2d3c4-b5a6-7890-1234-abcdef123456', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Thanks for reporting this. I''ll make sure to avoid that playground until it''s fixed.'),
('g2f3e4d5-c6b7-8901-2345-bcdef1234567', 'd4e5f6g7-h8i9-0123-4567-890123defghi', 'This pothole damaged my bike tire last week. Really hope they fix it soon.'),
('h3g4f5e6-d7c8-9012-3456-cdef12345678', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Such a shame to see historic buildings vandalized like this.');

-- Sample reactions on reports
INSERT INTO civisto.report_reactions (report_id, user_id, reaction_type) VALUES
('f1e2d3c4-b5a6-7890-1234-abcdef123456', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'support'),
('f1e2d3c4-b5a6-7890-1234-abcdef123456', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'concern'),
('f1e2d3c4-b5a6-7890-1234-abcdef123456', 'd4e5f6g7-h8i9-0123-4567-890123defghi', 'support'),
('g2f3e4d5-c6b7-8901-2345-bcdef1234567', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'support'),
('g2f3e4d5-c6b7-8901-2345-bcdef1234567', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'like'),
('h3g4f5e6-d7c8-9012-3456-cdef12345678', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'like'),
('i4h5g6f7-e8d9-0123-4567-def123456789', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'support'),
('i4h5g6f7-e8d9-0123-4567-def123456789', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'concern'),
('j5i6h7g8-f9e0-1234-5678-ef1234567890', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'support');

-- Sample user quest progress
INSERT INTO civisto.user_quests (user_id, quest_id, status, progress, completed_at) VALUES
-- Jane Hero (completed several quests)
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM civisto.quests WHERE title = 'First Steps'), 'completed', '{"count": 1}', NOW() - INTERVAL '30 days'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM civisto.quests WHERE title = 'Getting Started'), 'completed', '{"count": 5}', NOW() - INTERVAL '20 days'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM civisto.quests WHERE title = 'Reporter Pro'), 'completed', '{"count": 10}', NOW() - INTERVAL '10 days'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM civisto.quests WHERE title = 'Park Protector'), 'active', '{"count": 3}', NULL),

-- Mike Civic (newer user, some progress)
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', (SELECT id FROM civisto.quests WHERE title = 'First Steps'), 'completed', '{"count": 1}', NOW() - INTERVAL '15 days'),
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', (SELECT id FROM civisto.quests WHERE title = 'Getting Started'), 'active', '{"count": 2}', NULL),
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', (SELECT id FROM civisto.quests WHERE title = 'Safety First'), 'active', '{"count": 1}', NULL),

-- Anna Reporter (beginner)
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', (SELECT id FROM civisto.quests WHERE title = 'First Steps'), 'completed', '{"count": 1}', NOW() - INTERVAL '5 days'),
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', (SELECT id FROM civisto.quests WHERE title = 'Getting Started'), 'active', '{"count": 1}', NULL),

-- Erik Guardian (advanced user, many completed quests)
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.quests WHERE title = 'First Steps'), 'completed', '{"count": 1}', NOW() - INTERVAL '60 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.quests WHERE title = 'Getting Started'), 'completed', '{"count": 5}', NOW() - INTERVAL '50 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.quests WHERE title = 'Reporter Pro'), 'completed', '{"count": 10}', NOW() - INTERVAL '40 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.quests WHERE title = 'Park Protector'), 'completed', '{"count": 5}', NOW() - INTERVAL '30 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.quests WHERE title = 'Digital Guardian'), 'active', '{"count": 3}', NULL);

-- Sample user badges earned
INSERT INTO civisto.user_badges (user_id, badge_id, earned_at) VALUES
-- Jane Hero badges
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM civisto.badges WHERE name = 'first_report'), NOW() - INTERVAL '30 days'),
('a1b2c3d4-e5f6-7890-1234-567890abcdef', (SELECT id FROM civisto.badges WHERE name = 'reporter_pro'), NOW() - INTERVAL '10 days'),

-- Mike Civic badges
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', (SELECT id FROM civisto.badges WHERE name = 'first_report'), NOW() - INTERVAL '15 days'),

-- Anna Reporter badges
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', (SELECT id FROM civisto.badges WHERE name = 'first_report'), NOW() - INTERVAL '5 days'),

-- Erik Guardian badges (advanced user)
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.badges WHERE name = 'first_report'), NOW() - INTERVAL '60 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.badges WHERE name = 'reporter_pro'), NOW() - INTERVAL '40 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.badges WHERE name = 'community_hero'), NOW() - INTERVAL '35 days'),
('d4e5f6g7-h8i9-0123-4567-890123defghi', (SELECT id FROM civisto.badges WHERE name = 'park_guardian'), NOW() - INTERVAL '30 days');

-- Sample notification logs
INSERT INTO civisto.notification_logs (report_id, municipality_code, notifications) VALUES
('f1e2d3c4-b5a6-7890-1234-abcdef123456', '0180', '[
    {
        "type": "email",
        "success": true,
        "message": "Email sent successfully",
        "timestamp": "2024-01-15T10:30:00Z"
    },
    {
        "type": "webhook",
        "success": true,
        "message": "Webhook sent successfully",
        "timestamp": "2024-01-15T10:30:05Z"
    }
]'::jsonb),
('g2f3e4d5-c6b7-8901-2345-bcdef1234567', '0180', '[
    {
        "type": "email",
        "success": true,
        "message": "Email sent successfully",
        "timestamp": "2024-01-16T14:15:00Z"
    }
]'::jsonb);

-- Update user statistics based on their activity
UPDATE civisto.users SET 
    total_points = (
        SELECT COUNT(*) * 50 + 
               CASE WHEN COUNT(*) >= 10 THEN 500 ELSE 0 END +
               CASE WHEN COUNT(*) >= 5 THEN 250 ELSE 0 END +
               CASE WHEN COUNT(*) >= 1 THEN 100 ELSE 0 END
        FROM civisto.reports 
        WHERE user_id = civisto.users.id
    ),
    current_level = civisto.calculate_user_level(
        (SELECT COUNT(*) * 50 + 
                CASE WHEN COUNT(*) >= 10 THEN 500 ELSE 0 END +
                CASE WHEN COUNT(*) >= 5 THEN 250 ELSE 0 END +
                CASE WHEN COUNT(*) >= 1 THEN 100 ELSE 0 END
         FROM civisto.reports 
         WHERE user_id = civisto.users.id)
    );

-- Refresh the materialized views (if any)
-- Note: These are views, not materialized views, so they update automatically

ANALYZE civisto.users;
ANALYZE civisto.reports;
ANALYZE civisto.quests;
ANALYZE civisto.user_quests;
ANALYZE civisto.badges;
ANALYZE civisto.user_badges;
ANALYZE civisto.report_comments;
ANALYZE civisto.report_reactions;
ANALYZE civisto.notification_logs;
