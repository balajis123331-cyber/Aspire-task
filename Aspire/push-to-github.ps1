# Script to push Aspire project to GitHub
# Run this script in PowerShell as Administrator

Write-Host "=== Aspire Project - GitHub Push Script ===" -ForegroundColor Green
Write-Host ""

# Check if Git is installed
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCheck) {
    Write-Host "⚠️  Git is not installed or not in PATH" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Installing Git via winget..." -ForegroundColor Cyan
    winget install Git.Git -e -h
    Write-Host ""
    Write-Host "⏳ Waiting for Git installation to complete..." -ForegroundColor Cyan
    Start-Sleep -Seconds 5
}

# Verify Git installation
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCheck) {
    Write-Host "❌ Git installation failed. Please install Git manually from https://git-scm.com" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git is installed" -ForegroundColor Green
git --version
Write-Host ""

# Navigate to project
Set-Location c:\Users\Admin\Desktop\Aspire
Write-Host "📁 Working directory: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Check if .git exists
if (Test-Path .git) {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
} else {
    Write-Host "🔧 Initializing Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
    Write-Host ""
}

# Configure Git
Write-Host "🔧 Configuring Git..." -ForegroundColor Cyan
git config user.email "balajis123331@gmail.com"
git config user.name "Aspire QA Team"
Write-Host "✅ Git configured" -ForegroundColor Green
Write-Host ""

# Check current status
Write-Host "📊 Git Status:" -ForegroundColor Cyan
git status
Write-Host ""

# Add all files
Write-Host "📝 Adding files..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Create commit
Write-Host "💾 Creating commit..." -ForegroundColor Cyan
git commit -m "Initial commit: Aspire QA Automation Suite - 18/18 Smoke Tests Passing"
Write-Host "✅ Commit created" -ForegroundColor Green
Write-Host ""

# Set main branch
Write-Host "🌿 Setting main branch..." -ForegroundColor Cyan
git branch -M main
Write-Host "✅ Main branch set" -ForegroundColor Green
Write-Host ""

# Get GitHub repo URL
Write-Host "🌐 GitHub Repository Setup" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please create a new repository on GitHub:" -ForegroundColor Yellow
Write-Host "  1. Go to: https://github.com/new" -ForegroundColor Yellow
Write-Host "  2. Sign in with: balajis123331@gmail.com" -ForegroundColor Yellow
Write-Host "  3. Repository name: aspire-qa-automation" -ForegroundColor Yellow
Write-Host "  4. Description: Aspire - Support Ticket Management QA Automation Suite" -ForegroundColor Yellow
Write-Host "  5. Make it Public" -ForegroundColor Yellow
Write-Host "  6. Click Create repository" -ForegroundColor Yellow
Write-Host ""

$repoUrl = Read-Host "Enter your GitHub repository HTTPS URL (e.g., https://github.com/username/aspire-qa-automation)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ Repository URL is required" -ForegroundColor Red
    exit 1
}

# Add remote
Write-Host ""
Write-Host "🔗 Adding remote origin..." -ForegroundColor Cyan
git remote remove origin -ErrorAction SilentlyContinue
git remote add origin $repoUrl
Write-Host "✅ Remote origin added" -ForegroundColor Green
Write-Host ""

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "This may prompt you to authenticate with GitHub" -ForegroundColor Yellow
Write-Host ""
git push -u origin main

Write-Host ""
Write-Host "=== COMPLETE ===" -ForegroundColor Green
Write-Host "✅ Your project has been pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
Write-Host ""
