# Pre-Deployment Checklist ✅

## Before You Deploy

### 1. Test Locally
```bash
cd /Users/anthony.mano/ceproc-astro-website

# Build locally
npm run build

# Should complete without errors
```

### 2. Verify Config Files
```bash
# Check all config files exist
ls -la src/data/site-config.json
ls -la src/data/tdaas-page-config.json
ls -la src/data/tdaas-modal-config.json
```

### 3. Test All Features Locally
- [ ] Homepage loads
- [ ] TDaaS page loads
- [ ] Modal opens
- [ ] Chart displays data
- [ ] API returns data: `curl http://localhost:4321/api/tdaas/trade-balance`
- [ ] Export CSV works
- [ ] All buttons functional

### 4. Verify .gitignore
```bash
# .env should NOT be tracked
git status | grep .env
# Should return nothing
```

### 5. Check Database Connection
```bash
# Verify you can connect to Neon
PGSSLMODE=require psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM trade_balance;"
# Should return: 60
```

---

## Deploy Command

Once all checks pass:

```bash
# Option 1: Use automated script
bash DEPLOY_COMMANDS.sh

# Option 2: Manual deployment
git add .
git commit -m "feat: TDaaS production deployment"
git push origin main
```

---

## Post-Deployment

### 1. Add Environment Variables in Vercel
- Go to: https://vercel.com/dashboard
- Project → Settings → Environment Variables
- Add: `DATABASE_URL` with your Neon connection string
- **Important**: Redeploy after adding!

### 2. Test Production
- Visit: `https://your-domain.vercel.app/tdaas`
- Click "View Analytics"
- Verify data loads

### 3. Monitor
- Check Vercel build logs
- Check browser console for errors
- Test API: `https://your-domain.vercel.app/api/tdaas/trade-balance`

---

**All checks pass? Deploy! 🚀**
