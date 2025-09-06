# Civisto API Documentation

This document provides comprehensive documentation for the Civisto backend API, built on Supabase with PostgreSQL and Edge Functions.

## Base URL

- **Production**: `https://your-project.supabase.co`
- **Local Development**: `http://localhost:54321`

## Authentication

Civisto uses Supabase Auth for user authentication. All authenticated requests require a JWT token in the Authorization header.

```bash
Authorization: Bearer <jwt_token>
```

### Authentication Endpoints

#### Sign Up
```http
POST /auth/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password",
  "data": {
    "username": "unique_username",
    "display_name": "Display Name"
  }
}
```

#### Sign In
```http
POST /auth/v1/token?grant_type=password
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

#### Sign Out
```http
POST /auth/v1/logout
Authorization: Bearer <jwt_token>
```

## Core API Endpoints

### Reports

#### Create Report
```http
POST /rest/v1/reports
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Broken Swing at Central Park",
  "description": "The main swing set has a broken chain and is a safety hazard for children.",
  "category": "parks_green_areas",
  "location": "POINT(18.0686 59.3293)",
  "images": ["https://storage.civisto.com/images/swing.jpg"],
  "municipality_code": "0180"
}
```

**Response:**
```json
{
  "id": "f1e2d3c4-b5a6-7890-1234-abcdef123456",
  "user_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Broken Swing at Central Park",
  "description": "The main swing set has a broken chain and is a safety hazard for children.",
  "category": "parks_green_areas",
  "status": "submitted",
  "priority": "medium",
  "location": "POINT(18.0686 59.3293)",
  "images": ["https://storage.civisto.com/images/swing.jpg"],
  "municipality_code": "0180",
  "ai_analysis": null,
  "created_at": "2025-09-06T22:25:00Z",
  "updated_at": "2025-09-06T22:25:00Z"
}
```

#### Get Reports
```http
GET /rest/v1/reports?select=*&order=created_at.desc&limit=20
```

**Query Parameters:**
- `select`: Fields to return (default: `*`)
- `category`: Filter by category (`eq.parks_green_areas`)
- `status`: Filter by status (`eq.submitted`)
- `priority`: Filter by priority (`eq.high`)
- `municipality_code`: Filter by municipality (`eq.0180`)
- `order`: Sort order (`created_at.desc`)
- `limit`: Number of results (default: 20, max: 100)

#### Get Report by ID
```http
GET /rest/v1/reports?id=eq.<report_id>&select=*,users(username,display_name,avatar_url)
```

#### Update Report (Own Reports Only)
```http
PATCH /rest/v1/reports?id=eq.<report_id>
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### Get Nearby Reports
```http
POST /rest/v1/rpc/get_nearby_reports
Content-Type: application/json

{
  "center_lat": 59.3293,
  "center_lng": 18.0686,
  "radius_meters": 1000,
  "limit_count": 50
}
```

### Users

#### Get User Profile
```http
GET /rest/v1/users?id=eq.<user_id>&select=*
```

#### Update User Profile
```http
PATCH /rest/v1/users?id=eq.<user_id>
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "display_name": "New Display Name",
  "avatar_url": "https://example.com/avatar.jpg"
}
```

#### Get User Leaderboard
```http
GET /rest/v1/user_leaderboard?order=rank.asc&limit=100
```

### Quests

#### Get Active Quests
```http
GET /rest/v1/quests?is_active=eq.true&select=*
```

#### Get User Quest Progress
```http
GET /rest/v1/user_quests?user_id=eq.<user_id>&select=*,quests(*)
Authorization: Bearer <jwt_token>
```

### Comments

#### Get Report Comments
```http
GET /rest/v1/report_comments?report_id=eq.<report_id>&select=*,users(username,display_name,avatar_url)&order=created_at.asc
```

#### Create Comment
```http
POST /rest/v1/report_comments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "report_id": "f1e2d3c4-b5a6-7890-1234-abcdef123456",
  "content": "Thanks for reporting this issue!"
}
```

### Reactions

#### Get Report Reactions
```http
GET /rest/v1/report_reactions?report_id=eq.<report_id>&select=*
```

#### Add Reaction
```http
POST /rest/v1/report_reactions
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "report_id": "f1e2d3c4-b5a6-7890-1234-abcdef123456",
  "reaction_type": "support"
}
```

#### Remove Reaction
```http
DELETE /rest/v1/report_reactions?report_id=eq.<report_id>&user_id=eq.<user_id>&reaction_type=eq.support
Authorization: Bearer <jwt_token>
```

## Edge Functions

### AI Report Analysis
```http
POST /functions/v1/analyze-report
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "reportId": "f1e2d3c4-b5a6-7890-1234-abcdef123456",
  "title": "Broken Swing at Central Park",
  "description": "The main swing set has a broken chain...",
  "category": "parks_green_areas",
  "images": ["https://storage.civisto.com/images/swing.jpg"]
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "has_people": false,
    "damage_detected": true,
    "suggested_priority": "high",
    "sentiment_score": 0.3,
    "keywords": ["broken", "swing", "safety", "children"],
    "municipality_suggestions": [
      "Forward to parks and recreation",
      "Schedule maintenance crew visit"
    ]
  }
}
```

### Gamification
```http
POST /functions/v1/gamification
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "action": "generate_personal_quests"
}
```

### Municipality Notification
```http
POST /functions/v1/notify-municipality
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "reportId": "f1e2d3c4-b5a6-7890-1234-abcdef123456",
  "municipalityCode": "0180",
  "priority": "high"
}
```

## Data Types

### Report Categories
- `road_issues`
- `waste_management`
- `environmental`
- `safety_hazards`
- `abandoned_trolleys`
- `animals_pests`
- `graffiti_vandalism`
- `noise_pollution`
- `parking_cars`
- `parks_green_areas`
- `street_lighting`
- `accessibility`
- `digital_harassment`
- `other`

### Report Status
- `submitted`
- `reviewing`
- `in_progress`
- `resolved`
- `closed`
- `rejected`
- `duplicate`

### Priority Levels
- `low`
- `medium`
- `high`
- `critical`

### Reaction Types
- `like`
- `support`
- `concern`

## Error Handling

All API endpoints return standard HTTP status codes:

- `200 OK`: Success
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate)
- `422 Unprocessable Entity`: Validation error
- `500 Internal Server Error`: Server error

Error responses include details:
```json
{
  "error": "Invalid input",
  "message": "The field 'category' is required",
  "code": "VALIDATION_ERROR"
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:
- **Authenticated users**: 100 requests per 15 minutes
- **Anonymous users**: 20 requests per 15 minutes
- **Edge Functions**: 50 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Webhooks

Civisto can send webhooks for real-time updates:

### Report Events
- `report.created`
- `report.updated`
- `report.status_changed`

### User Events
- `user.quest_completed`
- `user.badge_earned`
- `user.level_up`

Webhook payloads include:
```json
{
  "event": "report.created",
  "data": {
    "id": "f1e2d3c4-b5a6-7890-1234-abcdef123456",
    "title": "Broken Swing at Central Park",
    "category": "parks_green_areas",
    "priority": "high",
    "created_at": "2025-09-06T22:25:00Z"
  },
  "timestamp": "2025-09-06T22:25:00Z"
}
```

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// Create a report
const { data, error } = await supabase
  .from('reports')
  .insert({
    title: 'Broken Swing',
    description: 'Safety hazard',
    category: 'parks_green_areas',
    location: 'POINT(18.0686 59.3293)'
  })
```

### Python
```bash
pip install supabase
```

```python
from supabase import create_client

supabase = create_client(
    "https://your-project.supabase.co",
    "your-anon-key"
)

# Get reports
response = supabase.table('reports').select('*').execute()
```

## Testing

Use the provided seed data for testing:
- Test users with various levels and badges
- Sample reports across all categories
- Quest progress examples
- Comment and reaction data

## Support

For API support:
- 📧 Email: api@civisto.com
- 💬 Discord: [Civisto Community](https://discord.gg/civisto)
- 📖 Documentation: [docs.civisto.com](https://docs.civisto.com)
- 🐛 Issues: [GitHub Issues](https://github.com/johanlido/civisto/issues)

