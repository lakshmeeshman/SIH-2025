# 🌍 Global Deployment Guide - Student Profile Management

This guide will help you deploy your Student Profile Management system to the cloud, making it accessible worldwide.

## 🚀 **Deployment Overview**

- **Backend (FastAPI)**: Railway.app (Free tier available)
- **Frontend (Next.js)**: Vercel (Free tier available)
- **Database**: In-memory (for demo) or PostgreSQL (for production)

## 📋 **Prerequisites**

1. **GitHub Account**: For code repository
2. **Railway Account**: For backend hosting
3. **Vercel Account**: For frontend hosting

## 🔧 **Step 1: Prepare Your Code**

### 1.1 Push to GitHub
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Student Profile Management System"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/career-navigator.git
git push -u origin main
```

### 1.2 Update Environment Variables
- Copy `backend/env.example` to `backend/.env`
- Copy `frontend/env.example` to `frontend/.env`
- Update the values as needed

## 🎯 **Step 2: Deploy Backend to Railway**

### 2.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Deploy Backend
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Select the `backend` folder
5. Railway will automatically detect the Dockerfile

### 2.3 Configure Environment Variables
In Railway dashboard:
1. Go to your project → Variables
2. Add these environment variables:
   ```
   ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
   SECRET_KEY=your-super-secret-jwt-key-here
   ```

### 2.4 Get Backend URL
- Railway will provide a URL like: `https://your-app-name.railway.app`
- Save this URL for the frontend configuration

## 🎨 **Step 3: Deploy Frontend to Vercel**

### 3.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

### 3.2 Deploy Frontend
1. Click "New Project"
2. Import your GitHub repository
3. Set the root directory to `frontend`
4. Vercel will auto-detect Next.js

### 3.3 Configure Environment Variables
In Vercel dashboard:
1. Go to your project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```

### 3.4 Deploy
- Click "Deploy"
- Vercel will build and deploy your app
- You'll get a URL like: `https://your-app-name.vercel.app`

## 🔄 **Step 4: Update CORS Configuration**

### 4.1 Update Backend CORS
In Railway dashboard, update the `ALLOWED_ORIGINS` variable:
```
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

### 4.2 Redeploy Backend
- Railway will automatically redeploy when you change environment variables

## ✅ **Step 5: Test Your Deployment**

### 5.1 Test Backend
```bash
curl https://your-backend-url.railway.app/
# Should return: {"message":"Career Navigator API"}
```

### 5.2 Test Frontend
1. Visit your Vercel URL
2. Try logging in with:
   - Email: `student@example.com`
   - Password: `password123`

### 5.3 Test Full Flow
1. Login to the frontend
2. Navigate to "My Profile"
3. Add/edit skills, projects, experience
4. Save and verify data persists

## 🌐 **Step 6: Custom Domain (Optional)**

### 6.1 Backend Custom Domain
1. In Railway dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 6.2 Frontend Custom Domain
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 🔒 **Step 7: Production Security**

### 7.1 Update Secret Keys
- Generate strong JWT secret keys
- Use environment variables for all secrets
- Never commit secrets to git

### 7.2 Database (Optional)
For production, consider:
- PostgreSQL on Railway
- MongoDB Atlas
- Supabase

## 📊 **Step 8: Monitoring & Analytics**

### 8.1 Backend Monitoring
- Railway provides built-in metrics
- Add logging for better debugging

### 8.2 Frontend Analytics
- Vercel Analytics (built-in)
- Google Analytics
- Hotjar for user behavior

## 🚨 **Troubleshooting**

### Common Issues:

1. **CORS Errors**
   - Check `ALLOWED_ORIGINS` in Railway
   - Ensure frontend URL is included

2. **API Connection Issues**
   - Verify `NEXT_PUBLIC_API_URL` in Vercel
   - Check backend is running

3. **Build Failures**
   - Check build logs in Vercel
   - Ensure all dependencies are in package.json

## 🎉 **Success!**

Your Student Profile Management system is now live and accessible worldwide!

### **Your Live URLs:**
- **Frontend**: https://your-app-name.vercel.app
- **Backend**: https://your-app-name.railway.app
- **API Docs**: https://your-app-name.railway.app/docs

### **Features Available Globally:**
- ✅ User authentication
- ✅ Profile management
- ✅ Skills, projects, experience editing
- ✅ Data persistence
- ✅ Responsive design
- ✅ Real-time validation

## 📈 **Next Steps**

1. **Add Database**: Implement PostgreSQL for data persistence
2. **Authentication**: Add user registration
3. **Email Verification**: Add email confirmation
4. **File Uploads**: Add profile picture uploads
5. **Advanced Features**: Add more profile fields

## 🆘 **Support**

If you encounter issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally first
4. Check the troubleshooting section above

---

**Congratulations! Your Student Profile Management system is now live and accessible to users worldwide! 🌍**
