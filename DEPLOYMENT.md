# Deployment Guide

## GitHub Repository
✅ Code successfully pushed to: https://github.com/KarriDurgaSiva295/NLP_PROJECT

## Deployment Files Added

### 1. `vercel.json` - Vercel Deployment
For deploying the frontend React application to Vercel.

**Deployment Steps:**
1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect `vercel.json` and configure the build
4. Deploy!

### 2. `render.json` - Render Frontend Deployment
For deploying the frontend to Render.

**Deployment Steps:**
1. Go to [Render](https://render.com)
2. Create a new Static Site
3. Connect your GitHub repository
4. Render will use `render.json` for configuration

### 3. `render.yaml` - Render Backend Deployment
For deploying the Flask backend to Render.

**Deployment Steps:**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and deploy the backend service

**Backend Configuration:**
- Service Type: Web Service
- Environment: Python 3.12.6
- Build Command: `cd backend && pip install -r requirements.txt`
- Start Command: `cd backend && python app.py`
- Health Check: `/api/health`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Backend
No environment variables required for basic setup.

## Important Notes

⚠️ **Security**: The `.env` file in the backend directory was committed. For production:
1. Remove it from the repository: `git rm backend/.env`
2. Add it to `.gitignore` (already done)
3. Set environment variables in your deployment platform

## Quick Deploy Commands

### Remove .env from repository (if needed):
```bash
git rm --cached backend/.env
git commit -m "Remove .env from repository"
git push origin main
```

## Deployment URLs

After deployment, update the frontend `.env` file with your backend URL:
- Render Backend: `https://your-service-name.onrender.com`
- Frontend API URL: `https://your-service-name.onrender.com/api`

## Testing Deployment

1. **Backend Health Check:**
   ```
   GET https://your-backend-url.onrender.com/api/health
   ```

2. **Frontend:**
   - Should load at your Vercel/Render frontend URL
   - Update API URL in Connect API modal if needed
