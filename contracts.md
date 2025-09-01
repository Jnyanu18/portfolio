# Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for the portfolio website backend development.

## Current Mock Data (frontend/src/mock.js)

### 1. Projects Data (`mockProjects`)
- **Structure**: Array of project objects
- **Fields**: id, title, description, image, technologies[], category, demoUrl, githubUrl, featured
- **Usage**: Projects showcase with filtering functionality

### 2. Skills Data (`mockSkills`)
- **Structure**: Object with categories (frontend, backend, design, tools)
- **Fields**: name, level, years
- **Usage**: Skills display with progress bars

### 3. Contact Info (`mockContactInfo`)
- **Structure**: Object with contact details
- **Fields**: email, phone, location, availability, responseTime
- **Usage**: Contact section display

## Backend API Contracts

### 1. Projects API
```
GET /api/projects
- Returns: Array of all projects
- Response: [{ id, title, description, image, technologies, category, demoUrl, githubUrl, featured, createdAt }]

GET /api/projects/featured
- Returns: Array of featured projects only
- Response: [{ ...project fields }]

POST /api/projects (Admin only - future)
- Creates new project
- Body: { title, description, image, technologies, category, demoUrl, githubUrl, featured }

PUT /api/projects/:id (Admin only - future)
- Updates existing project
- Body: { ...project fields }

DELETE /api/projects/:id (Admin only - future)
- Deletes project by ID
```

### 2. Skills API
```
GET /api/skills
- Returns: Skills grouped by categories
- Response: { frontend: [...], backend: [...], design: [...], tools: [...] }

POST /api/skills (Admin only - future)
- Creates new skill
- Body: { name, level, years, category }
```

### 3. Contact API
```
POST /api/contact
- Submits contact form
- Body: { name, email, subject, message }
- Response: { success: true, message: "Message sent successfully" }

GET /api/contact-info
- Returns: Contact information for display
- Response: { email, phone, location, availability, responseTime }
```

## Database Models (MongoDB)

### 1. Project Schema
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  image: String (required),
  technologies: [String] (required),
  category: String (required),
  demoUrl: String,
  githubUrl: String,
  featured: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

### 2. Skill Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  level: Number (required, 0-100),
  years: Number (required),
  category: String (required, enum: ['frontend', 'backend', 'design', 'tools']),
  createdAt: Date (default: Date.now)
}
```

### 3. Contact Schema
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  isRead: Boolean (default: false),
  createdAt: Date (default: Date.now)
}
```

### 4. ContactInfo Schema (Single document)
```javascript
{
  _id: ObjectId,
  email: String (required),
  phone: String,
  location: String,
  availability: String,
  responseTime: String,
  updatedAt: Date (default: Date.now)
}
```

## Frontend Integration Changes

### 1. Replace Mock Data Usage
- **Projects.jsx**: Replace `mockProjects` with API call to `/api/projects`
- **Skills.jsx**: Replace `mockSkills` with API call to `/api/skills`
- **Contact.jsx**: Replace `mockContactInfo` with API call to `/api/contact-info`

### 2. Contact Form Integration
- **Contact.jsx**: Update form submission to POST to `/api/contact`
- Add proper error handling and success feedback
- Show loading state during submission

### 3. API Integration Layer
- Create `src/services/api.js` with axios configuration
- Implement API functions: `getProjects()`, `getSkills()`, `getContactInfo()`, `submitContact()`
- Add error handling and loading states

## Implementation Steps

### Phase 1: Basic Backend Setup
1. Create MongoDB models (Project, Skill, Contact, ContactInfo)
2. Implement GET endpoints for projects, skills, contact-info
3. Seed database with current mock data
4. Test backend endpoints

### Phase 2: Contact Form Backend
1. Implement POST /api/contact endpoint
2. Add email notification capability (optional)
3. Add basic validation and error handling

### Phase 3: Frontend Integration
1. Create API service layer
2. Replace mock data with API calls
3. Update contact form to use backend
4. Add loading states and error handling
5. Test end-to-end functionality

### Phase 4: Data Management (Future)
1. Admin endpoints for CRUD operations
2. Admin interface for managing projects and skills
3. Authentication system

## Environment Variables Needed
```
# Already exists
MONGO_URL=mongodb://localhost:27017/portfolio_db
DB_NAME=portfolio_db

# New variables for email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_EMAIL=alex.chen@example.com
```

## Error Handling Strategy
- Graceful degradation: If API fails, show cached/fallback data
- User-friendly error messages
- Proper HTTP status codes
- Validation errors with specific field feedback

## Testing Strategy
- Test all API endpoints with sample data
- Verify frontend-backend integration
- Test contact form submission
- Validate data persistence in MongoDB
- Test error scenarios and edge cases