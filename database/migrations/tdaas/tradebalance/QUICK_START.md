# Quick Start: Trade Balance API

## 🚀 Automated Setup (Easiest)

```bash
cd /Users/anthony.mano/ceproc-astro-website

# Copy the files first
# (You should have: trade-balance-api.ts and setup-trade-balance-api.sh)

# Run the setup script
bash setup-trade-balance-api.sh
```

The script will:
✅ Install `@neondatabase/serverless`
✅ Create `.env` file
✅ Update `.gitignore`
✅ Create API directory
✅ Copy API file to correct location

---

## 📝 Manual Setup (If you prefer)

### Step 1: Install Package
```bash
npm install @neondatabase/serverless
```

### Step 2: Create .env File
```bash
# Create .env in project root
echo 'DATABASE_URL="postgres://neondb_owner:npg_Y6CNxxxO3XgEJYYXX8MwGa@ep-square-dustybe-ah0067o98u00o.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"' > .env
```

### Step 3: Copy API File
```bash
mkdir -p src/pages/api/tdaas
cp trade-balance-api.ts src/pages/api/tdaas/trade-balance.ts
```

### Step 4: Test
```bash
npm run dev

# In another terminal:
curl http://localhost:4321/api/tdaas/trade-balance
```

---

## 🧪 Test the API

Once your dev server is running:

```bash
# Basic test
curl http://localhost:4321/api/tdaas/trade-balance

# Get last 12 months in CAD
curl "http://localhost:4321/api/tdaas/trade-balance?currency=CAD&limit=12"

# Get last 24 months in USD
curl "http://localhost:4321/api/tdaas/trade-balance?currency=USD&limit=24"

# Get 2024 data only
curl "http://localhost:4321/api/tdaas/trade-balance?start_date=2024-01-01&end_date=2024-12-31"
```

Or open in browser:
```
http://localhost:4321/api/tdaas/trade-balance?currency=CAD&limit=12
```

---

## ✅ Expected Response

```json
{
  "success": true,
  "data": [
    {
      "period": "2024-12",
      "date": "2024-12-01",
      "exports": 69120.3,
      "imports": 66890.5,
      "balance": 2229.8,
      "type": "surplus"
    }
  ],
  "summary": {
    "average_balance": 1925.3,
    "surplus_months": 11,
    "deficit_months": 1,
    "strongest_month": {
      "period": "2024-09",
      "balance": 3369.5
    }
  }
}
```

---

## 📤 Deploy to Vercel

1. Add environment variable in Vercel Dashboard:
   - Go to: Project → Settings → Environment Variables
   - Name: `DATABASE_URL`
   - Value: Your Neon connection string
   - Save

2. Deploy:
   ```bash
   vercel --prod
   ```

---

## 🎯 What's Next?

Once the API is working:

**Phase 3: Build the Frontend**
1. React Modal Component
2. Chart.js Visualization
3. "View Analytics" button functionality
4. Export to CSV/Excel

Ready? Let's build the modal! 🚀
