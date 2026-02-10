# 🚀 Deployment Guide

## Why Vercel Failed

❌ **Vercel is serverless and doesn't support:**
- Persistent WebSocket connections (Socket.io for video calls)
- Background cron jobs (email reminders run every hour)
- Long-running server processes

✅ **This app needs a traditional server** (Node.js running 24/7)

---

## Recommended Platforms

### 1️⃣ **Railway.app** (Easiest - Docker Support)

**Pricing:** $5/month credit (free trial available)  
**Best for:** Full-stack apps with WebSockets

#### Steps:

1. **Go to [railway.app](https://railway.app)**
2. **Sign in with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select `ai-powered-therapist` repository**
5. **Railway auto-detects `docker-compose.yml`** and deploys all 3 services
6. **Add Environment Variables:**
   - Click on `backend` service
   - Go to "Variables" tab
   - Add all variables from `backend/.env`:
     ```bash
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ADMIN_EMAIL=your_email
     ADMIN_PASSWORD=your_password
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     EMAIL_USER=your_gmail
     EMAIL_PASS=your_app_password
     FRONTEND_URL=your_frontend_url,your_admin_url
     CURRENCY=inr
     ```

7. **Update Frontend URLs:**
   - Get backend URL from Railway (e.g., `https://backend-production-xxxx.up.railway.app`)
   - In `frontend/src/App.jsx` and `admin/src/App.jsx`:
     ```javascript
     backendUrl: 'https://your-backend-url.railway.app'
     ```

8. **Redeploy** (Railway auto-deploys on git push)

---

### 2️⃣ **Render.com** (Free Tier Available)

**Pricing:** Free tier (sleeps after inactivity), $7/mo for always-on  
**Best for:** Budget-friendly full-stack deployment

#### Steps:

1. **Go to [render.com](https://render.com)**
2. **Create 3 separate services:**

   **A. Backend (Web Service):**
   - "New" → "Web Service"
   - Connect GitHub repo → Select `ai-powered-therapist`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Add environment variables
   
   **B. Frontend (Static Site):**
   - "New" → "Static Site"
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
   
   **C. Admin (Static Site):**
   - Same as frontend but root: `admin`

3. **Get URLs and update CORS:**
   - Backend URL: `https://your-app.onrender.com`
   - Update `backend/server.js`:
     ```javascript
     origin: [
       "https://your-frontend.onrender.com",
       "https://your-admin.onrender.com"
     ]
     ```

---

### 3️⃣ **Docker on VPS** (Full Control)

**Platforms:** DigitalOcean ($6/mo), Linode, AWS Lightsail  
**Best for:** Maximum control, custom domain

#### Setup on Ubuntu VPS:

```bash
# 1. SSH into your VPS
ssh root@your-server-ip

# 2. Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Install Docker Compose
apt install docker-compose -y

# 4. Clone your repository
git clone https://github.com/your-username/ai-powered-therapist.git
cd ai-powered-therapist

# 5. Create environment files
nano backend/.env
# (Paste all your environment variables)

# 6. Build and run containers
docker-compose up -d --build

# 7. Check status
docker-compose ps

# Access your app:
# Backend: http://your-server-ip:4000
# Frontend: http://your-server-ip:3000
# Admin: http://your-server-ip:3001
```

#### Setup Custom Domain (Optional):

```bash
# Install Nginx
apt install nginx -y

# Create Nginx config
nano /etc/nginx/sites-available/therapy-app

# Add proxy configuration:
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}

server {
    listen 80;
    server_name admin.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3001;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:4000;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/therapy-app /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Install SSL certificate
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d admin.yourdomain.com -d api.yourdomain.com
```

---

### 4️⃣ **Hybrid Deployment** (Split Services)

**Frontend/Admin:** Netlify or Vercel (static sites work fine)  
**Backend:** Railway or Render (needs persistent server)

#### Steps:

**A. Deploy Backend on Railway/Render** (follow steps above)

**B. Build Frontend/Admin with Backend URL:**

```bash
# Update frontend/.env
VITE_BACKEND_URL=https://your-backend.railway.app

# Update admin/.env  
VITE_BACKEND_URL=https://your-backend.railway.app

# Build
cd frontend
npm run build

cd ../admin
npm run build
```

**C. Deploy to Netlify:**

```bash
npm install -g netlify-cli

# Frontend
cd frontend
netlify deploy --prod --dir=dist

# Admin
cd ../admin
netlify deploy --prod --dir=dist
```

**D. Update CORS in Backend:**

Add Netlify URLs to `backend/server.js`:
```javascript
origin: [
  "https://your-frontend.netlify.app",
  "https://your-admin.netlify.app"
]
```

---

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas connection string ready
- [ ] Cloudinary credentials configured
- [ ] Gmail App Password generated (for email reminders)
- [ ] Frontend/Admin URLs added to backend CORS
- [ ] Environment variables secured (never commit .env files)
- [ ] Test video calls after deployment (WebRTC may need TURN server)
- [ ] Verify cron job runs (check email reminders after 1 hour)

---

## 🔥 Common Issues

### **Socket.io not connecting:**
- Check backend URL in frontend/admin
- Ensure CORS includes your frontend domains
- Look for `Access-Control-Allow-Origin` errors in browser console

### **Video calls not working:**
- Simple-peer needs STUN/TURN servers for production
- Update `useVideoCall.js`:
  ```javascript
  const peer = new SimplePeer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:global.stun.twilio.com:3478' }
      ]
    },
    stream: stream
  });
  ```

### **Email reminders not sending:**
- Check backend logs: `docker-compose logs backend`
- Verify Gmail App Password is correct
- Ensure cron job is running: Look for "Email reminder service started" in logs

---

## 🎯 Recommended Choice

**For beginners:** Railway.app (easiest Docker deployment)  
**For free tier:** Render.com (free but sleeps after inactivity)  
**For production:** DigitalOcean VPS + Docker ($6/mo, full control)

---

## 🆘 Need Help?

1. Check platform documentation
2. Verify environment variables match `.env.example`
3. Check container logs: `docker-compose logs -f`
4. Test API health: `https://your-backend-url/api/health`
