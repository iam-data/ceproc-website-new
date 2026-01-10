# Trade Balance API - Installation Guide

## Step 1: Install Neon Serverless Driver

```bash
cd /Users/anthony.mano/ceproc-astro-website

# Install the Neon serverless package
npm install @neondatabase/serverless
```

---

## Step 2: Set Up Environment Variables

Create/update your `.env` file in the project root:

```bash
# Create .env file if it doesn't exist
touch .env

# Add your Neon connection string
echo 'DATABASE_URL="postgres://neondb_owner:npg_Y6CNxxxO3XgEJYYXX8MwGa@ep-square-dustybe-ah0067o98u00o.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"' >> .env
```

**Or manually edit `.env`:**

```env
# .env file
DATABASE_URL="postgres://neondb_owner:npg_Y6CNxxxO3XgEJYYXX8MwGa@ep-square-dustybe-ah0067o98u00o.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

**IMPORTANT**: Add `.env` to your `.gitignore` to avoid committing secrets!

```bash
# Add to .gitignore if not already there
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

---

## Step 3: Copy API File to Your Project

```bash
# Create the API directory if it doesn't exist
mkdir -p src/pages/api/tdaas

# Copy the API endpoint
cp trade-balance-api.ts src/pages/api/tdaas/trade-balance.ts
```

---

## Step 4: Update Astro Config for Environment Variables

Make sure your `astro.config.mjs` can access environment variables:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ... your existing config
  
  // This allows API routes to access env variables
  vite: {
    define: {
      'import.meta.env.DATABASE_URL': JSON.stringify(process.env.DATABASE_URL),
    }
  }
});
```

**Or simpler - Astro automatically loads .env files, so this might not be needed!**

---

## Step 5: Test the API Locally

```bash
# Start your dev server
npm run dev

# In another terminal, test the API
curl http://localhost:4321/api/tdaas/trade-balance

# Test with parameters
curl "http://localhost:4321/api/tdaas/trade-balance?currency=CAD&limit=12"

# Test USD
curl "http://localhost:4321/api/tdaas/trade-balance?currency=USD&limit=6"

# Test date range
curl "http://localhost:4321/api/tdaas/trade-balance?start_date=2024-01-01&end_date=2024-12-31"
```

**Expected Response:**
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
    },
    ...
  ],
  "metadata": {
    "total_records": 12,
    "currency": "CAD",
    "unit": "millions",
    "source": "Statistics Canada"
  },
  "summary": {
    "total_exports": 812345.6,
    "total_imports": 789234.1,
    "average_balance": 1925.3,
    "surplus_months": 11,
    "deficit_months": 1,
    "surplus_rate": 91.7,
    "strongest_month": {
      "period": "2024-09",
      "balance": 3369.5
    },
    "weakest_month": {
      "period": "2024-05",
      "balance": -349.4
    }
  }
}
```

---

## Step 6: Deploy to Vercel

When you deploy to Vercel, you need to add the environment variable:

**Option A: Via Vercel Dashboard**
1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgres://neondb_owner:npg_Y6CNxxxO3XgEJYYXX8MwGa@ep-square-dustybe-ah0067o98u00o.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require`
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. Redeploy your project

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Add environment variable
vercel env add DATABASE_URL

# When prompted, paste your connection string
# Select: Production, Preview, Development

# Deploy
vercel --prod
```

---

## API Endpoint Documentation

### Endpoint
```
GET /api/tdaas/trade-balance
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `currency` | string | `CAD` | Currency to return (`CAD` or `USD`) |
| `limit` | number | `12` | Number of records to return (1-120) |
| `start_date` | string | - | Filter start date (YYYY-MM-DD) |
| `end_date` | string | - | Filter end date (YYYY-MM-DD) |

### Examples

**Get last 12 months in CAD:**
```
GET /api/tdaas/trade-balance
GET /api/tdaas/trade-balance?currency=CAD&limit=12
```

**Get last 24 months in USD:**
```
GET /api/tdaas/trade-balance?currency=USD&limit=24
```

**Get specific date range:**
```
GET /api/tdaas/trade-balance?start_date=2023-01-01&end_date=2023-12-31
```

**Get all 2024 data:**
```
GET /api/tdaas/trade-balance?start_date=2024-01-01&end_date=2024-12-31&limit=12
```

---

## Troubleshooting

### Error: "DATABASE_URL environment variable is not set"
**Solution**: Make sure `.env` file exists and contains `DATABASE_URL`

```bash
# Check if .env exists
cat .env

# If not, create it
echo 'DATABASE_URL="your_connection_string_here"' > .env

# Restart dev server
npm run dev
```

### Error: "Unable to connect to database"
**Solution**: Check your connection string is correct

```bash
# Test connection from terminal
PGSSLMODE=require psql "$DATABASE_URL" -c "SELECT 1;"
```

### Error: "relation 'trade_balance' does not exist"
**Solution**: Run the migration again

```bash
cd /Users/anthony.mano/ceproc-astro-website/database/migrations/tdaas/tradebalance
PGSSLMODE=require psql "$DATABASE_URL" -f 003_create_trade_balance_table.sql
PGSSLMODE=require psql "$DATABASE_URL" -f trade_balance_initial_seed.sql
```

### API returns empty data array
**Solution**: Check if data exists in database

```bash
PGSSLMODE=require psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM trade_balance;"
```

---

## Next Steps

Once the API is working:
1. ✅ Build React modal component
2. ✅ Create Chart.js visualization
3. ✅ Add export functionality (CSV/Excel)
4. ✅ Wire up "View Analytics" button to open modal

Ready to proceed to Phase 2: Frontend Modal + Chart? 🚀
