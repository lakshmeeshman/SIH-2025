#!/bin/bash

echo "🚀 Student Profile Management - Deployment Script"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Student Profile Management System"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if user has GitHub remote
if ! git remote | grep -q origin; then
    echo "🔗 Please add your GitHub repository as origin:"
    echo "   git remote add origin https://github.com/yourusername/career-navigator.git"
    echo "   git push -u origin main"
else
    echo "✅ GitHub remote configured"
fi

echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy Backend to Railway:"
echo "   - Go to https://railway.app"
echo "   - Connect GitHub account"
echo "   - Deploy from repository"
echo "   - Select 'backend' folder"
echo "   - Set environment variables:"
echo "     ALLOWED_ORIGINS=https://your-frontend-url.vercel.app"
echo "     SECRET_KEY=your-secret-key-here"
echo ""
echo "3. Deploy Frontend to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Connect GitHub account"
echo "   - Import repository"
echo "   - Set root directory to 'frontend'"
echo "   - Set environment variable:"
echo "     NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app"
echo ""
echo "4. Test your deployment:"
echo "   - Visit your Vercel URL"
echo "   - Login with: student@example.com / password123"
echo "   - Test profile management features"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Happy Deploying!"
