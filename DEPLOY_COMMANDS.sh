#!/bin/bash
# Quick Deployment Script for CEPROC TDaaS

echo "🚀 CEPROC Deployment Script"
echo "============================"
echo ""

# Change to project directory
cd /Users/anthony.mano/ceproc-astro-website

# Check git status
echo "📊 Git Status:"
git status
echo ""

# Confirm deployment
read -p "Do you want to proceed with deployment? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Stage all changes
    echo "📦 Staging files..."
    git add .
    
    # Check if .env is staged (should NOT be)
    if git status | grep -q ".env"; then
        echo "⚠️  WARNING: .env file detected in staging!"
        echo "❌ Aborting deployment for security"
        git reset .env
        exit 1
    fi
    
    # Commit
    echo "💾 Committing changes..."
    read -p "Enter commit message: " commit_msg
    git commit -m "$commit_msg"
    
    # Push
    echo "🚢 Pushing to GitHub..."
    git push origin main
    
    echo ""
    echo "✅ Deployment initiated!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to https://vercel.com/dashboard"
    echo "2. Check deployment status"
    echo "3. Verify environment variables are set"
    echo "4. Test production site"
    echo ""
    echo "🔗 Your site: https://ceproc-astro-website.vercel.app"
else
    echo "❌ Deployment cancelled"
fi
