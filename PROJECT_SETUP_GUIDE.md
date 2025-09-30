# 🎓 Student Profile Management - Complete Project Setup Guide

## 📋 **What You Have - Current Status**

### ✅ **Working Components:**
1. **JWT Authentication System**
   - Location: `backend/routers/auth.py` & `backend/routers/users.py`
   - JWT tokens created on login
   - `get_current_user()` validates tokens
   - `require_student_role()` enforces student-only access

2. **Frontend Application**
   - Next.js with TypeScript
   - Profile management interface
   - Skills, projects, experience editors

3. **API Endpoints**
   - `POST /auth/login` - User authentication
   - `GET /users/me` - Get user profile (student role required)
   - `PUT /users/me` - Update user profile (student role required)

### ⚠️ **Current Limitations:**
1. **Mock Database** - Data stored in memory (resets on restart)
2. **Single User** - Only one hardcoded user
3. **No Registration** - Can't create new users

## 🗄️ **Database Setup Options**

### **Option 1: SQLite (Recommended for Development)**
- ✅ No setup required
- ✅ File-based database
- ✅ Perfect for development/testing

### **Option 2: PostgreSQL (Production Ready)**
- ✅ Full-featured database
- ✅ Better for production
- ⚠️ Requires database server

## 🔧 **What You Need to Provide**

### **1. Environment Variables**
Create these files with your values:

**Backend (`backend/.env`):**
```env
SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-random
DATABASE_URL=sqlite:///./career_navigator.db
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### **2. Database Setup (Choose One)**

#### **Option A: SQLite (Easy Setup)**
```bash
# No additional setup needed
# Database file will be created automatically
```

#### **Option B: PostgreSQL (Production)**
```bash
# Install PostgreSQL
# Create database: career_navigator
# Update DATABASE_URL in .env
```

## 🚀 **Complete Setup Instructions**

### **Step 1: Clone and Setup**
```bash
# Clone your repository
git clone https://github.com/yourusername/career-navigator.git
cd career-navigator

# Setup backend
cd backend
pip install -r requirements.txt
cp env.example .env
# Edit .env with your values

# Setup frontend
cd ../frontend
npm install
cp env.example .env.local
# Edit .env.local with your values
```

### **Step 2: Database Migration (If using real database)**
```bash
cd backend
# This will create database tables
python -c "from database import create_tables; create_tables()"
```

### **Step 3: Run the Application**
```bash
# Terminal 1 - Backend
cd backend
python main.py

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### **Step 4: Test the Application**
1. Go to `http://localhost:3000`
2. Login with: `student@example.com` / `password123`
3. Test profile management features

## 🔐 **Authentication Flow Explained**

### **JWT (JSON Web Token) Flow:**
1. **User Login** → `POST /auth/login`
2. **Server validates** → email/password
3. **Server creates JWT** → with user info + expiration
4. **Client stores JWT** → in localStorage
5. **Client sends JWT** → in Authorization header
6. **Server validates JWT** → on protected endpoints

### **Role-Based Access:**
- `get_current_user()` → Validates JWT token
- `require_student_role()` → Checks if user role is "student"
- Protected endpoints → Only accessible to authenticated students

## 📊 **Database Schema**

### **Users Table:**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'student',
    profile_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 **What Each File Does**

### **Backend Files:**
- `main.py` - FastAPI application entry point
- `schemas.py` - Data validation models
- `routers/auth.py` - Authentication endpoints
- `routers/users.py` - User profile endpoints
- `database.py` - Database connection (to be created)
- `requirements.txt` - Python dependencies

### **Frontend Files:**
- `src/app/page.tsx` - Login page
- `src/app/dashboard/page.tsx` - Student dashboard
- `src/app/profile/page.tsx` - Profile management
- `src/components/` - Profile editors
- `src/lib/api.ts` - API client
- `src/types/index.ts` - TypeScript types

## 🔧 **Adding Real Database**

I'll create the database setup for you. Choose your preferred option:

### **SQLite Setup (Recommended)**
- ✅ No external dependencies
- ✅ Perfect for development
- ✅ Easy to backup/restore

### **PostgreSQL Setup (Production)**
- ✅ Better performance
- ✅ More features
- ⚠️ Requires database server

## 📝 **Next Steps**

1. **Choose Database Option** (SQLite or PostgreSQL)
2. **Set Environment Variables**
3. **Run Database Migration**
4. **Test the Application**
5. **Add More Users** (if needed)

## 🆘 **Troubleshooting**

### **Common Issues:**
1. **CORS Errors** → Check `ALLOWED_ORIGINS` in backend
2. **Database Errors** → Check `DATABASE_URL` in .env
3. **JWT Errors** → Check `SECRET_KEY` in .env
4. **API Connection** → Check `NEXT_PUBLIC_API_URL` in frontend

### **Testing Commands:**
```bash
# Test backend
curl http://localhost:8000/

# Test login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "student@example.com", "password": "password123"}'

# Test protected endpoint
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

**Ready to set up your complete Student Profile Management system! 🚀**
