/**
 * BasePage - Base class for all page objects
 * Contains common methods and utilities used across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = 'https://simonluckenuikvalsoft.github.io/qa-test-sample-application/';
    this.defaultTimeout = 30000;
  }

  /**
   * Navigate to a specific URL
   */
  async goto(path = '') {
    await this.page.goto(`${this.baseUrl}${path}`, { 
      waitUntil: 'networkidle', 
      timeout: this.defaultTimeout 
    });
  }

  /**
   * Fill input field
   */
  async fillInput(selector, value) {
    await this.page.locator(selector).first().fill(value, { timeout: 15000 });
  }

  /**
   * Click an element
   */
  async click(selector) {
    await this.page.locator(selector).first().click({ timeout: 15000 });
  }

  /**
   * Get text from element
   */
  async getText(selector) {
    return await this.page.locator(selector).first().textContent({ timeout: 15000 });
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector) {
    try {
      return await this.page.locator(selector).first().isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector, timeout = 30000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Get all texts from elements
   */
  async getAllTexts(selector) {
    return await this.page.locator(selector).allTextContents();
  }

  /**
   * Wait for navigation after action
   */
  async waitForNavigation(action) {
    await Promise.all([
      this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout }),
      action()
    ]);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName) {
    await this.page.screenshot({ path: `reports/screenshots/${fileName}.png` });
  }

  /**
   * Get page title
   */
  async getPageTitle() {
    return await this.page.title();
  }

  /**
   * Wait for timeout
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Reload page
   */
  async reloadPage() {
    await this.page.reload({ waitUntil: 'networkidle', timeout: this.defaultTimeout });
  }

  /**
   * Check if alert/modal is present and accept it
   */
  async handleConfirmDialog() {
    this.page.once('dialog', dialog => {
      dialog.accept();
    });
  }

  /**
   * Get alert message
   */
  async getAlertMessage() {
    let alertMessage = '';
    this.page.once('dialog', dialog => {
      alertMessage = dialog.message();
      dialog.accept();
    });
    await this.page.waitForTimeout(1000);
    return alertMessage;
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector) {
    return await this.page.locator(selector).first().isEnabled({ timeout: 15000 });
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector, attribute) {
    return await this.page.locator(selector).first().getAttribute(attribute, { timeout: 15000 });
  }

  /**
   * Clear input field
   */
  async clearInput(selector) {
    await this.page.locator(selector).first().fill('', { timeout: 15000 });
  }

  /**
   * Get all rows from table
   */
  async getTableRowCount(tableSelector) {
    const rows = await this.page.locator(`${tableSelector} tbody tr`).count();
    return rows;
  }

  /**
   * Get cell value from table
   */
  async getTableCellValue(tableSelector, rowIndex, cellIndex) {
    const cell = await this.page.locator(
      `${tableSelector} tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
    ).textContent({ timeout: 15000 });
    return cell;
  }

  /**
   * Select option from select element (with retry logic)
   */
  async selectOption(selector, value, maxRetries = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const selectElement = this.page.locator(selector).first();
        await selectElement.waitFor({ state: 'visible', timeout: 10000 });
        await selectElement.selectOption(value, { timeout: 15000 });
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        return;
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          await this.page.waitForTimeout(500 * attempt);
        }
      }
    }
    throw lastError;
  }
}

module.exports = BasePage;
