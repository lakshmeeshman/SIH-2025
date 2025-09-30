# 🗄️ Data Storage Setup Guide

## 🎯 **What You Need to Provide for Full Functionality**

### **1. Environment Files (Required)**
Run this command to create the necessary environment files:
```bash
./create_env_files.sh
```

This creates:
- `backend/.env` - Database and JWT configuration
- `frontend/.env.local` - API URL configuration

### **2. Database Setup (Automatic)**
The system will automatically:
- ✅ Create SQLite database file
- ✅ Create user tables
- ✅ Add default student user
- ✅ Store all profile data persistently

## 🚀 **Complete Setup Instructions**

### **Step 1: Create Environment Files**
```bash
# Create environment files
./create_env_files.sh
```

### **Step 2: Setup Backend with Database**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python setup_database.py  # Creates database and default user
python main.py
```

### **Step 3: Setup Frontend**
```bash
cd frontend
npm install
npm run dev  # Will run on port 3003
```

## 🗄️ **Data Storage Details**

### **Database Type: SQLite**
- **File**: `backend/career_navigator.db`
- **Location**: Backend directory
- **Persistence**: ✅ Data survives server restarts
- **Backup**: Copy the `.db` file

### **What Gets Stored:**
1. **User Accounts**
   - Email, password (hashed), role
   - Registration date

2. **Profile Data (JSON)**
   - Basic info (name, phone, LinkedIn, GitHub)
   - Skills array
   - Projects array
   - Work experience array

### **Default User Created:**
- **Email**: `student@example.com`
- **Password**: `password123`
- **Role**: `student`
- **Sample Data**: Pre-filled with example profile

## 🧪 **Testing Data Persistence**

### **Test 1: Login and Profile Management**
1. Go to `http://localhost:3003`
2. Login with: `student@example.com` / `password123`
3. Navigate to "My Profile"
4. Add/edit skills, projects, experience
5. Click "Save Profile"
6. **Verify**: Data is saved

### **Test 2: Data Persistence**
1. Stop the backend server (Ctrl+C)
2. Restart: `python main.py`
3. Login again
4. **Verify**: Your data is still there

### **Test 3: New User Registration**
1. Go to login page
2. Click "Don't have an account? Sign up"
3. Register new user
4. **Verify**: New user can login and manage profile

## 📊 **Database Schema**

### **Users Table:**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    role VARCHAR DEFAULT 'student',
    profile_data TEXT,  -- JSON string
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Profile Data Structure:**
```json
{
  "name": "John Doe",
  "phone": "1234567890",
  "linkedin": "https://www.linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe",
  "skills": ["Python", "FastAPI", "React"],
  "projects": [
    {
      "title": "AI Job Matcher",
      "description": "Core system for Career Navigator.",
      "technologies": ["FastAPI", "OpenAI"]
    }
  ],
  "experience": [
    {
      "role": "Software Engineer Intern",
      "company": "Google",
      "description": "Worked on the core search algorithm.",
      "duration": "6 months"
    }
  ]
}
```

## 🔧 **Configuration Details**

### **Backend (.env):**
```env
ALLOWED_ORIGINS=http://localhost:3003
SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-random-12345
DATABASE_URL=sqlite:///./career_navigator.db
```

### **Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚨 **Troubleshooting**

### **Common Issues:**

1. **Database Not Created**
   ```bash
   cd backend
   python setup_database.py
   ```

2. **Port Conflicts**
   - Frontend runs on port 3003
   - Backend runs on port 8000
   - Check if ports are available

3. **CORS Errors**
   - Check `ALLOWED_ORIGINS` in backend/.env
   - Ensure it includes `http://localhost:3003`

4. **Data Not Persisting**
   - Check database file exists: `backend/career_navigator.db`
   - Verify environment variables are correct

## 🎯 **What You Get**

### **✅ Fully Functional Features:**
- User registration and login
- JWT authentication
- Role-based access control
- Profile data management
- Skills, projects, experience editing
- Data persistence across sessions
- Real-time validation

### **✅ Data Storage:**
- SQLite database with user accounts
- JSON profile data storage
- Automatic data persistence
- Database backup capability

### **✅ Production Ready:**
- Secure password hashing
- JWT token authentication
- Input validation
- Error handling
- CORS protection

## 🚀 **Quick Start Commands**

```bash
# 1. Create environment files
./create_env_files.sh

# 2. Setup and run backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python setup_database.py
python main.py

# 3. Setup and run frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 🎉 **Success!**

Your Student Profile Management system now has:
- ✅ **Persistent Data Storage**
- ✅ **User Authentication**
- ✅ **Profile Management**
- ✅ **Data Persistence**
- ✅ **Production-Ready Architecture**

Visit `http://localhost:3003` to start using your application!
