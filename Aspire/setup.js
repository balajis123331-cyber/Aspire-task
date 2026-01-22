#!/usr/bin/env node

/**
 * Installation and Setup Script for Support Ticket Desk Test Suite
 * Run this script to set up the test environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = __dirname;

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║  Support Ticket Desk - E2E Test Suite Setup           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

// Step 1: Create necessary directories
console.log('📁 Creating directories...');
const dirsToCreate = [
  'reports/screenshots',
  'features',
  'pages',
  'steps',
  'support',
  'testdata'
];

dirsToCreate.forEach(dir => {
  const dirPath = path.join(projectRoot, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`   ✓ Created ${dir}`);
  } else {
    console.log(`   ✓ ${dir} already exists`);
  }
});

// Step 2: Check if package.json exists
console.log('\n📦 Checking package.json...');
const packageJsonPath = path.join(projectRoot, 'package.json');
if (fs.existsSync(packageJsonPath)) {
  console.log('   ✓ package.json found');
} else {
  console.log('   ✗ package.json not found');
  process.exit(1);
}

// Step 3: Install dependencies
console.log('\n📥 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit', cwd: projectRoot });
  console.log('   ✓ Dependencies installed successfully');
} catch (error) {
  console.error('   ✗ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Step 4: Install Playwright browsers
console.log('\n🌐 Installing Playwright browsers...');
try {
  execSync('npx playwright install chromium', { stdio: 'inherit', cwd: projectRoot });
  console.log('   ✓ Playwright browsers installed');
} catch (error) {
  console.error('   ✗ Failed to install Playwright browsers:', error.message);
}

// Step 5: Verify test data files
console.log('\n✅ Verifying test data files...');
const testDataFiles = [
  'testdata/users.json',
  'testdata/tickets.json',
  'testdata/customers.json',
  'testdata/config.json'
];

testDataFiles.forEach(file => {
  if (fs.existsSync(path.join(projectRoot, file))) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ⚠ ${file} not found`);
  }
});

// Step 6: Display next steps
console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║  Setup Complete! Next Steps:                           ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log('Run tests using:\n');
console.log('  npm test                    # Run all tests');
console.log('  npm run test:smoke          # Run smoke tests only');
console.log('  npm run test:regression     # Run regression tests only');
console.log('  npm run test:critical       # Run critical path tests only');
console.log('  npm run test:report         # Generate HTML report\n');

console.log('For more information, see README.md\n');

console.log('═══════════════════════════════════════════════════════\n');
