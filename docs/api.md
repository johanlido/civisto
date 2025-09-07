# Civisto Backend API Documentation

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

#### Get Reports
```http
GET /rest/v1/reports?select=*&order=created_at.desc&limit=20
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

### Gamification

#### Get User Quests
```http
GET /rest/v1/user_quests?user_id=eq.{id}&select=*,quests(*)
Authorization: Bearer <jwt_token>
```

#### Get Leaderboard
```http
GET /rest/v1/user_leaderboard?order=rank.asc&limit=100
```

### Edge Functions

#### AI Report Analysis
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

#### Gamification
```http
POST /functions/v1/gamification
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "userId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "action": "generate_personal_quests"
}
```

#### Municipality Notification
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

## Error Handling

All API endpoints return standard HTTP status codes:

- `200 OK`: Success
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

API requests are rate limited to prevent abuse:
- **Authenticated users**: 100 requests per 15 minutes
- **Anonymous users**: 20 requests per 15 minutes
- **Edge Functions**: 50 requests per minute

## Testing

Use the provided seed data for testing:
- Test users with various levels and badges
- Sample reports across all categories
- Quest progress examples
- Comment and reaction data

For complete API documentation, see the full specification in the repository.
