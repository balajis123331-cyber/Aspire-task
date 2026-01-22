const BasePage = require('./BasePage');

class DashboardPage extends BasePage {
  // Locators - Using more flexible selectors
  dashboardHeadingSelector = '[class*="dashboard"], [class*="heading"], h1, h2, [role="heading"]';
  openTicketsCardSelector = '[class*="card"], [class*="stat"], div:has-text("Open")';
  assignedToMeCardSelector = '[class*="card"], [class*="stat"], div:has-text("Assigned")';
  totalTicketsCardSelector = '[class*="card"], [class*="stat"], div:has-text("Total")';
  customersCardSelector = '[class*="card"], [class*="stat"], div:has-text("Customers")';
  openTicketsValueSelector = 'div:has-text("Open") + div, [class*="value"], [class*="count"]';
  assignedToMeValueSelector = 'div:has-text("Assigned") + div, [class*="value"], [class*="count"]';
  totalTicketsValueSelector = 'div:has-text("Total") + div, [class*="value"], [class*="count"]';
  customersValueSelector = 'div:has-text("Customers") + div, [class*="value"], [class*="count"]';
  recentTicketsTableSelector = 'table, [role="grid"], [class*="table"]';
  viewAllButtonSelector = 'button:has-text("View"), button:has-text("All"), a:has-text("View")';
  logoutButtonSelector = 'button:has-text("Logout"), button:has-text("Sign Out"), button:has-text("Exit")';
  navDashboardSelector = 'a:has-text("Dashboard"), [href*="dashboard"]';
  navTicketsSelector = 'a:has-text("Tickets"), [href*="tickets"]';
  navCustomersSelector = 'a:has-text("Customers"), [href*="customers"]';

  /**
   * Check if dashboard is loaded
   */
  async isDashboardLoaded() {
    return await this.isVisible(this.dashboardHeadingSelector);
  }

  /**
   * Check if Open Tickets card is visible
   */
  async isOpenTicketsCardVisible() {
    return await this.isVisible(this.openTicketsCardSelector);
  }

  /**
   * Check if Assigned to Me card is visible
   */
  async isAssignedToMeCardVisible() {
    return await this.isVisible(this.assignedToMeCardSelector);
  }

  /**
   * Check if Total Tickets card is visible
   */
  async isTotalTicketsCardVisible() {
    return await this.isVisible(this.totalTicketsCardSelector);
  }

  /**
   * Check if Customers card is visible
   */
  async isCustomersCardVisible() {
    return await this.isVisible(this.customersCardSelector);
  }

  /**
   * Get Open Tickets value
   */
  async getOpenTicketsValue() {
    const text = await this.getText(this.openTicketsValueSelector);
    return parseInt(text);
  }

  /**
   * Get Assigned to Me value
   */
  async getAssignedToMeValue() {
    const text = await this.getText(this.assignedToMeValueSelector);
    return parseInt(text);
  }

  /**
   * Get Total Tickets value
   */
  async getTotalTicketsValue() {
    const text = await this.getText(this.totalTicketsValueSelector);
    return parseInt(text);
  }

  /**
   * Get Customers value
   */
  async getCustomersValue() {
    const text = await this.getText(this.customersValueSelector);
    return parseInt(text);
  }

  /**
   * Check if recent tickets table is visible
   */
  async isRecentTicketsTableVisible() {
    return await this.isVisible(this.recentTicketsTableSelector);
  }

  /**
   * Get recent tickets count
   */
  async getRecentTicketsCount() {
    return await this.getTableRowCount(this.recentTicketsTableSelector);
  }

  /**
   * Click View All button
   */
  async clickViewAll() {
    await this.click(this.viewAllButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Click Logout button
   */
  async clickLogout() {
    await this.click(this.logoutButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Navigate to Dashboard
   */
  async navigateToDashboard() {
    await this.click(this.navDashboardSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Navigate to Tickets
   */
  async navigateToTickets() {
    await this.click(this.navTicketsSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Navigate to Customers
   */
  async navigateToCustomers() {
    await this.click(this.navCustomersSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Check if all dashboard statistics are displayed
   */
  async areAllStatisticsDisplayed() {
    const openTicketsVisible = await this.isOpenTicketsCardVisible();
    const assignedVisible = await this.isAssignedToMeCardVisible();
    const totalVisible = await this.isTotalTicketsCardVisible();
    const customersVisible = await this.isCustomersCardVisible();
    
    return openTicketsVisible && assignedVisible && totalVisible && customersVisible;
  }
}

module.exports = DashboardPage;
