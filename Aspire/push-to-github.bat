@echo off
REM Script to initialize Git and push to GitHub

cd /d c:\Users\Admin\Desktop\Aspire

echo === Aspire Project - GitHub Push ===
echo.

REM Check if git is already configured
git status >nul 2>&1
if errorlevel 1 (
    echo Initializing Git repository...
    git init
    echo Configuring Git...
    git config user.email "balajis123331@gmail.com"
    git config user.name "Aspire QA Team"
) else (
    echo Git repository already exists
)

echo.
echo Current Git Status:
git status
echo.

echo Adding all files...
git add .

echo Creating commit...
git commit -m "Initial commit: Aspire QA Automation Suite - 18/18 Smoke Tests Passing"

echo Setting main branch...
git branch -M main

echo.
echo IMPORTANT: Create repository on GitHub first
echo 1. Go to https://github.com/new
echo 2. Repository name: aspire-qa-automation
echo 3. Choose Public
echo 4. Click Create repository
echo.

set /p repoUrl="Enter your GitHub repository URL: "

echo Adding remote...
git remote remove origin 2>nul
git remote add origin %repoUrl%

echo.
echo Pushing to GitHub...
echo You may be prompted to authenticate...
echo.
git push -u origin main

echo.
echo COMPLETE! Your code is now on GitHub at:
echo %repoUrl%
pause
