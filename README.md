# 🎓 Student Profile Management System

A full-stack web application for managing student profiles with skills, projects, and work experience. Built with FastAPI backend and Next.js frontend.

## 🌟 **Features**

- ✅ **User Authentication** - JWT-based secure login
- ✅ **Role-Based Access** - Student-only profile management
- ✅ **Profile Management** - Skills, projects, and experience editing
- ✅ **Data Persistence** - SQLite/PostgreSQL database support
- ✅ **Real-time Validation** - Frontend and backend validation
- ✅ **Responsive Design** - Modern UI with Tailwind CSS

## 🏗️ **Architecture**

### **Backend (FastAPI)**
- **Authentication**: JWT tokens with role-based access
- **Database**: SQLAlchemy with SQLite/PostgreSQL support
- **API**: RESTful endpoints with Pydantic validation
- **Security**: Password hashing, CORS protection

### **Frontend (Next.js)**
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **API Client**: Axios with interceptors

## 🚀 **Quick Start**

### **Option 1: Automated Setup**
```bash
# Clone the repository
git clone https://github.com/yourusername/career-navigator.git
cd career-navigator

# Run the setup script
./setup.sh
```

### **Option 2: Manual Setup**

#### **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp env.example .env
# Edit .env with your configuration
python setup_database.py
python main.py
```

#### **Frontend Setup**
```bash
cd frontend
npm install
cp env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## 🔧 **Configuration**

### **Backend Environment (.env)**
```env
SECRET_KEY=your-super-secret-jwt-key-here
DATABASE_URL=sqlite:///./career_navigator.db
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:3002
```

### **Frontend Environment (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🗄️ **Database Options**

### **SQLite (Default - Development)**
- ✅ No setup required
- ✅ File-based database
- ✅ Perfect for development

### **PostgreSQL (Production)**
- ✅ Better performance
- ✅ More features
- ⚠️ Requires database server

## 🔐 **Authentication Flow**

1. **User Login** → `POST /auth/login`
2. **Server validates** → email/password
3. **Server creates JWT** → with user info + expiration
4. **Client stores JWT** → in localStorage
5. **Client sends JWT** → in Authorization header
6. **Server validates JWT** → on protected endpoints

## 📊 **API Endpoints**

### **Authentication**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### **User Profile (Protected)**
- `GET /users/me` - Get current user profile
- `PUT /users/me` - Update current user profile

## 🎯 **Default User**

For testing purposes:
- **Email**: `student@example.com`
- **Password**: `password123`
- **Role**: `student`

## 📁 **Project Structure**

```
career-navigator/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── database.py          # Database models and connection
│   ├── schemas.py           # Pydantic models
│   ├── routers/
│   │   ├── auth.py          # Authentication endpoints
│   │   └── users.py         # User profile endpoints
│   ├── setup_database.py    # Database initialization
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   ├── components/      # React components
│   │   ├── lib/             # API client
│   │   └── types/           # TypeScript types
│   └── package.json         # Node.js dependencies
├── setup.sh                 # Automated setup script
└── README.md               # This file
```

## 🧪 **Testing**

### **Backend Testing**
```bash
# Test API endpoint
curl http://localhost:8000/

# Test login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "student@example.com", "password": "password123"}'

# Test protected endpoint
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **Frontend Testing**
1. Visit `http://localhost:3000`
2. Login with default credentials
3. Navigate to "My Profile"
4. Test profile management features

## 🚀 **Deployment**

For production deployment, see `DEPLOYMENT_GUIDE.md` for detailed instructions using:
- **Backend**: Railway.app or Render
- **Frontend**: Vercel
- **Database**: PostgreSQL

## 🛠️ **Development**

### **Adding New Features**
1. **Backend**: Add endpoints in `routers/`
2. **Frontend**: Add components in `src/components/`
3. **Database**: Update models in `database.py`

### **Database Migrations**
```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head
```

## 📚 **Documentation**

- `PROJECT_SETUP_GUIDE.md` - Detailed setup instructions
- `DEPLOYMENT_GUIDE.md` - Production deployment guide
- API Documentation: `http://localhost:8000/docs` (when running)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License.

## 🆘 **Support**

If you encounter issues:
1. Check the setup guide
2. Verify environment variables
3. Check database connection
4. Review API documentation

---

**Built with ❤️ for student success! 🎓**