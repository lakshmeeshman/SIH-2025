#!/bin/bash

echo "🔧 Creating Environment Files for Data Storage..."

# Backend environment file
echo "Creating backend/.env..."
cat > backend/.env << EOF
# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3003

# Secret Key for JWT (CHANGE THIS IN PRODUCTION!)
SECRET_KEY=your-super-secret-jwt-key-here-make-it-long-and-random-12345

# Database Configuration
DATABASE_URL=sqlite:///./career_navigator.db
EOF

# Frontend environment file
echo "Creating frontend/.env.local..."
cat > frontend/.env.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

echo "✅ Environment files created successfully!"
echo ""
echo "📋 Files created:"
echo "   - backend/.env (for database and JWT configuration)"
echo "   - frontend/.env.local (for API URL configuration)"
echo ""
echo "🚀 Now you can run the application with data storage!"
