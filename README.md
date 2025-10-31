# Timetable Buddy

Timetable Buddy — A full-stack web application for students and faculties to manage lecture schedules easily.

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

```
LSP-6/
├── project/                 # Main project directory
│   ├── backend/             # Express.js API server
│   │   ├── src/
│   │   │   ├── controllers/ # Route controllers (auth, courses, enrollments, faculty, lectureSlots, schedules, users)
│   │   │   ├── middleware/  # Custom middleware (auth, errorHandler)
│   │   │   ├── models/      # Database models (Course, Enrollment, LectureSlot, Schedule, User)
│   │   │   ├── routes/      # API routes (auth, courses, enrollments, faculty, lectureSlots, schedules, users)
│   │   │   ├── utils/       # Utility functions (database, seedData)
│   │   │   ├── __tests__/   # Test files
│   │   │   └── server.js    # Express server setup
│   │   ├── package.json
│   │   └── package-lock.json
│   ├── frontend/            # React client application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components (Auth, Layout)
│   │   │   ├── contexts/    # React contexts (AuthContext)
│   │   │   ├── pages/       # Page components (Auth, Courses, Dashboard, Faculty, Profile, Schedules, Student)
│   │   │   ├── utils/       # Utility functions (api)
│   │   │   ├── App.tsx      # Main app component
│   │   │   ├── main.tsx     # App entry point
│   │   │   └── index.css    # Global styles
│   │   ├── package.json
│   │   └── package-lock.json
│   ├── docker/              # Docker configuration files
│   │   └── mongo-init.js    # MongoDB initialization script
│   ├── docker-compose.yml   # Docker services configuration
│   ├── Dockerfile.backend   # Backend container setup
│   ├── Dockerfile.frontend  # Frontend container setup
│   ├── package.json         # Root package.json with scripts
│   ├── package-lock.json    # Root package lock file
│   └── README.md            # This file
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

## 🛠️ Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Docker & Docker Compose (optional)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd LSP-6/project
   npm install
   ```

2. **Environment Configuration:**
   
   **Backend Environment Variables:**
   Create a `.env` file in the `backend/` directory with the following variables:
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
   
   **Frontend Environment Variables:**
   Create a `.env` file in the `frontend/` directory with the following variables:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   The backend CORS `ALLOWED_ORIGINS` defaults to `http://localhost:3000` if not set. For Vite dev (`http://localhost:5173`), ensure `ALLOWED_ORIGINS` includes `http://localhost:5173`.

3. **Start MongoDB:**
   ```bash
   # Using Docker (recommended)
   docker-compose up mongodb -d
   
   # Or start MongoDB locally
   mongod
   ```

4. **Start Development Servers:**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:backend  # Backend runs on http://localhost:5000
   npm run dev:frontend # Frontend runs on http://localhost:5173
   ```

5. **Seed Database (Optional):**
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
Notes:
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

Backend `.env` example (production):
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

Frontend `.env` example (production):
```env
VITE_API_URL=https://your-backend-domain/api
```

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
#   T i m e t a b l e _ B u d d y  
 