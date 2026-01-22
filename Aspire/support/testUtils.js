/**
 * Test utilities for common functions
 */

const fs = require('fs');
const path = require('path');

class TestUtils {
  /**
   * Load test data from JSON file
   */
  static loadTestData(fileName) {
    const filePath = path.join(__dirname, `../testdata/${fileName}`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Test data file not found: ${filePath}`);
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  /**
   * Generate a unique string for test data
   */
  static generateUnique(prefix = 'test') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Wait for a specific condition
   */
  static async waitForCondition(condition, timeout = 5000, interval = 100) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    throw new Error(`Timeout waiting for condition after ${timeout}ms`);
  }

  /**
   * Format test result
   */
  static formatResult(passed, failed, skipped) {
    const total = passed + failed + skipped;
    return {
      total,
      passed,
      failed,
      skipped,
      passRate: ((passed / total) * 100).toFixed(2) + '%'
    };
  }

  /**
   * Get current timestamp
   */
  static getTimestamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Parse data table into object
   */
  static parseDataTable(dataTable) {
    return dataTable.rowsHash();
  }

  /**
   * Create a delay
   */
  static delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Retry async function with exponential backoff
   */
  static async retry(fn, maxAttempts = 3, initialDelay = 100) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        if (attempt < maxAttempts) {
          const delay = initialDelay * Math.pow(2, attempt - 1);
          await this.delay(delay);
        }
      }
    }
    throw lastError;
  }
}

module.exports = TestUtils;
