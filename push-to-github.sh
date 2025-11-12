#!/bin/bash
# Push to GitHub - Complete Setup Script
# Replace YOUR_GITHUB_USERNAME with your actual GitHub username

# Configuration
GITHUB_USERNAME="YOUR_GITHUB_USERNAME"
REPO_NAME="emailAutomation"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Git Push to GitHub Setup${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

echo -e "${YELLOW}📝 Configuration:${NC}"
echo "GitHub Username: $GITHUB_USERNAME"
echo "Repository Name: $REPO_NAME"
echo "Repository URL: $REPO_URL"
echo ""

# Confirm before proceeding
read -p "Is this correct? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Cancelled.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}Step 1: Adding remote origin...${NC}"
git remote add origin "$REPO_URL" 2>/dev/null
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Remote added successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Remote might already exist, trying to update...${NC}"
    git remote set-url origin "$REPO_URL"
    echo -e "${GREEN}✅ Remote updated${NC}"
fi

echo ""
echo -e "${BLUE}Step 2: Verifying remote configuration...${NC}"
git remote -v
echo ""

echo -e "${BLUE}Step 3: Setting main as default branch...${NC}"
git branch -M main
echo -e "${GREEN}✅ Branch renamed to main${NC}"
echo ""

echo -e "${BLUE}Step 4: Pushing to GitHub...${NC}"
echo -e "${YELLOW}Note: You may be prompted to authenticate${NC}"
echo ""

git push -u origin main

echo ""
if [ $? -eq 0 ]; then
    echo -e "${GREEN}================================${NC}"
    echo -e "${GREEN}✅ SUCCESS! Code pushed to GitHub${NC}"
    echo -e "${GREEN}================================${NC}"
    echo ""
    echo -e "${BLUE}Repository URL:${NC}"
    echo "https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "1. Visit your repository on GitHub"
    echo "2. Verify all files are present"
    echo "3. Share the repository URL with your team"
    echo ""
else
    echo -e "${RED}❌ Push failed. Check your credentials and try again.${NC}"
    exit 1
fi
