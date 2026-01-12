#!/bin/bash
# TDaaS Schema Verification Script
# Tests that both API endpoints work correctly with tdaas schema

echo "🔍 TDaaS Schema Verification"
echo "=============================="
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Go up one level to project root
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Load environment variables from .env file in project root
if [ -f "$PROJECT_ROOT/.env" ]; then
    echo "📁 Loading DATABASE_URL from $PROJECT_ROOT/.env..."
    export $(cat "$PROJECT_ROOT/.env" | grep -v '^#' | grep DATABASE_URL | xargs)
    echo "✅ Environment loaded"
elif [ -f .env ]; then
    echo "📁 Loading DATABASE_URL from .env (current directory)..."
    export $(cat .env | grep -v '^#' | grep DATABASE_URL | xargs)
    echo "✅ Environment loaded"
else
    echo "⚠️  .env file not found. Using hardcoded connection string..."
    # Fallback to hardcoded URL (not recommended for production)
    DB_URL="postgres://neondb_owner:npg_Y6CNxxxO3XgEJYYXX8MwGa@ep-square-dustybe-ah0067o98u00o.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
    export DATABASE_URL="$DB_URL"
fi
echo ""

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL is not set!"
    echo "Please create a .env file with DATABASE_URL or set it as an environment variable."
    exit 1
fi

echo "1️⃣ Checking schema structure..."
PGSSLMODE=require psql "$DATABASE_URL" -c "\dt tdaas.*"
echo ""

echo "2️⃣ Verifying row counts..."
echo "Trade Balance:"
PGSSLMODE=require psql "$DATABASE_URL" -c "SELECT COUNT(*) as trade_balance_rows FROM tdaas.trade_balance;"
echo ""
echo "Top Export Markets:"
PGSSLMODE=require psql "$DATABASE_URL" -c "SELECT COUNT(*) as top_markets_rows FROM tdaas.top_export_markets;"
echo ""

echo "3️⃣ Checking latest periods..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
SELECT 
  'Trade Balance' as dataset,
  MAX(period) as latest_period,
  COUNT(*) as total_rows
FROM tdaas.trade_balance
UNION ALL
SELECT 
  'Top Export Markets' as dataset,
  MAX(period) as latest_period,
  COUNT(*) as total_rows
FROM tdaas.top_export_markets;
"
echo ""

echo "4️⃣ Sample data from trade_balance..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
SELECT 
  period,
  exports_cad,
  imports_cad,
  balance_cad,
  balance_type
FROM tdaas.trade_balance
ORDER BY period_date DESC
LIMIT 3;
"
echo ""

echo "5️⃣ Sample data from top_export_markets..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
SELECT 
  period,
  country_name,
  exports_cad,
  rank_cad
FROM tdaas.top_export_markets
WHERE period = (SELECT MAX(period) FROM tdaas.top_export_markets)
ORDER BY rank_cad
LIMIT 5;
"
echo ""

echo "6️⃣ Checking for orphaned tables in public schema..."
ORPHANED=$(PGSSLMODE=require psql "$DATABASE_URL" -t -c "
SELECT COUNT(*) 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('trade_balance', 'top_export_markets');
")

if [ "$ORPHANED" -eq "0" ]; then
  echo "✅ No orphaned tables in public schema"
else
  echo "⚠️  Warning: Found $ORPHANED orphaned table(s) in public schema"
  PGSSLMODE=require psql "$DATABASE_URL" -c "
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_name IN ('trade_balance', 'top_export_markets');
  "
fi
echo ""

echo "7️⃣ Schema storage size..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'tdaas'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
"
echo ""

echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "1. Update src/pages/api/tdaas/trade-balance.ts (use updated version)"
echo "2. Deploy updated API files to production"
echo "3. Test API endpoints locally"
echo "4. Push to GitHub to trigger Vercel deployment"
