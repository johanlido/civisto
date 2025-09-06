-- Civisto Database Schema
-- Full technical specification implementation

-- Enable required extensions for geospatial data, job scheduling, and more.
CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_cron" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA extensions;

-- Create a dedicated schema for all Civisto tables and functions.
CREATE SCHEMA IF NOT EXISTS civisto;

-- Enum for all possible report categories.
CREATE TYPE civisto.report_category_enum AS ENUM (
    'road_issues', 'waste_management', 'environmental', 'safety_hazards',
    'abandoned_trolleys', 'animals_pests', 'graffiti_vandalism',
    'noise_pollution', 'parking_cars', 'parks_green_areas',
    'street_lighting', 'accessibility', 'digital_harassment', 'other'
);

-- Enum for the lifecycle status of a report.
CREATE TYPE civisto.report_status_enum AS ENUM (
    'submitted', 'reviewing', 'in_progress', 'resolved', 'closed', 'rejected', 'duplicate'
);

-- Enum for report priority levels, often set by AI.
CREATE TYPE civisto.priority_enum AS ENUM ('low', 'medium', 'high', 'critical');

-- Users table, linked to Supabase's built-in auth.users table.
CREATE TABLE civisto.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    display_name TEXT,
    avatar_url TEXT,
    total_points INT DEFAULT 0,
    current_level INT DEFAULT 1,
    badges JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- The core table for all citizen reports, with geospatial support.
CREATE TABLE civisto.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES civisto.users(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category civisto.report_category_enum NOT NULL,
    status civisto.report_status_enum DEFAULT 'submitted',
    priority civisto.priority_enum DEFAULT 'medium',
    location GEOGRAPHY(POINT, 4326) NOT NULL, -- PostGIS location data
    images JSONB DEFAULT '[]'::jsonb,
    municipality_code VARCHAR(10),
    ai_analysis JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial index for fast location-based queries.
CREATE INDEX idx_reports_location ON civisto.reports USING GIST (location);

-- Gamification: Quests table.
CREATE TABLE civisto.quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL, -- e.g., 'daily', 'weekly', 'milestone'
    requirements JSONB NOT NULL, -- e.g., {"action": "submit_report", "count": 5}
    rewards JSONB NOT NULL, -- e.g., {"points": 100, "badge": "reporter_pro"}
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracks user progress on quests.
CREATE TABLE civisto.user_quests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES civisto.users(id) NOT NULL,
    quest_id UUID REFERENCES civisto.quests(id) NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'completed'
    progress JSONB DEFAULT '{}'::jsonb,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, quest_id)
);

-- Comments on reports for community engagement
CREATE TABLE civisto.report_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES civisto.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES civisto.users(id) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes/reactions on reports
CREATE TABLE civisto.report_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES civisto.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES civisto.users(id) NOT NULL,
    reaction_type TEXT DEFAULT 'like', -- 'like', 'support', 'concern'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(report_id, user_id, reaction_type)
);

-- Badges system
CREATE TABLE civisto.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon_url TEXT,
    requirements JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User badges earned
CREATE TABLE civisto.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES civisto.users(id) NOT NULL,
    badge_id UUID REFERENCES civisto.badges(id) NOT NULL,
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- Enable RLS on all tables.
ALTER TABLE civisto.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE civisto.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE civisto.user_quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE civisto.report_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE civisto.report_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE civisto.user_badges ENABLE ROW LEVEL SECURITY;

-- Users can only see and manage their own profile.
CREATE POLICY "Users can manage their own profile" ON civisto.users
    FOR ALL USING (auth.uid() = id);

-- Anyone can view submitted reports.
CREATE POLICY "Public can view reports" ON civisto.reports
    FOR SELECT USING (true);

-- Authenticated users can create reports.
CREATE POLICY "Users can create reports" ON civisto.reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only update their own reports.
CREATE POLICY "Users can update their own reports" ON civisto.reports
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can view their own quests.
CREATE POLICY "Users can view their own quests" ON civisto.user_quests
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own quest progress.
CREATE POLICY "Users can create their own quest progress" ON civisto.user_quests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own quest progress.
CREATE POLICY "Users can update their own quest progress" ON civisto.user_quests
    FOR UPDATE USING (auth.uid() = user_id);

-- Anyone can view comments.
CREATE POLICY "Public can view comments" ON civisto.report_comments
    FOR SELECT USING (true);

-- Authenticated users can create comments.
CREATE POLICY "Users can create comments" ON civisto.report_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments.
CREATE POLICY "Users can update their own comments" ON civisto.report_comments
    FOR UPDATE USING (auth.uid() = user_id);

-- Anyone can view reactions.
CREATE POLICY "Public can view reactions" ON civisto.report_reactions
    FOR SELECT USING (true);

-- Authenticated users can create reactions.
CREATE POLICY "Users can create reactions" ON civisto.report_reactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reactions.
CREATE POLICY "Users can delete their own reactions" ON civisto.report_reactions
    FOR DELETE USING (auth.uid() = user_id);

-- Users can view their own badges.
CREATE POLICY "Users can view their own badges" ON civisto.user_badges
    FOR SELECT USING (auth.uid() = user_id);

-- Function to automatically update the 'updated_at' timestamp on any row change.
CREATE OR REPLACE FUNCTION civisto.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to tables.
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE
ON civisto.reports FOR EACH ROW EXECUTE PROCEDURE
civisto.update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE
ON civisto.users FOR EACH ROW EXECUTE PROCEDURE
civisto.update_updated_at_column();

CREATE TRIGGER update_quests_updated_at BEFORE UPDATE
ON civisto.quests FOR EACH ROW EXECUTE PROCEDURE
civisto.update_updated_at_column();

CREATE TRIGGER update_user_quests_updated_at BEFORE UPDATE
ON civisto.user_quests FOR EACH ROW EXECUTE PROCEDURE
civisto.update_updated_at_column();

CREATE TRIGGER update_report_comments_updated_at BEFORE UPDATE
ON civisto.report_comments FOR EACH ROW EXECUTE PROCEDURE
civisto.update_updated_at_column();

-- Function to calculate user level based on points
CREATE OR REPLACE FUNCTION civisto.calculate_user_level(points INTEGER)
RETURNS INTEGER AS $$
BEGIN
    -- Level progression: 100 points per level for first 5 levels, then 200 per level
    IF points < 500 THEN
        RETURN GREATEST(1, (points / 100) + 1);
    ELSE
        RETURN GREATEST(6, ((points - 500) / 200) + 6);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to award points to user
CREATE OR REPLACE FUNCTION civisto.award_points(user_uuid UUID, points_to_add INTEGER)
RETURNS VOID AS $$
DECLARE
    new_total INTEGER;
    new_level INTEGER;
BEGIN
    -- Update user points
    UPDATE civisto.users 
    SET total_points = total_points + points_to_add
    WHERE id = user_uuid
    RETURNING total_points INTO new_total;
    
    -- Calculate new level
    new_level := civisto.calculate_user_level(new_total);
    
    -- Update user level
    UPDATE civisto.users 
    SET current_level = new_level
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to check and complete quests
CREATE OR REPLACE FUNCTION civisto.check_quest_completion(user_uuid UUID, action_type TEXT, action_data JSONB DEFAULT '{}')
RETURNS VOID AS $$
DECLARE
    quest_record RECORD;
    user_quest_record RECORD;
    current_progress JSONB;
    required_count INTEGER;
    current_count INTEGER;
BEGIN
    -- Loop through active quests for this user
    FOR quest_record IN 
        SELECT q.* FROM civisto.quests q
        JOIN civisto.user_quests uq ON q.id = uq.quest_id
        WHERE uq.user_id = user_uuid 
        AND uq.status = 'active'
        AND q.is_active = true
    LOOP
        -- Check if this action matches quest requirements
        IF (quest_record.requirements->>'action') = action_type THEN
            -- Get current progress
            SELECT * INTO user_quest_record 
            FROM civisto.user_quests 
            WHERE user_id = user_uuid AND quest_id = quest_record.id;
            
            current_progress := COALESCE(user_quest_record.progress, '{}');
            required_count := (quest_record.requirements->>'count')::INTEGER;
            current_count := COALESCE((current_progress->>'count')::INTEGER, 0) + 1;
            
            -- Update progress
            current_progress := jsonb_set(current_progress, '{count}', to_jsonb(current_count));
            
            -- Check if quest is completed
            IF current_count >= required_count THEN
                -- Mark quest as completed
                UPDATE civisto.user_quests 
                SET status = 'completed', 
                    progress = current_progress,
                    completed_at = NOW()
                WHERE user_id = user_uuid AND quest_id = quest_record.id;
                
                -- Award rewards
                IF quest_record.rewards ? 'points' THEN
                    PERFORM civisto.award_points(user_uuid, (quest_record.rewards->>'points')::INTEGER);
                END IF;
                
                -- Award badge if specified
                IF quest_record.rewards ? 'badge' THEN
                    INSERT INTO civisto.user_badges (user_id, badge_id)
                    SELECT user_uuid, b.id 
                    FROM civisto.badges b 
                    WHERE b.name = (quest_record.rewards->>'badge')
                    ON CONFLICT (user_id, badge_id) DO NOTHING;
                END IF;
            ELSE
                -- Update progress
                UPDATE civisto.user_quests 
                SET progress = current_progress
                WHERE user_id = user_uuid AND quest_id = quest_record.id;
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger to award points and check quests when reports are created
CREATE OR REPLACE FUNCTION civisto.handle_new_report()
RETURNS TRIGGER AS $$
BEGIN
    -- Award points for creating a report
    PERFORM civisto.award_points(NEW.user_id, 50);
    
    -- Check quest completion
    PERFORM civisto.check_quest_completion(NEW.user_id, 'submit_report', 
        jsonb_build_object('category', NEW.category));
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_report_created
    AFTER INSERT ON civisto.reports
    FOR EACH ROW EXECUTE PROCEDURE civisto.handle_new_report();

-- Insert default badges
INSERT INTO civisto.badges (name, description, icon_url) VALUES
('first_report', 'First Report', '/badges/first-report.svg'),
('reporter_pro', 'Reporter Pro - 10 reports', '/badges/reporter-pro.svg'),
('community_hero', 'Community Hero - 50 reports', '/badges/community-hero.svg'),
('park_guardian', 'Park Guardian - 5 park reports', '/badges/park-guardian.svg'),
('safety_champion', 'Safety Champion - 10 safety reports', '/badges/safety-champion.svg'),
('digital_defender', 'Digital Defender - 5 digital harassment reports', '/badges/digital-defender.svg');

-- Insert default quests
INSERT INTO civisto.quests (title, description, type, requirements, rewards) VALUES
('First Steps', 'Submit your first community report', 'milestone', 
 '{"action": "submit_report", "count": 1}', 
 '{"points": 100, "badge": "first_report"}'),
('Getting Started', 'Submit 5 reports to help your community', 'milestone',
 '{"action": "submit_report", "count": 5}',
 '{"points": 250}'),
('Reporter Pro', 'Submit 10 reports and become a reporting expert', 'milestone',
 '{"action": "submit_report", "count": 10}',
 '{"points": 500, "badge": "reporter_pro"}'),
('Park Protector', 'Submit 5 reports about parks and green areas', 'milestone',
 '{"action": "submit_report", "category": "parks_green_areas", "count": 5}',
 '{"points": 300, "badge": "park_guardian"}'),
('Safety First', 'Report 10 safety hazards to keep your community safe', 'milestone',
 '{"action": "submit_report", "category": "safety_hazards", "count": 10}',
 '{"points": 400, "badge": "safety_champion"}'),
('Digital Guardian', 'Report 5 instances of digital harassment', 'milestone',
 '{"action": "submit_report", "category": "digital_harassment", "count": 5}',
 '{"points": 350, "badge": "digital_defender"}');

-- Function to create user profile when they sign up
CREATE OR REPLACE FUNCTION civisto.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO civisto.users (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'display_name', 'Civisto User'),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
    );
    
    -- Assign default quests to new user
    INSERT INTO civisto.user_quests (user_id, quest_id)
    SELECT NEW.id, id FROM civisto.quests WHERE is_active = true;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE civisto.handle_new_user();

