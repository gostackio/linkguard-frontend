# Frontend Deployment to Google Cloud Run

## ✅ Pre-Deployment Setup

### Prerequisites
- Google Cloud Project created
- `gcloud` CLI installed
- Docker installed (for local testing)
- GitHub connection to Google Cloud Build (or manual push)

## 🚀 Deploy Frontend to Cloud Run (5 Steps)

### Step 1: Setup Google Cloud Project

```bash
# Set your project ID
$PROJECT_ID = "your-gcp-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### Step 2: Build the Docker Image

```bash
cd d:\Projects\linkguard\linkguard-frontend

# Build locally (test first)
docker build -t linkguard-frontend:latest .

# Test the image
docker run -p 8080:8080 linkguard-frontend:latest

# Should see: "Accepting connections at http://localhost:8080"
```

### Step 3: Push to Google Container Registry

```bash
# Configure docker for Google Cloud
gcloud auth configure-docker

# Tag the image
docker tag linkguard-frontend:latest gcr.io/$PROJECT_ID/linkguard-frontend:latest

# Push to GCR
docker push gcr.io/$PROJECT_ID/linkguard-frontend:latest

# Verify image is in GCR
gcloud container images list
```

### Step 4: Deploy to Cloud Run

**Option A: Using gcloud CLI (Recommended)**

```bash
gcloud run deploy linkguard-frontend `
  --image gcr.io/$PROJECT_ID/linkguard-frontend:latest `
  --platform managed `
  --region us-central1 `
  --port 8080 `
  --allow-unauthenticated `
  --set-env-vars VITE_API_URL=https://linkguard-api-733656195503.us-central1.run.app `
  --memory 512Mi `
  --cpu 1 `
  --timeout 900 `
  --max-instances 100
```

**Option B: Using Cloud Console (Web UI)**

1. Go to Cloud Run: https://console.cloud.google.com/run
2. Click "Create Service"
3. Select "Deploy one revision from an existing image"
4. Choose `gcr.io/$PROJECT_ID/linkguard-frontend:latest`
5. Set service name: `linkguard-frontend`
6. Region: `us-central1`
7. Authentication: Allow unauthenticated invocations
8. Click "Expand Advanced Settings":
   - Memory: 512 MB
   - CPU: 1
   - Port: 8080
   - Environment variables:
     - `VITE_API_URL` = `https://linkguard-api-733656195503.us-central1.run.app`
   - Max instances: 100
9. Click "Create"

### Step 5: Access Your Application

After deployment completes:

```bash
# Get the service URL
gcloud run services describe linkguard-frontend --region us-central1 --format='value(status.url)'

# Will output something like:
# https://linkguard-frontend-xxxxx.run.app
```

Visit the URL in your browser - your frontend is now live! ✅

---

## 🔄 Automated Deployment with Cloud Build (Optional)

### Connect GitHub Repository

1. Go to Cloud Build: https://console.cloud.google.com/cloud-build
2. Click "Create Trigger"
3. Connect GitHub repository
4. Configure trigger:
   - Name: `linkguard-frontend-deploy`
   - Event: Push to branch
   - Branch: `main`
   - Build configuration: Cloud Build configuration file
   - Location: `linkguard-frontend/cloudbuild.yaml`
5. Click "Create"

Now every push to main will automatically:
- Build the Docker image
- Push to Google Container Registry
- Deploy to Cloud Run

---

## 🧪 Testing Your Deployment

### Test 1: Frontend is Running
```bash
# Replace with your Cloud Run URL
$FRONTEND_URL = "https://linkguard-frontend-xxxxx.run.app"

# Should show your app
Invoke-WebRequest $FRONTEND_URL
```

### Test 2: API Integration
1. Open the frontend URL in browser
2. Click "Get Started" or "Sign Up"
3. Create a test account
4. Verify login works

### Test 3: Link Monitoring
1. After login, go to "Links"
2. Add a test link: `https://www.google.com`
3. Verify link appears in list
4. Verify API calls succeed (check browser console - F12)

---

## 📊 Environment Variables

Set these when deploying:

| Variable | Value | Required |
|----------|-------|----------|
| `VITE_API_URL` | `https://linkguard-api-733656195503.us-central1.run.app` | Yes |
| `NODE_ENV` | `production` | Yes |
| `PORT` | `8080` | Yes |

To update environment variables after deployment:

```bash
gcloud run services update linkguard-frontend `
  --region us-central1 `
  --update-env-vars VITE_API_URL=https://linkguard-api-733656195503.us-central1.run.app
```

---

## 🔐 Security & Configuration

✅ **Dockerfile Best Practices**:
- Multi-stage build (smaller final image)
- Alpine Linux (minimal base image)
- Non-root user best practice (via serve)
- Health checks enabled
- Production mode enabled

✅ **Cloud Run Best Practices**:
- Auto-scaling enabled
- Memory: 512 MB (suitable for static site)
- CPU: 1 (can scale up if needed)
- Timeout: 900 seconds
- Max instances: 100 (adjust based on traffic)

✅ **Network Security**:
- Allow unauthenticated access (frontend is public)
- HTTPS enforced by Cloud Run
- Backend API URL points to secured Cloud Run backend

---

## 📈 Monitoring & Logs

### View Logs

```bash
# Real-time logs
gcloud run logs read linkguard-frontend --region us-central1 --limit 50 --follow

# Last 100 lines
gcloud run logs read linkguard-frontend --region us-central1 --limit 100
```

### Cloud Console

1. Go to Cloud Run: https://console.cloud.google.com/run
2. Click on `linkguard-frontend`
3. View metrics, logs, and revisions

---

## 🔄 Updating Your Deployment

### When You Push Code Changes

1. **Rebuild the image**:
```bash
docker build -t gcr.io/$PROJECT_ID/linkguard-frontend:latest .
docker push gcr.io/$PROJECT_ID/linkguard-frontend:latest
```

2. **Deploy new revision**:
```bash
gcloud run deploy linkguard-frontend `
  --image gcr.io/$PROJECT_ID/linkguard-frontend:latest `
  --region us-central1
```

Or with Cloud Build enabled, just push to main and it's automatic!

---

## 🆘 Troubleshooting

### Docker Build Fails
```bash
# Try local build with no cache
docker build --no-cache -t linkguard-frontend:latest .

# Check Docker version
docker --version  # Should be 20.0+

# Check npm version
npm --version  # Should be 8.0+
```

### Image Won't Start
```bash
# Run locally to debug
docker run -it -p 8080:8080 linkguard-frontend:latest

# Check logs
docker logs <container_id>
```

### API Calls Fail
1. Verify backend is running: https://linkguard-api-733656195503.us-central1.run.app/health
2. Check VITE_API_URL environment variable is set correctly
3. Check browser console for CORS errors (F12 → Console)

### Can't Access Cloud Run Service
1. Verify service exists: `gcloud run services list --region us-central1`
2. Check authentication: Service should allow unauthenticated
3. Verify region is correct: `us-central1`

---

## 💰 Cost Estimation

**Cloud Run Pricing** (as of Nov 2025):
- First 2 million requests/month: Free
- Memory: $0.00002501 per vCPU-second
- Typical frontend: <$5/month

**Typical Monthly Usage**:
- 1M requests × 512MB: ~$2
- Very affordable for side projects!

---

## ✨ Final Status

| Component | URL | Status |
|-----------|-----|--------|
| Backend API | https://linkguard-api-733656195503.us-central1.run.app | ✅ Live |
| Frontend | https://linkguard-frontend-xxxxx.run.app | 🚀 Deploying |
| Database | Supabase PostgreSQL | ✅ Connected |

---

## 🎉 Next Steps

1. **Deploy frontend** using steps above (5 minutes)
2. **Test all features** (10 minutes)
3. **Setup monitoring** (optional, 5 minutes)
4. **Celebrate! 🎊**

Your full-stack app is now on Cloud Run!
