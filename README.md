# Timetable Buddy

Timetable Buddy — A full-stack web application for students and faculties to manage lecture schedules easily.

## 🎯 Problem Statement

Managing lecture schedules in educational institutions is a complex challenge that involves:

- **Students** struggling to find available lecture slots that fit their schedules
- **Faculty** manually managing enrollments, waitlists, and capacity constraints
- **Administrators** lacking visibility into enrollment patterns and resource utilization

Traditional methods (spreadsheets, paper-based systems) are error-prone, time-consuming, and do not scale. Timetable Buddy addresses these pain points by providing a centralized, automated solution for lecture scheduling and enrollment management.

### Key Problems Solved

- ✅ Eliminates manual enrollment tracking
- ✅ Prevents double-booking and scheduling conflicts
- ✅ Automates waitlist management
- ✅ Provides real-time availability information
- ✅ Enables data-driven capacity planning

## 🏗️ System Architecture

Timetable Buddy follows a **three-tier architecture** pattern:

```text
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                         │
│  React + TypeScript (Port 5173)                          │
│  - User Interface Components                             │
│  - State Management (Context API)                        │
│  - Client-side Routing                                   │
└──────────────────┬───────────────────────────────────────┘
                   │ HTTP/REST API
                   │ (JSON)
┌──────────────────▼───────────────────────────────────────┐
│                    Backend Layer                          │
│  Express.js + Node.js (Port 5000)                        │
│  - RESTful API Endpoints                                 │
│  - Business Logic (Controllers)                          │
│  - Authentication & Authorization                        │
│  - Request Validation                                    │
└──────────────────┬───────────────────────────────────────┘
                   │ Mongoose ODM
                   │
┌──────────────────▼───────────────────────────────────────┐
│                    Database Layer                         │
│  MongoDB Atlas (Cloud)                                   │
│  - Document Storage                                       │
│  - Collections: users, courses, lectureslots, etc.      │
│  - Indexed Queries                                       │
└───────────────────────────────────────────────────────────┘
```

### Architecture Principles

- **Separation of Concerns**: Frontend, backend, and database are decoupled
- **RESTful Design**: Standard HTTP methods for API communication
- **Stateless Authentication**: JWT tokens for session management
- **Scalable Database**: MongoDB for flexible schema and horizontal scaling

## 🚀 Tech Stack

### Backend

- **Node.js 18+** - Runtime environment
- **Express.js 4.18+** - Web framework
- **MongoDB 7.0** - Database
- **Mongoose 8.0+** - MongoDB ODM
- **JWT** - Authentication & authorization
- **bcryptjs** - Password hashing
- **Joi** - Data validation
- **Helmet** - Security headers
- **Morgan** - HTTP request logging
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Compression** - Response compression

### Frontend

- **React 18.3+** - UI library
- **TypeScript 5.5+** - Type safety
- **Vite 5.4+** - Build tool & dev server
- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **React Router 6.20+** - Client-side routing
- **Axios 1.6+** - HTTP client
- **Lucide React 0.344+** - Icon library
- **React Hook Form 7.48+** - Form management
- **Zod 3.22+** - Schema validation
- **React Hot Toast 2.4+** - Toast notifications
- **Date-fns 2.30+** - Date manipulation

## 📁 Project Structure

```text
TimeTable_Buddy/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware (auth, errorHandler)
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utilities (database, seedData)
│   │   ├── __tests__/       # Tests
│   │   └── server.js        # Express server setup
│   ├── package.json
│   └── package-lock.json
├── frontend/                # React client application
│   ├── src/
│   │   ├── components/      # Reusable UI (Auth, Layout)
│   │   ├── contexts/        # React contexts (AuthContext)
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utilities (api)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
├── docker/
│   └── mongo-init.js        # MongoDB initialization script
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── package.json             # Root scripts (dev, build, install)
├── package-lock.json
└── README.md
```

## ✨ Features

### 🎓 Student Features

- **Lecture Slot Browsing** - View all available lecture slots with filtering and search
- **Enrollment Management** - Enroll in lecture slots and join waitlists
- **Personal Timetable** - View enrolled courses in a weekly timetable format
- **Profile Management** - Update personal information and preferences
- **Real-time Notifications** - Get notified about enrollment status changes

### 👨‍🏫 Faculty Features

- **Lecture Slot Creation** - Create and manage lecture slots with detailed information
- **Student Management** - View enrolled and waitlisted students for each slot
- **Dashboard Analytics** - Track enrollment statistics and slot performance
- **Schedule Management** - Organize recurring and one-time lecture sessions
- **Capacity Management** - Set and adjust slot capacities based on demand

### 🔐 Authentication & Security

- **JWT-based Authentication** - Secure user sessions with JSON Web Tokens
- **Role-based Access Control** - Separate interfaces for students and faculty
- **Password Security** - Bcrypt hashing for secure password storage
- **Rate Limiting** - API protection against abuse
- **CORS Configuration** - Secure cross-origin requests

### 🎨 User Experience

- **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- **Modern UI Components** - Clean and intuitive user interface
- **Real-time Feedback** - Toast notifications for user actions
- **Form Validation** - Client and server-side validation with Zod
- **Loading States** - Smooth loading indicators for better UX

### 🚀 Technical Features

- **RESTful API** - Well-structured API endpoints
- **Database Optimization** - Efficient MongoDB queries and indexing
- **Error Handling** - Comprehensive error handling and logging
- **Docker Support** - Containerized deployment with Docker Compose
- **Health Checks** - Service health monitoring
- **Compression** - Optimized response sizes

## 📸 Screenshots

> **Note:** Add screenshots of your application here. Recommended screenshots:
>
> - Login/Registration page
> - Student dashboard with timetable
> - Faculty dashboard with lecture slots
> - Enrollment interface
> - Mobile responsive views

### Demo Video

> **Note:** Consider adding a demo video link (YouTube, Loom, etc.) showing:
>
> - User registration and login
> - Student enrollment flow
> - Faculty slot creation
> - Timetable visualization

### Live Demo

> **Note:** If deployed, add link here:
>
> - 🌐 **Live Application:** [Your deployment URL]
> - 📱 **API Documentation:** [If using Swagger/Postman]

## 👥 User Roles & Permissions

The application supports four distinct user roles with different access levels:

| Role | Description | Key Permissions |
|------|-------------|----------------|
| **Student** | Regular student users | • Browse lecture slots<br>• Enroll/drop from slots<br>• View personal timetable<br>• Manage profile |
| **Faculty** | Teaching staff | • All student permissions<br>• Create/manage lecture slots<br>• View enrolled students<br>• Manage slot capacity |
| **Instructor** | Course instructors | • Similar to faculty<br>• Create/manage courses<br>• View course enrollments |
| **Admin** | System administrators | • All permissions<br>• Manage all users<br>• Delete any resource<br>• View system-wide analytics |

### Access Control Matrix

| Feature | Student | Faculty | Instructor | Admin |
|---------|:-------:|:-------:|:----------:|:-----:|
| Browse Slots | ✅ | ✅ | ✅ | ✅ |
| Enroll in Slots | ✅ | ❌ | ❌ | ✅ |
| Create Slots | ❌ | ✅ | ✅ | ✅ |
| Manage Users | ❌ | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ✅ | ✅ | ✅ |
| Delete Resources | ❌ | Own Only | Own Only | ✅ |

**Note:** Role-based access is enforced at both the frontend (UI visibility) and backend (API middleware) levels.

## 🗄️ Database Schema

The application uses MongoDB with the following collections and relationships:

### Core Collections

1. **users**
   - Stores user accounts (students, faculty, admin)
   - Fields: `name`, `email`, `password` (hashed), `role`, `studentId`, `major`, `year`
   - Indexes: `email` (unique), `studentId` (unique, sparse)

2. **lectureslots**
   - Stores lecture time slot information
   - Fields: `subjectName`, `facultyId`, `venue`, `capacity`, `dayOfWeek`, `startTime`, `endTime`
   - References: `facultyId` → `users._id`

3. **enrollments**
   - Tracks student enrollments in lecture slots
   - Fields: `lectureSlotId`, `studentId`, `status` (enrolled/waitlisted/cancelled), `position`
   - References: `lectureSlotId` → `lectureslots._id`, `studentId` → `users._id`
   - Unique constraint: `(lectureSlotId, studentId)`

4. **courses**
   - Course catalog information
   - Fields: `courseCode`, `title`, `credits`, `department`, `semester`, `year`, `instructor`
   - References: `instructor` → `users._id`, `prerequisites` → `courses._id[]`

5. **schedules**
   - User's course schedules
   - Fields: `user`, `name`, `semester`, `year`, `courses[]`, `totalCredits`
   - References: `user` → `users._id`, `courses[].course` → `courses._id`

6. **assignments**
   - Course assignments
   - Fields: `title`, `courseId`, `facultyId`, `deadline`, `status`
   - References: `courseId` → `courses._id`, `facultyId` → `users._id`

### Entity Relationships

```text
users (1) ──< (many) lectureslots [facultyId]
users (1) ──< (many) enrollments [studentId]
lectureslots (1) ──< (many) enrollments [lectureSlotId]
users (1) ──< (many) courses [instructor]
courses (1) ──< (many) schedules.courses[]
users (1) ──< (many) schedules [user]
courses (1) ──< (many) assignments [courseId]
```

### Database Design Decisions

- **Document-based storage** for flexible schema evolution
- **Referential integrity** maintained through Mongoose references
- **Indexed queries** for performance optimization
- **Sparse indexes** for optional unique fields (e.g., `studentId`)

## 🔐 Authentication Flow

The application uses **JWT (JSON Web Tokens)** for stateless authentication:

### Registration Flow

1. User submits registration form (name, email, password, role)
2. Backend validates input using Joi schema
3. Password is hashed using bcryptjs (salt rounds: 10)
4. User document created in MongoDB
5. JWT token generated and returned to client
6. Token stored in browser `localStorage`

### Login Flow

1. User submits credentials (email, password)
2. Backend finds user by email
3. Password compared with stored hash using bcryptjs
4. If valid, JWT token generated with user ID payload
5. Token returned to client and stored in `localStorage`
6. Token included in subsequent API requests via `Authorization: Bearer <token>` header

### Protected Route Access

1. Client includes JWT token in request header
2. Backend middleware (`auth.js`) extracts token
3. Token verified using `JWT_SECRET`
4. User ID extracted from token payload
5. User document fetched from database
6. User object attached to `req.user` for route handlers
7. Role-based authorization checked if needed

### Security Features

- ✅ Passwords never stored in plain text (bcrypt hashing)
- ✅ Tokens expire after 7 days (configurable via `JWT_EXPIRES_IN`)
- ✅ Tokens signed with secret key (`JWT_SECRET`)
- ✅ Protected routes require valid token
- ✅ Role-based access control (RBAC) middleware
- ✅ Rate limiting to prevent brute force attacks

## ⚠️ Error Handling & Edge Cases

### Error Handling Strategy

**Backend Error Handling:**

- Global error handler middleware catches all unhandled errors
- Consistent error response format: `{ success: false, message: string }`
- HTTP status codes: 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error)
- Mongoose validation errors are formatted for client consumption
- Database connection errors trigger graceful shutdown

**Frontend Error Handling:**

- Axios interceptors handle 401 (unauthorized) → redirect to login
- Toast notifications for user-friendly error messages
- Loading states prevent duplicate requests
- Form validation prevents invalid submissions

### Handled Edge Cases

| Scenario | Handling |
|----------|----------|
| **Duplicate Enrollment** | Unique index on `(lectureSlotId, studentId)` prevents duplicates |
| **Slot Capacity Exceeded** | Enrollment status set to `waitlisted` when capacity full |
| **Invalid Time Ranges** | Schema validation ensures `startTime < endTime` |
| **Faculty Role Validation** | Pre-save hook validates faculty role before creating lecture slot |
| **Concurrent Enrollments** | Database-level constraints prevent race conditions |
| **Expired JWT Token** | 401 response triggers automatic logout |
| **Missing Environment Variables** | Server fails fast with clear error message |
| **Database Connection Loss** | Connection retry logic with exponential backoff |

### Validation Layers

1. **Client-side**: Zod schemas for immediate feedback
2. **Server-side**: Joi schemas for data integrity
3. **Database-level**: Mongoose schema constraints and indexes

## 🧪 Testing

### Test Coverage

**Backend Testing:**

- Unit tests for enrollment logic (see `backend/src/__tests__/enrollments.test.js`)
- API endpoint testing with Supertest
- Database model validation tests

**Frontend Testing:**

- Component testing (to be implemented)
- Integration testing for user flows
- E2E testing scenarios (to be implemented)

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

### Test Strategy

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints with database
- **E2E Tests**: Test complete user workflows (planned)

> **Note:** Test coverage is currently limited. Future improvements should include comprehensive test suites for all critical paths.

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Docker and Docker Compose (optional)

### Installation

#### 1. Clone and install dependencies

```bash
git clone <repository-url>
cd TimeTable_Buddy
npm install
```

#### 2. Environment configuration

**Backend**

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/college_scheduling
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend**

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

**CORS**

- The backend CORS `ALLOWED_ORIGINS` defaults to `http://localhost:3000` if not set.
- For Vite dev (`http://localhost:5173`), ensure `ALLOWED_ORIGINS` includes `http://localhost:5173`.

**Environment variable templates**

**Backend `.env.example`** (create in `backend/`):

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/college_scheduling
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/college_scheduling

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# CORS
ALLOWED_ORIGINS=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend `.env.example`** (create in `frontend/`):

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
# Alternative: VITE_API_BASE_URL=http://localhost:5000/api
```

**Important**

- Never commit actual `.env` files to version control.
- Use `.env.example` as a template.
- Add `.env` to `.gitignore`.
- Generate a strong `JWT_SECRET` for production (minimum 32 characters).
- Use different secrets for development and production.

#### 3. Start MongoDB

```bash
# Using Docker (recommended)
docker-compose up mongodb -d

# Or start MongoDB locally
mongod
```

#### 4. Start development servers

```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:backend   # Backend runs on http://localhost:5000
npm run dev:frontend  # Frontend runs on http://localhost:5173
```

#### 5. Seed database (optional)

```bash
cd backend
npm run seed
```

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

By default, the backend exposes port 5000 and serves the frontend build. If you build and run the standalone frontend image (`Dockerfile.frontend`), it serves on port 80 inside the container; map to a host port as needed (e.g., `-p 5173:80`).

### Manual Docker Setup

```bash
# Build and run backend (serves API on :5000 and static frontend if built)
docker build -f Dockerfile.backend -t timetable-buddy-backend .
docker run -p 5000:5000 --env-file backend/.env timetable-buddy-backend

# Build and run standalone frontend (served by Nginx on :80 inside container)
docker build -f Dockerfile.frontend -t timetable-buddy-frontend .
docker run -p 5173:80 timetable-buddy-frontend
```

**Notes**

- `Dockerfile.backend` exposes port 5000 and includes a health check at `/health`.
- `Dockerfile.frontend` serves the built app with Nginx on port 80 and includes a root path health check.
- If you run both containers separately, set `VITE_API_URL` in the frontend image to your backend URL.

## 🔧 Available Scripts

### Root Level

- `npm run dev` - Start both frontend and backend in development
- `npm run start` - Start backend in production mode (from root)
- `npm run build` - Build the frontend application for production
- `npm run dev:backend` - Start backend dev server only
- `npm run dev:frontend` - Start frontend dev server only

### Backend Scripts

- `npm run dev` - Start development server with nodemon
- `npm run start` - Start production server
- `npm run build` - (No build step required for Node.js)
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run seed` - Seed database with sample data

### Frontend Scripts

- `npm run dev` - Start Vite development server (default http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format with Prettier
- `npm run typecheck` - Run TypeScript type checking

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile (requires auth)
- `POST /api/auth/logout` - Logout current session

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (requires auth)
- `PUT /api/users/:id` - Update user (requires auth)
- `DELETE /api/users/:id` - Delete user (admin only)

### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course (admin or instructor)
- `GET /api/courses/:id` - Get course by ID
- `PUT /api/courses/:id` - Update course (admin or instructor)
- `DELETE /api/courses/:id` - Delete course (admin only)
- `PUT /api/courses/:id/enroll` - Enroll in course (requires auth)
- `PUT /api/courses/:id/drop` - Drop course (requires auth)

### Lecture Slots

- `GET /api/lecture-slots` - Get all lecture slots
- `GET /api/lecture-slots/:id` - Get lecture slot by ID
- `POST /api/lecture-slots` - Create new lecture slot (faculty or admin)
- `PUT /api/lecture-slots/:id` - Update lecture slot (faculty or admin)
- `DELETE /api/lecture-slots/:id` - Delete lecture slot (faculty or admin)

### Faculty

- `GET /api/faculty/lecture-slots` - Get faculty's lecture slots (faculty or admin)
- `POST /api/faculty/lecture-slots` - Create lecture slot (faculty or admin)
- `PUT /api/faculty/lecture-slots/:id` - Update lecture slot (faculty or admin)
- `DELETE /api/faculty/lecture-slots/:id` - Delete lecture slot (faculty or admin)

### Enrollments

- `GET /api/enrollments/me` - Get my timetable (student)
- `POST /api/enrollments/:slotId` - Enroll in lecture slot (student)
- `DELETE /api/enrollments/:slotId` - Drop from lecture slot (student)
- `GET /api/enrollments` - List all enrollments (admin)
- `PUT /api/enrollments/:id/cancel` - Force cancel an enrollment (admin)

### Schedules

- `GET /api/schedules` - Get my schedules (requires auth)
- `POST /api/schedules` - Create schedule (requires auth)
- `GET /api/schedules/:id` - Get schedule by ID (requires auth)
- `PUT /api/schedules/:id` - Update schedule (requires auth)
- `DELETE /api/schedules/:id` - Delete schedule (requires auth)

### Health Check

- `GET /health` - Server health status

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Ensure all production environment variables are properly configured before deployment.

**Backend `.env` example (production)**

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-strong-production-secret
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=https://your-frontend-domain
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend `.env` example (production)**

```env
VITE_API_URL=https://your-backend-domain/api
```

## 🚀 Future Improvements

### Planned Features

- [ ] **Email Notifications** - Automated emails for enrollment confirmations and waitlist updates
- [ ] **Calendar Integration** - Export timetable to Google Calendar/iCal
- [ ] **Conflict Detection** - Automatic detection of scheduling conflicts
- [ ] **Advanced Search** - Filter slots by multiple criteria (time, venue, subject)
- [ ] **Bulk Operations** - Faculty can bulk-create lecture slots
- [ ] **Analytics Dashboard** - Visual charts for enrollment trends
- [ ] **Mobile App** - Native mobile application (React Native)
- [ ] **Real-time Updates** - WebSocket integration for live enrollment updates

### Technical Improvements

- [ ] **Comprehensive Testing** - Increase test coverage to >80%
- [ ] **API Documentation** - Swagger/OpenAPI documentation
- [ ] **Caching Layer** - Redis for frequently accessed data
- [ ] **Image Upload** - Profile pictures and course images
- [ ] **File Attachments** - Assignment file uploads
- [ ] **Search Optimization** - Full-text search with MongoDB Atlas Search
- [ ] **Performance Monitoring** - Application performance monitoring (APM)
- [ ] **CI/CD Pipeline** - Automated testing and deployment

### Known Limitations

- ⚠️ No email verification on registration
- ⚠️ Limited error recovery for network failures
- ⚠️ No offline support
- ⚠️ No data export functionality
- ⚠️ Basic search capabilities (no fuzzy search)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in the GitHub repository.
