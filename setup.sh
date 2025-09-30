#!/bin/bash

echo "🎓 Career Navigator - Complete Setup Script"
echo "==========================================="

# Check if we're in the right directory
if [ ! -f "backend/main.py" ] || [ ! -f "frontend/package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Setting up the complete project..."

# Backend setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Create environment file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "⚙️ Creating environment file..."
    cp env.example .env
    echo "✅ Created .env file - please edit it with your values"
fi

# Create environment files for data storage
echo "🗄️ Creating environment files for data storage..."
../create_env_files.sh

# Setup database
echo "🗄️ Setting up database..."
python setup_database.py

echo "✅ Backend setup complete!"

# Frontend setup
echo ""
echo "🎨 Setting up Frontend..."
cd ../frontend

# Install dependencies
echo "📥 Installing Node.js dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "⚙️ Creating environment file..."
    cp env.example .env.local
    echo "✅ Created .env.local file - please edit it with your values"
fi

echo "✅ Frontend setup complete!"

# Final instructions
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📋 Next Steps:"
echo "1. Environment files are already created with correct settings"
echo "2. Start the backend: cd backend && python main.py"
echo "3. Start the frontend: cd frontend && npm run dev"
echo "4. Visit http://localhost:3003 and login with:"
echo "   Email: student@example.com"
echo "   Password: password123"
echo ""
echo "🗄️ Data Storage:"
echo "   - SQLite database: backend/career_navigator.db"
echo "   - All profile data is automatically saved"
echo "   - Data persists across server restarts"
echo ""
echo "📖 For detailed instructions, see PROJECT_SETUP_GUIDE.md"
echo ""
echo "🚀 Happy coding!"
