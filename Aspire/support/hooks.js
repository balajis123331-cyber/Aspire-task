/**
 * Hooks for Cucumber test execution
 * Handles setup and teardown of tests
 */

import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Before All Hook - Runs once before all tests
 */
BeforeAll(async function() {
  console.log('\n========================================');
  console.log('Support Ticket Desk - E2E Test Suite');
  console.log('========================================\n');

  // Create reports directory if it doesn't exist
  const reportsDir = path.join(__dirname, '../reports');
  const screenshotsDir = path.join(reportsDir, 'screenshots');

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Test environment initialized');
  console.log(`Reports directory: ${reportsDir}`);
  console.log(`Screenshots directory: ${screenshotsDir}\n`);
});

/**
 * Before Hook - Runs before each test
 */
Before(async function(scenario) {
  console.log(`\n[TEST START] ${scenario.pickle.name}`);
  this.testStartTime = new Date();
});

/**
 * After Hook - Runs after each test
 */
After(async function(scenario) {
  const duration = new Date() - this.testStartTime;
  const status = scenario.result.status;

  // Print test result
  const statusEmoji = status === Status.PASSED ? '✓' : status === Status.FAILED ? '✗' : '~';
  console.log(`[TEST END] ${statusEmoji} ${scenario.pickle.name} (${duration}ms)`);

  // Log failure details
  if (status === Status.FAILED) {
    console.error(`Failure: ${scenario.result.message}`);
    if (this.page) {
      const timestamp = Date.now();
      const fileName = `failure_${scenario.pickle.name.replace(/\s+/g, '_')}_${timestamp}`;
      const screenshotPath = path.join(__dirname, `../reports/screenshots/${fileName}.png`);
      try {
        await this.page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved: ${screenshotPath}`);
      } catch (error) {
        console.error(`Failed to capture screenshot: ${error.message}`);
      }
    }
  }
});

/**
 * After All Hook - Runs once after all tests
 */
AfterAll(async function() {
  console.log('\n========================================');
  console.log('Test execution completed');
  console.log('========================================\n');
});

export default {};
