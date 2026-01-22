const BasePage = require('./BasePage.js');

class TicketDetailPage extends BasePage {
  // Locators - Using more flexible selectors
  pageHeadingSelector = '[class*="detail"], [class*="heading"], h1, h2, [role="heading"]';
  ticketIdSelector = '[class*="id"], [class*="ticket"], div:has-text("ID"), div:has-text("Ticket")';
  ticketTitleSelector = 'input[name="title"], input[placeholder*="title"], input[placeholder*="Title"]';
  ticketDescriptionSelector = 'textarea[name="description"], textarea[placeholder*="description"], textarea[placeholder*="Description"]';
  ticketStatusSelector = 'select[name="status"], select[class*="status"]';
  ticketPrioritySelector = 'select[name="priority"], select[class*="priority"]';
  ticketCustomerSelector = 'select[name="customer"], select[class*="customer"]';
  saveButtonSelector = 'button:has-text("Save"), button:has-text("Update")';
  cancelButtonSelector = 'button:has-text("Cancel")';
  backButtonSelector = 'button:has-text("Back"), button:has-text("← Back"), a:has-text("Back")';
  commentsTableSelector = 'table, [class*="comment"], [role="grid"]';
  commentInputSelector = 'textarea[placeholder*="comment"], textarea[placeholder*="Comment"], textarea[name="comment"]';
  addCommentButtonSelector = 'button:has-text("Add"), button:has-text("Comment"), button:has-text("Post")';
  customerLinkSelector = 'a[href*="customer"]';
  successAlertSelector = '.alert-success, .success-alert, [class*="success"]';
  errorAlertSelector = '.alert-danger, .alert-error, .error-alert, [class*="error"]';

  /**
   * Check if ticket detail page is loaded
   */
  async isTicketDetailPageLoaded() {
    return await this.isVisible(this.pageHeadingSelector);
  }

  /**
   * Get ticket ID
   */
  async getTicketId() {
    const text = await this.getText(this.ticketIdSelector);
    return text ? text.split(':')[1]?.trim() : '';
  }

  /**
   * Get ticket title
   */
  async getTicketTitle() {
    return await this.page.locator(this.ticketTitleSelector).first().inputValue({ timeout: 15000 });
  }

  /**
   * Get ticket description
   */
  async getTicketDescription() {
    return await this.page.locator(this.ticketDescriptionSelector).first().inputValue({ timeout: 15000 });
  }

  /**
   * Get ticket status
   */
  async getTicketStatus() {
    return await this.page.locator(this.ticketStatusSelector).first().inputValue({ timeout: 15000 });
  }

  /**
   * Get ticket priority
   */
  async getTicketPriority() {
    return await this.page.locator(this.ticketPrioritySelector).first().inputValue({ timeout: 15000 });
  }

  /**
   * Update ticket title
   */
  async updateTicketTitle(title) {
    await this.fillInput(this.ticketTitleSelector, title);
  }

  /**
   * Update ticket description
   */
  async updateTicketDescription(description) {
    await this.fillInput(this.ticketDescriptionSelector, description);
  }

  /**
   * Update ticket status
   */
  async updateTicketStatus(status) {
    await this.fillInput(this.ticketStatusSelector, status);
  }

  /**
   * Update ticket priority
   */
  async updateTicketPriority(priority) {
    await this.fillInput(this.ticketPrioritySelector, priority);
  }

  /**
   * Save ticket
   */
  async saveTicket() {
    await this.click(this.saveButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Cancel editing
   */
  async cancelEdit() {
    await this.click(this.cancelButtonSelector);
    await this.wait(1000);
  }

  /**
   * Go back
   */
  async goBack() {
    await this.click(this.backButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Check if comments section is visible
   */
  async isCommentsTableVisible() {
    return await this.isVisible(this.commentsTableSelector);
  }

  /**
   * Get comments count
   */
  async getCommentsCount() {
    return await this.getTableRowCount(this.commentsTableSelector);
  }

  /**
   * Add comment
   */
  async addComment(commentText) {
    await this.fillInput(this.commentInputSelector, commentText);
    await this.click(this.addCommentButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
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
   * Click on customer link
   */
  async clickCustomerLink() {
    await this.click(this.customerLinkSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }
}

module.exports = TicketDetailPage;
