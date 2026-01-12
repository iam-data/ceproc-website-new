#!/bin/bash
# Diagnostic script to check Astro + React setup

echo "🔍 Checking Astro + React Integration"
echo "======================================"
echo ""

cd /Users/anthony.mano/ceproc-astro-website

echo "1️⃣ Checking package.json for React dependencies..."
echo ""
if grep -q "@astrojs/react" package.json; then
    echo "✅ @astrojs/react found in package.json"
    grep "@astrojs/react" package.json
else
    echo "❌ @astrojs/react NOT found in package.json"
fi
echo ""

if grep -q "\"react\"" package.json; then
    echo "✅ react found in package.json"
    grep "\"react\"" package.json
else
    echo "❌ react NOT found in package.json"
fi
echo ""

echo "2️⃣ Checking astro.config.mjs for React integration..."
echo ""
if [ -f astro.config.mjs ]; then
    if grep -q "@astrojs/react" astro.config.mjs; then
        echo "✅ React integration configured in astro.config.mjs"
        cat astro.config.mjs
    else
        echo "❌ React integration NOT configured in astro.config.mjs"
        cat astro.config.mjs
    fi
else
    echo "❌ astro.config.mjs not found!"
fi
echo ""

echo "3️⃣ Checking node_modules..."
if [ -d node_modules/@astrojs/react ]; then
    echo "✅ @astrojs/react installed in node_modules"
else
    echo "❌ @astrojs/react NOT installed in node_modules"
fi
echo ""

echo "4️⃣ Checking React component files..."
echo ""
if [ -f src/components/tdaas/TradeBalanceModal.tsx ]; then
    echo "✅ TradeBalanceModal.tsx exists"
else
    echo "❌ TradeBalanceModal.tsx NOT found"
fi

if [ -f src/components/tdaas/TopMarketsModal.tsx ]; then
    echo "✅ TopMarketsModal.tsx exists"
else
    echo "❌ TopMarketsModal.tsx NOT found"
fi
echo ""

echo "📋 DIAGNOSIS COMPLETE"
echo ""
echo "Next steps:"
echo "1. If @astrojs/react is missing, run: npx astro add react"
echo "2. If components are missing, copy them from Downloads"
echo "3. Restart dev server after fixing"
