const BasePage = require('./BasePage.js');

class CustomersPage extends BasePage {
  // Locators - Using more flexible selectors
  pageHeadingSelector = '[class*="customer"], [class*="heading"], h1:has-text("Customer"), h2:has-text("Customer")';
  addCustomerButtonSelector = 'button:has-text("Add"), button:has-text("New"), button:has-text("Create")';
  customersTableSelector = 'table, [role="grid"], [class*="table"]';
  slaFilterSelector = 'select[name="sla"], select[class*="sla"]';
  statusFilterSelector = 'select[name="status"], select[class*="status"]';
  searchInputSelector = 'input[placeholder*="Search"], input[placeholder*="search"], input[type="text"]';
  clearFiltersButtonSelector = 'button:has-text("Clear"), button:has-text("Reset")';
  noCustomersMessageSelector = 'div:has-text("No"), div:has-text("customer")';
  loadingSpinnerSelector = '.spinner, .loader, [role="status"], [class*="loading"]';
  successAlertSelector = '.alert-success, .success-alert, [class*="success"]';
  errorAlertSelector = '.alert-danger, .alert-error, .error-alert, [class*="error"]';
  deleteButtonSelector = 'button[title*="Delete"], button:has-text("Delete"), [class*="delete"]';
  editButtonSelector = 'button[title*="Edit"], button:has-text("Edit"), [class*="edit"]';
  viewButtonSelector = 'a[title*="View"], button:has-text("View"), [class*="view"]';

  /**
   * Check if customers page is loaded
   */
  async isCustomersPageLoaded() {
    return await this.isVisible(this.pageHeadingSelector);
  }

  /**
   * Check if Add Customer button is visible
   */
  async isAddCustomerButtonVisible() {
    return await this.isVisible(this.addCustomerButtonSelector);
  }

  /**
   * Click Add Customer button
   */
  async clickAddCustomer() {
    await this.click(this.addCustomerButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Get customers count
   */
  async getCustomersCount() {
    return await this.getTableRowCount(this.customersTableSelector);
  }

  /**
   * Filter by SLA
   */
  async filterBySLA(sla) {
    await this.fillInput(this.slaFilterSelector, sla);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Filter by status
   */
  async filterByStatus(status) {
    await this.fillInput(this.statusFilterSelector, status);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Search customers
   */
  async searchCustomers(searchTerm) {
    const searchInputs = await this.page.locator('input[type="text"]').count();
    if (searchInputs > 0) {
      await this.page.locator('input[type="text"]').last().fill(searchTerm, { timeout: 15000 });
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    }
  }

  /**
   * Clear all filters
   */
  async clearFilters() {
    if (await this.isVisible(this.clearFiltersButtonSelector)) {
      await this.click(this.clearFiltersButtonSelector);
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    }
  }

  /**
   * Check if no customers message is visible
   */
  async isNoCustomersMessageVisible() {
    return await this.isVisible(this.noCustomersMessageSelector);
  }

  /**
   * Wait for loading spinner to disappear
   */
  async waitForLoadingComplete() {
    try {
      await this.page.waitForSelector(this.loadingSpinnerSelector, { state: 'hidden', timeout: this.defaultTimeout });
    } catch {
      // Spinner might not be present
    }
  }

  /**
   * Check if success alert is visible
   */
  async isSuccessAlertVisible() {
    return await this.isVisible(this.successAlertSelector);
  }

  /**
   * Check if error alert is visible
   */
  async isErrorAlertVisible() {
    return await this.isVisible(this.errorAlertSelector);
  }

  /**
   * Get error message
   */
  async getErrorMessage() {
    return await this.getText(this.errorAlertSelector);
  }

  /**
   * Get success message
   */
  async getSuccessMessage() {
    return await this.getText(this.successAlertSelector);
  }

  /**
   * Click delete button for customer at index
   */
  async clickDeleteCustomer(index = 0) {
    const deleteButtons = await this.page.locator(this.deleteButtonSelector);
    if (await deleteButtons.count() > index) {
      await deleteButtons.nth(index).click({ timeout: 15000 });
      await this.wait(500);
    }
  }

  /**
   * Click edit button for customer at index
   */
  async clickEditCustomer(index = 0) {
    const editButtons = await this.page.locator(this.editButtonSelector);
    if (await editButtons.count() > index) {
      await editButtons.nth(index).click({ timeout: 15000 });
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    }
  }

  /**
   * Click view button for customer at index
   */
  async clickViewCustomer(index = 0) {
    const viewButtons = await this.page.locator(this.viewButtonSelector);
    if (await viewButtons.count() > index) {
      await viewButtons.nth(index).click({ timeout: 15000 });
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    }
  }

  /**
   * Get customer name at row index
   */
  async getCustomerName(rowIndex) {
    return await this.getTableCellValue(this.customersTableSelector, rowIndex, 0);
  }

  /**
   * Get customer email at row index
   */
  async getCustomerEmail(rowIndex) {
    return await this.getTableCellValue(this.customersTableSelector, rowIndex, 1);
  }

  /**
   * Get customer SLA at row index
   */
  async getCustomerSLA(rowIndex) {
    return await this.getTableCellValue(this.customersTableSelector, rowIndex, 2);
  }

  /**
   * Accept delete confirmation
   */
  async acceptDeleteConfirmation() {
    this.page.once('dialog', dialog => {
      dialog.accept();
    });
    await this.wait(1000);
  }

  /**
   * Check if edit button is visible for any customer
   */
  async isEditButtonVisible() {
    return await this.isVisible(this.editButtonSelector);
  }

  /**
   * Check if delete button is visible for any customer
   */
  async isDeleteButtonVisible() {
    return await this.isVisible(this.deleteButtonSelector);
  }
}

module.exports = CustomersPage;
