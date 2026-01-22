const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  // Locators - Using more flexible selectors
  usernameInputSelector = 'input[type="text"], input[placeholder*="username"], input[placeholder*="Username"]';
  passwordInputSelector = 'input[type="password"], input[placeholder*="password"], input[placeholder*="Password"]';
  signInButtonSelector = 'button:has-text("Sign"), button:has-text("Login"), button:has-text("Submit")';
  loginFormSelector = '[class*="login"], [class*="form"], form';
  pageHeadingSelector = 'h1, h2, [role="heading"], [class*="title"]';

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.goto('');
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Enter username
   */
  async enterUsername(username) {
    await this.fillInput(this.usernameInputSelector, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password) {
    await this.fillInput(this.passwordInputSelector, password);
  }

  /**
   * Click Sign In button
   */
  async clickSignIn() {
    await this.click(this.signInButtonSelector);
    await this.page.waitForLoadState('networkidle', { timeout: this.defaultTimeout });
  }

  /**
   * Login with credentials
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
    await this.wait(1000); // Wait for login to complete
  }

  /**
   * Check if login form is visible
   */
  async isLoginFormVisible() {
    return await this.isVisible(this.loginFormSelector);
  }

  /**
   * Check if page heading is visible
   */
  async isPageHeadingVisible() {
    return await this.isVisible(this.pageHeadingSelector);
  }

  /**
   * Get username input value
   */
  async getUsernameValue() {
    return await this.page.locator(this.usernameInputSelector).first().inputValue({ timeout: 15000 });
  }

  /**
   * Get password input value
   */
  async getPasswordValue() {
    return await this.page.locator(this.passwordInputSelector).first().inputValue({ timeout: 15000 });
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    await this.clearInput(this.usernameInputSelector);
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.clearInput(this.passwordInputSelector);
  }

  /**
   * Check if Sign In button is enabled
   */
  async isSignInButtonEnabled() {
    return await this.isEnabled(this.signInButtonSelector);
  }
}

module.exports = LoginPage;
