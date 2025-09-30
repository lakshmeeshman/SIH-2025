# Career Navigator Platform 🚀

An AI-powered job matching platform that connects students with career opportunities through intelligent profile management and matching algorithms.

## ✨ Features

### 🎓 Student Portal
- **Profile Management**: Complete professional profiles with skills, projects, and experience
- **Dashboard**: Personalized overview of career progress
- **Smart Matching**: AI-powered job recommendations
- **Real-time Updates**: Instant profile synchronization

### 👨‍💼 Admin Portal
- **Student Management**: Create, view, and manage student accounts
- **Analytics Dashboard**: Track platform usage and engagement
- **User Administration**: Comprehensive user management system

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **SQLite**: Lightweight database
- **JWT Authentication**: Secure token-based authentication
- **bcrypt**: Password hashing and security

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hot Toast**: Beautiful notifications
- **Lucide React**: Modern icon library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/career-navigator-platform.git
   cd career-navigator-platform
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python setup_database.py
   python main.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3003
   - Backend API: http://localhost:8000

## 🔐 Default Credentials

### Admin Access
- **Email**: admin@example.com
- **Password**: admin123

### Student Access
- **Email**: student@example.com
- **Password**: password123

## 📁 Project Structure

```
career-navigator-platform/
├── backend/                 # FastAPI backend
│   ├── routers/            # API route handlers
│   ├── database.py         # Database models and utilities
│   ├── main.py            # FastAPI application entry point
│   └── requirements.txt    # Python dependencies
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript type definitions
│   └── package.json       # Node.js dependencies
└── README.md              # This file
```

## 🎯 Key Features

### 🔄 Real-time Profile Updates
- Instant synchronization between dashboard and profile pages
- Live data updates without page refresh
- Optimized state management

### 🛡️ Robust Error Handling
- Comprehensive error sanitization
- User-friendly error messages
- Graceful fallback mechanisms

### 📱 Responsive Design
- Mobile-first approach
- Beautiful gradient backgrounds
- Smooth animations and transitions

### 🔒 Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
The backend is configured for easy deployment with:
- Docker support
- Railway deployment configuration
- Environment variable management

### Frontend Deployment
The frontend is optimized for:
- Vercel deployment
- Static site generation
- CDN optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by the need for better career guidance tools
- Designed for scalability and maintainability

---

**Ready to navigate your career? Start building your professional profile today!** 🎯