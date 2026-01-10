#!/bin/bash
# Quick Setup Script for Trade Balance API
# Run this from your project root: bash setup-trade-balance-api.sh

set -e  # Exit on error

echo "🚀 Setting up Trade Balance API..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}Step 1: Installing @neondatabase/serverless...${NC}"
npm install @neondatabase/serverless
echo -e "${GREEN}✅ Package installed${NC}"
echo ""

# Step 2: Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo -e "${BLUE}Step 2: Creating .env file...${NC}"
    
    # Prompt for DATABASE_URL
    echo -e "${YELLOW}Please enter your Neon DATABASE_URL:${NC}"
    echo -e "${YELLOW}(Format: postgres://user:password@host:5432/database?sslmode=require)${NC}"
    read -p "DATABASE_URL: " db_url
    
    echo "DATABASE_URL=\"$db_url\"" > .env
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists, skipping...${NC}"
fi
echo ""

# Step 3: Update .gitignore
echo -e "${BLUE}Step 3: Updating .gitignore...${NC}"
if ! grep -q "^\.env$" .gitignore 2>/dev/null; then
    echo ".env" >> .gitignore
    echo ".env.local" >> .gitignore
    echo -e "${GREEN}✅ .gitignore updated${NC}"
else
    echo -e "${YELLOW}⚠️  .env already in .gitignore${NC}"
fi
echo ""

# Step 4: Create API directory
echo -e "${BLUE}Step 4: Creating API directory structure...${NC}"
mkdir -p src/pages/api/tdaas
echo -e "${GREEN}✅ Directory created: src/pages/api/tdaas${NC}"
echo ""

# Step 5: Copy API file
echo -e "${BLUE}Step 5: Copying API endpoint...${NC}"
if [ -f trade-balance-api.ts ]; then
    cp trade-balance-api.ts src/pages/api/tdaas/trade-balance.ts
    echo -e "${GREEN}✅ API endpoint copied to src/pages/api/tdaas/trade-balance.ts${NC}"
else
    echo -e "${YELLOW}⚠️  trade-balance-api.ts not found in current directory${NC}"
    echo -e "${YELLOW}Please manually copy the file to: src/pages/api/tdaas/trade-balance.ts${NC}"
fi
echo ""

# Step 6: Verify setup
echo -e "${BLUE}Step 6: Verifying setup...${NC}"

if [ -f src/pages/api/tdaas/trade-balance.ts ]; then
    echo -e "${GREEN}✅ API file exists${NC}"
else
    echo -e "${YELLOW}⚠️  API file missing${NC}"
fi

if [ -f .env ]; then
    echo -e "${GREEN}✅ .env file exists${NC}"
else
    echo -e "${YELLOW}⚠️  .env file missing${NC}"
fi

if [ -d node_modules/@neondatabase ]; then
    echo -e "${GREEN}✅ @neondatabase/serverless installed${NC}"
else
    echo -e "${YELLOW}⚠️  @neondatabase/serverless not found${NC}"
fi
echo ""

# Final instructions
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo "1. Start your dev server:"
echo "   npm run dev"
echo ""
echo "2. Test the API:"
echo "   curl http://localhost:4321/api/tdaas/trade-balance"
echo ""
echo "3. Or open in browser:"
echo "   http://localhost:4321/api/tdaas/trade-balance?currency=CAD&limit=12"
echo ""
echo -e "${BLUE}For production deployment:${NC}"
echo "1. Add DATABASE_URL to Vercel environment variables"
echo "2. Deploy: vercel --prod"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
