const BasePage = require('./BasePage.js');

class TicketsPage extends BasePage {
  // Locators - Using more flexible selectors
  pageHeadingSelector = '[class*="tickets"], [class*="heading"], h1:has-text("Tickets"), h2:has-text("Tickets")';
  addTicketButtonSelector = 'button:has-text("Add"), button:has-text("New"), button:has-text("Create")';
  ticketsTableSelector = 'table, [role="grid"], [class*="table"]';
  statusFilterSelector = 'select[name="status"], select[class*="status"]';
  priorityFilterSelector = 'select[name="priority"], select[class*="priority"]';
  searchInputSelector = 'input[placeholder*="Search"], input[placeholder*="search"], input[type="text"]';
  clearFiltersButtonSelector = 'button:has-text("Clear"), button:has-text("Reset")';
  noTicketsMessageSelector = 'div:has-text("No"), div:has-text("tickets")';
  loadingSpinnerSelector = '.spinner, .loader, [role="status"], [class*="loading"]';
  successAlertSelector = '.alert-success, .success-alert, [class*="success"]';
  errorAlertSelector = '.alert-danger, .alert-error, .error-alert, [class*="error"]';
  deleteButtonSelector = 'button[title*="Delete"], button[title*="delete"], button:has-text("Delete"), [class*="delete"], td > button:last-child, tr button:nth-child(3), [data-action="delete"]';
  editButtonSelector = 'button[title*="Edit"], button:has-text("Edit"), [class*="edit"]';
  viewButtonSelector = 'a[title*="View"], button:has-text("View"), [class*="view"]';

  /**
   * Check if tickets page is loaded
   */
  async isTicketsPageLoaded() {
    return await this.isVisible(this.pageHeadingSelector);
  }

  /**
   * Click Add Ticket button
   */
  async clickAddTicket() {
    await this.click(this.addTicketButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Get tickets table row count
   */
  async getTicketsCount() {
    return await this.getTableRowCount(this.ticketsTableSelector);
  }

  /**
   * Filter by status
   */
  async filterByStatus(status) {
    await this.selectOption(this.statusFilterSelector, status);
  }

  /**
   * Filter by priority
   */
  async filterByPriority(priority) {
    await this.selectOption(this.priorityFilterSelector, priority);
  }

  /**
   * Search tickets
   */
  async searchTickets(searchTerm) {
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
   * Check if no tickets message is visible
   */
  async isNoTicketsMessageVisible() {
    return await this.isVisible(this.noTicketsMessageSelector);
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
   * Click delete button for ticket at index
   */
  async clickDeleteTicket(index = 0) {
    try {
      // Wait for delete button to be visible
      const deleteButtons = await this.page.locator(this.deleteButtonSelector);
      const count = await deleteButtons.count();
      
      if (count > index) {
        // Ensure it's visible before clicking
        await deleteButtons.nth(index).scrollIntoViewIfNeeded({ timeout: 10000 });
        await this.wait(300);
        await deleteButtons.nth(index).click({ timeout: 15000 });
        await this.wait(500);
      } else {
        // If no delete buttons found with main selector, try finding any button in the last cell
        const rows = await this.page.locator('tbody tr, [role="row"]');
        if (await rows.count() > index) {
          const row = rows.nth(index);
          const buttons = await row.locator('button');
          const btnCount = await buttons.count();
          if (btnCount > 0) {
            // Click the last button in the row (usually delete)
            await buttons.last().click({ timeout: 15000 });
            await this.wait(500);
          }
        }
      }
    } catch (error) {
      console.log(`Error clicking delete button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Click edit button for ticket at index
   */
  async clickEditTicket(index = 0) {
    const editButtons = await this.page.locator(this.editButtonSelector);
    if (await editButtons.count() > index) {
      await editButtons.nth(index).click({ timeout: 15000 });
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    }
  }

  /**
   * Click view button for ticket at index
   */
  async clickViewTicket(index = 0) {
    const viewButtons = await this.page.locator(this.viewButtonSelector);
    if (await viewButtons.count() > index) {
      await viewButtons.nth(index).click({ timeout: 15000 });
      await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
    }
  }

  /**
   * Get ticket title at row index
   */
  async getTicketTitle(rowIndex) {
    return await this.getTableCellValue(this.ticketsTableSelector, rowIndex, 0);
  }

  /**
   * Get ticket status at row index
   */
  async getTicketStatus(rowIndex) {
    return await this.getTableCellValue(this.ticketsTableSelector, rowIndex, 1);
  }

  /**
   * Get ticket priority at row index
   */
  async getTicketPriority(rowIndex) {
    return await this.getTableCellValue(this.ticketsTableSelector, rowIndex, 2);
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
}

module.exports = TicketsPage;
