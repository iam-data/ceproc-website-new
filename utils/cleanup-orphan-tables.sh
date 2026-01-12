#!/bin/bash
# Cleanup Orphaned Tables Script
# Removes any TDaaS tables left in public schema

echo "🧹 Cleaning up orphaned tables..."
echo "=================================="
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
    echo "❌ ERROR: .env file not found!"
    echo "Looked in: $PROJECT_ROOT/.env and ./env"
    exit 1
fi
echo ""

# Verify DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL is not set in .env file!"
    exit 1
fi

echo "Checking for orphaned tables in public schema..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
SELECT 
    table_schema,
    table_name,
    'WILL BE DROPPED' as action
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('trade_balance', 'top_export_markets');
"
echo ""

echo "Dropping orphaned tables..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
DROP TABLE IF EXISTS public.top_export_markets CASCADE;
DROP TABLE IF EXISTS public.trade_balance CASCADE;
"
echo ""

echo "✅ Cleanup complete!"
echo ""
echo "Verifying only tdaas schema tables remain..."
PGSSLMODE=require psql "$DATABASE_URL" -c "
SELECT 
    table_schema,
    table_name,
    pg_size_pretty(pg_total_relation_size(table_schema||'.'||table_name)) AS size
FROM information_schema.tables
WHERE table_name IN ('trade_balance', 'top_export_markets')
ORDER BY table_schema, table_name;
"
echo ""
echo "Expected: Only tdaas.trade_balance and tdaas.top_export_markets should be listed"
