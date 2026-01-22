## 🎯 Complete Test Suite Execution Guide

### Project Overview

This is a comprehensive **Cucumber BDD** test suite for the **Support Ticket Desk** application using:
- **Framework**: Cucumber (Gherkin)
- **Automation Tool**: Playwright
- **Design Pattern**: Page Object Model (POM)
- **Test Data**: JSON-based

---

## 📦 Installation & Setup

### Step 1: Navigate to Project Directory
```bash
cd c:\Users\Admin\Desktop\Aspire
```

### Step 2: Install Dependencies
```bash
npm install
```

This installs:
- `@cucumber/cucumber` - BDD framework
- `@playwright/test` - Browser automation
- Other required dependencies

### Step 3: Install Playwright Browsers
```bash
npx playwright install chromium
```

### Step 4: Verify Setup (Optional)
```bash
node setup.js
```

This script:
- Creates necessary directories
- Validates installation
- Installs Playwright browsers
- Shows next steps

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

Runs entire test suite and generates HTML report.

### Run Smoke Tests (5-10 minutes)
```bash
npm run test:smoke
```

Quick validation tests - ideal for CI/CD pipelines.

**Covered Scenarios:**
- Login with valid credentials
- Dashboard display
- Basic CRUD operations
- Role-based access

### Run Regression Tests
```bash
npm run test:regression
```

Comprehensive tests covering all features.

### Run Critical Path Tests
```bash
npm run test:critical
```

Most important business scenarios.

### Generate HTML Report
```bash
npm run test:report
```

Creates detailed HTML report in `reports/cucumber-report.html`

---

## 📋 Test Scenarios Included

### 1. Authentication (7 tests)
- ✅ Login with admin credentials
- ✅ Login with agent credentials
- ✅ Login with invalid credentials
- ✅ Empty field validation
- ✅ Logout functionality
- ✅ Form element visibility
- ✅ Multiple invalid combinations

### 2. Dashboard (6 tests)
- ✅ All statistics cards display
- ✅ Recent tickets table
- ✅ View All navigation
- ✅ Menu navigation (Tickets, Customers)
- ✅ Statistics values validation
- ✅ Dashboard loading

### 3. Ticket Management (11 tests)
- ✅ Create new tickets
- ✅ View ticket details
- ✅ Edit ticket (status, priority, description)
- ✅ Delete tickets
- ✅ Filter by status and priority
- ✅ Search functionality
- ✅ Pagination
- ✅ Clear filters
- ✅ Error scenarios (FAIL_CREATE)
- ✅ Form validation
- ✅ No tickets found message

### 4. Ticket Comments (8 tests)
- ✅ View ticket details page
- ✅ Add comments
- ✅ Comment validation
- ✅ Multiple comments
- ✅ Navigate to customer from ticket
- ✅ Edit ticket and save
- ✅ Cancel edit
- ✅ Back navigation

### 5. Customer Management (13 tests)
- ✅ View customer list
- ✅ Filter by SLA and status
- ✅ Search customers
- ✅ Create new customers
- ✅ Edit customers
- ✅ Delete customers
- ✅ Error scenarios
- ✅ Form validation
- ✅ Pagination
- ✅ Clear filters
- ✅ View customer details
- ✅ No customers message
- ✅ Multiple SLA/status combinations

### 6. Role-Based Access Control (11 tests)
- ✅ Admin features visibility
- ✅ Admin can delete/edit
- ✅ Agent limitations
- ✅ Agent assignment filtering
- ✅ Feature availability by role
- ✅ Unauthorized access handling
- ✅ Button visibility control
- ✅ Customer management access
- ✅ Ticket management access

### 7. Edge Cases (18 tests)
- ✅ Invalid IDs handling
- ✅ No data scenarios
- ✅ Loading spinners
- ✅ Alert messages
- ✅ Confirmation dialogs
- ✅ Column sorting
- ✅ Pagination behavior
- ✅ Special characters
- ✅ Long text handling
- ✅ Rapid changes
- ✅ Browser navigation
- ✅ Page refresh
- ✅ Multi-tab consistency

**Total: 74+ test scenarios across 7 feature files**

---

## 📁 Project Structure

```
Aspire/
├── features/                    # BDD Scenario Files
│   ├── 01_authentication.feature
│   ├── 02_dashboard.feature
│   ├── 03_ticket_management.feature
│   ├── 04_ticket_details_comments.feature
│   ├── 05_customer_management.feature
│   ├── 06_role_based_access.feature
│   └── 07_edge_cases.feature
│
├── pages/                       # Page Object Models
│   ├── BasePage.js             # Base class with common methods
│   ├── LoginPage.js            # Login page interactions
│   ├── DashboardPage.js        # Dashboard page interactions
│   ├── TicketsPage.js          # Tickets list page
│   ├── TicketDetailPage.js     # Individual ticket details
│   └── CustomersPage.js        # Customers list page
│
├── steps/                       # Step Definitions
│   └── stepDefinitions.js      # All Gherkin steps implementation
│
├── testdata/                    # Test Data
│   ├── users.json              # Login credentials
│   ├── tickets.json            # Ticket test data
│   ├── customers.json          # Customer test data
│   └── config.json             # Configuration settings
│
├── support/                     # Support Files
│   ├── hooks.js                # Before/After hooks
│   └── testUtils.js            # Utility functions
│
├── reports/                     # Test Reports
│   ├── screenshots/            # Failure screenshots
│   ├── cucumber-report.html    # HTML test report
│   └── cucumber-report.json    # JSON report data
│
├── tests/                       # Legacy Playwright tests
│   ├── example.spec.js
│   └── login.spec.js
│
├── cucumber.js                 # Cucumber configuration
├── package.json                # Project dependencies
├── .env                        # Environment variables
├── README.md                   # Full documentation
├── QUICKSTART.md              # Quick start guide
├── TESTING_GUIDE.md           # This file
└── setup.js                   # Setup script
```

---

## 🔑 Test Credentials

### Admin Account (Full Access)
- **Username**: `admin`
- **Password**: `admin123`
- **Can**: View all tickets, manage customers, delete items

### Agent Account (Limited Access)
- **Username**: `agent`
- **Password**: `agent123`
- **Can**: View assigned tickets, add comments

---

## 🎨 Page Object Model Pattern

Each page has dedicated class with methods:

```javascript
// Example: LoginPage.js
class LoginPage extends BasePage {
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}

// Usage in steps:
When('I login with {string} and {string}', async function(user, pass) {
  await world.loginPage.login(user, pass);
});
```

**Benefits:**
- ✅ Easy to maintain (change selectors in one place)
- ✅ Reusable methods across tests
- ✅ Clear separation of concerns
- ✅ Reduced code duplication

---

## 📊 Test Data Management

### Users (testdata/users.json)
```json
{
  "users": {
    "admin": {
      "username": "admin",
      "password": "admin123"
    }
  }
}
```

### Tickets (testdata/tickets.json)
```json
{
  "tickets": {
    "valid": [{
      "title": "Email configuration issue",
      "description": "...",
      "priority": "High"
    }]
  }
}
```

### Customers (testdata/customers.json)
```json
{
  "customers": {
    "valid": [{
      "name": "John Smith",
      "email": "john@example.com",
      "slaLevel": "Gold"
    }]
  }
}
```

**Advantages:**
- Easy to update test data without changing code
- Centralized data management
- Support for multiple data sets
- Easy to add new test scenarios

---

## 🏷️ Test Tags

Tests are organized by tags for selective execution:

### @smoke
Quick validation tests (most critical)
```bash
npm run test:smoke
```

### @regression
Comprehensive feature testing
```bash
npm run test:regression
```

### @critical
High-priority business scenarios
```bash
npm run test:critical
```

### Custom Tag Combinations
```bash
npx cucumber-js --tags "@smoke and @critical"
npx cucumber-js --tags "not @skip"
```

---

## 📈 Test Reports

After test execution, reports are generated:

### HTML Report
- **Location**: `reports/cucumber-report.html`
- **Contains**: Pass/fail status, execution time, screenshots
- Open in browser to view detailed results

### JSON Report
- **Location**: `reports/cucumber-report.json`
- **Use**: For CI/CD integration, parsing results

### Screenshots
- **Location**: `reports/screenshots/`
- **Captured**: On test failures (if enabled)
- **Naming**: Descriptive with timestamp

---

## 🔧 Configuration

Edit `testdata/config.json`:

```json
{
  "testUrls": {
    "baseUrl": "https://application-url/"
  },
  "timeouts": {
    "short": 1000,
    "medium": 3000,
    "long": 5000
  },
  "screenshotsOnFailure": true,
  "headless": true
}
```

Edit `.env` for environment-specific settings:
```
BASE_URL=https://...
HEADLESS=true
SCREENSHOTS_ON_FAILURE=true
```

---

## 🎯 Example Test Execution

### Scenario: Complete Login and Ticket Creation Test

```gherkin
Feature: Authentication
  @smoke @critical
  Scenario: Admin can login and view tickets
    Given I navigate to the application
    When I login with "admin" username and "admin123" password
    Then I should see the dashboard
    When I navigate to Tickets page
    Then the tickets page should be loaded
```

### Execution:
```bash
npm test
```

### Output:
```
✓ 1 scenario (1 passed)
✓ 5 steps (5 passed)
Completed in 2.345s
```

---

## 🐛 Debugging Tests

### Run Single Feature
```bash
npx cucumber-js features/01_authentication.feature
```

### Run with Detailed Output
```bash
npx cucumber-js --format json:reports/debug.json
```

### Take Screenshots
- Automatically captured on failures
- Manually via: `await world.page.screenshot({ path: 'path.png' });`

### View Page Source
```javascript
const html = await world.page.content();
console.log(html);
```

### Pause Execution
```javascript
await world.page.pause(); // Opens browser inspector
```

---

## ⚠️ Important Notes

### In-Memory Data
- **All data is stored in-memory** - page reload resets to seed state
- Each test must be independent
- Don't rely on data from previous tests
- Use data reload to reset state if needed

### Error Scenarios
- **FAIL_CREATE**: Include in ticket/customer title to trigger error
- **TKT-001**: Attempting to delete triggers error
- **CUST-ERROR**: Attempting to delete customer triggers error

### Best Practices
1. ✅ Keep tests independent
2. ✅ Use meaningful test data
3. ✅ Update page objects when UI changes
4. ✅ Review reports after execution
5. ✅ Run smoke tests frequently
6. ✅ Document new test scenarios

---

## 🔗 Adding New Tests

### Step 1: Create Feature File
```gherkin
# features/new_feature.feature
Feature: New Feature Testing
  @smoke
  Scenario: Test something new
    Given I navigate to the application
    When I perform an action
    Then I should see the result
```

### Step 2: Add Step Definitions
```javascript
// steps/stepDefinitions.js
When('I perform an action', async function() {
  await world.page.click('selector');
});

Then('I should see the result', async function() {
  const isVisible = await world.page.isVisible('selector');
  expect(isVisible).toBe(true);
});
```

### Step 3: Update Test Data (if needed)
```json
// testdata/newdata.json
{
  "newData": "value"
}
```

---

## 💡 Tips & Tricks

### Run Tests in Watch Mode
```javascript
// Manual implementation - monitor file changes
npm test -- --watch
```

### Debug Step Definitions
```javascript
console.log('Current URL:', await world.page.url());
console.log('Page title:', await world.page.title());
```

### Get All Text Content
```javascript
const allText = await world.page.textContent('body');
console.log(allText);
```

### Check Network Activity
```javascript
world.page.on('response', response => {
  console.log(`${response.status()} ${response.url()}`);
});
```

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Browser not found | Run `npx playwright install chromium` |
| Port in use | Kill process or change port in config |
| Timeout errors | Increase timeout in `testdata/config.json` |
| Selectors not found | Update page object selectors, inspect UI |
| Tests not running | Clear `node_modules`, reinstall dependencies |
| Reports not generating | Check `reports/` directory permissions |

---

## 🎓 Learning Resources

- **Cucumber/Gherkin**: https://cucumber.io/docs/cucumber/
- **Playwright**: https://playwright.dev/docs/intro
- **BDD**: https://cucumber.io/docs/bdd/
- **Page Object Model**: https://playwright.dev/docs/pom

---

## ✅ Verification Checklist

Before running tests in production:

- [ ] All dependencies installed (`npm install`)
- [ ] Playwright browsers installed
- [ ] `.env` file configured correctly
- [ ] Test data files present in `testdata/`
- [ ] Application URL is accessible
- [ ] Network connectivity verified
- [ ] Credentials are valid
- [ ] Reports directory created
- [ ] No port conflicts

---

## 📬 Support & Contact

For issues or questions:
1. Check README.md for detailed documentation
2. Review QUICKSTART.md for quick setup
3. Check feature files for scenario examples
4. Review step definitions for available steps
5. Consult Playwright/Cucumber documentation

---

**Last Updated**: January 22, 2026
**Framework Version**: Cucumber v9.5.1, Playwright v1.57.0
**Status**: Ready for Production ✅
