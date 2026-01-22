# Support Ticket Desk - E2E Test Suite

## Overview
This is a comprehensive end-to-end test suite for the Support Ticket Desk application using Cucumber BDD framework with Playwright and Page Object Model (POM) pattern.

## Project Structure

```
├── features/                 # Cucumber feature files
│   ├── 01_authentication.feature
│   ├── 02_dashboard.feature
│   ├── 03_ticket_management.feature
│   ├── 04_ticket_details_comments.feature
│   ├── 05_customer_management.feature
│   └── 06_role_based_access.feature
│
├── pages/                    # Page Object Model classes
│   ├── BasePage.js          # Base page with common methods
│   ├── LoginPage.js
│   ├── DashboardPage.js
│   ├── TicketsPage.js
│   ├── TicketDetailPage.js
│   └── CustomersPage.js
│
├── steps/                    # Cucumber step definitions
│   └── stepDefinitions.js
│
├── testdata/               # Test data and configuration
│   ├── users.json
│   ├── tickets.json
│   ├── customers.json
│   └── config.json
│
├── reports/                # Test execution reports
│   └── screenshots/        # Failure screenshots
│
├── support/                # Support files
│   └── hooks.js           # Before/After hooks
│
├── cucumber.js             # Cucumber configuration
├── package.json            # Project dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone or navigate to the project directory:
```bash
cd c:\Users\Admin\Desktop\Aspire
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers (if not already installed):
```bash
npx playwright install
```

## Configuration

### Environment Variables
Create/update the `.env` file with your environment-specific settings:

```
BASE_URL=https://simonluckenuikvalsoft.github.io/qa-test-sample-application/
HEADLESS=true
SCREENSHOTS_ON_FAILURE=true
```

### Test Data
Test data is organized in JSON files under `testdata/` directory:

- **users.json**: Login credentials and user data
- **tickets.json**: Ticket data for testing
- **customers.json**: Customer data for testing
- **config.json**: Test configuration (timeouts, retries, etc.)

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite

**Smoke Tests (Quick validation)**
```bash
npm run test:smoke
```

**Regression Tests**
```bash
npm run test:regression
```

**Critical Path Tests**
```bash
npm run test:critical
```

### Run Specific Feature File
```bash
npx cucumber-js features/01_authentication.feature
```

### Run Tests with Specific Tags
```bash
npx cucumber-js --tags "@smoke and @critical"
```

### Generate HTML Report
```bash
npm run test:report
```

## Test Scenarios

### 1. Authentication
- Login with valid admin credentials
- Login with valid agent credentials
- Login with invalid credentials
- Form validation for empty fields
- Logout functionality

### 2. Dashboard
- Verify dashboard statistics (Open Tickets, Assigned to Me, Total Tickets, Customers)
- Verify recent tickets table
- Navigation to Tickets and Customers

### 3. Ticket Management
- Create new tickets with required fields
- Edit ticket status, priority, and description
- Delete tickets (admin only)
- Filter tickets by status and priority
- Search tickets
- Pagination support
- Error scenarios (FAIL_CREATE, TKT-001 deletion)

### 4. Ticket Details & Comments
- View ticket details
- Add comments to tickets
- Form validation for empty comments
- Navigate to customer from ticket

### 5. Customer Management
- View customer list
- Filter by SLA level and status
- Search customers
- Create new customers
- Edit customer information
- Delete customers
- Error scenarios (FAIL_CREATE customer, CUST-ERROR deletion)

### 6. Role-Based Access Control
- Admin privileges (view all features, delete buttons visible)
- Agent restrictions (assigned tickets only, no customer management)

## Page Object Model (POM)

All page interactions are encapsulated in Page Object classes:

- **BasePage.js**: Common methods like `fillInput()`, `click()`, `getText()`, etc.
- **LoginPage.js**: Login form interactions
- **DashboardPage.js**: Dashboard statistics and navigation
- **TicketsPage.js**: Ticket list, filtering, and management
- **TicketDetailPage.js**: Ticket details and comments
- **CustomersPage.js**: Customer list and management

## Test Data Management

Test data is managed in JSON files for easy maintenance:

```json
{
  "users": {
    "admin": {
      "username": "admin",
      "password": "admin123",
      "role": "Admin"
    }
  }
}
```

## Features

✅ Comprehensive test coverage
✅ Page Object Model pattern for maintainability
✅ JSON-based test data management
✅ Cucumber BDD framework
✅ Screenshot capture on failures
✅ HTML test reports
✅ Tag-based test execution (@smoke, @regression, @critical)
✅ Role-based access control testing
✅ Error scenario validation
✅ Form validation testing

## Important Notes

### In-Memory Data
All data in the application is stored in-memory only. Reloading the page resets the data to its initial seed state. Therefore:

- Tests are independent and don't rely on data from previous runs
- Each test sets up its own required state
- Use page reload to restore clean state between tests

### Predictable Error Scenarios
The application includes specific error triggers:

- **Ticket Creation**: Include `FAIL_CREATE` in the title
- **Ticket Deletion**: Attempt to delete ticket `TKT-001`
- **Customer Creation**: Include `FAIL_CREATE` in the name
- **Customer Deletion**: Attempt to delete customer `CUST-ERROR`

## Troubleshooting

### Tests not running
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### Browser not found
```bash
# Reinstall Playwright browsers
npx playwright install chromium
```

### Port conflicts
Ensure port 8080 (or configured port) is available

### Screenshots not saving
Ensure `reports/screenshots/` directory exists:
```bash
mkdir -p reports/screenshots
```

## Best Practices

1. **Keep tests independent**: Each test should be able to run in any order
2. **Use meaningful test data**: Use realistic data in test files
3. **Maintain page objects**: Update POM when UI changes
4. **Review reports**: Check HTML reports after test runs
5. **Update selectors**: Keep page object selectors in sync with UI changes

## CI/CD Integration

To integrate with CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Run E2E Tests
  run: npm test

- name: Upload Reports
  uses: actions/upload-artifact@v2
  with:
    name: test-reports
    path: reports/
```

## Contributing

When adding new tests:

1. Create feature file in `features/`
2. Add corresponding step definitions in `steps/stepDefinitions.js`
3. Update page objects if needed
4. Add test data to JSON files
5. Document changes in this README

## Support

For issues or questions, refer to:
- Cucumber Documentation: https://cucumber.io/docs/cucumber/
- Playwright Documentation: https://playwright.dev/docs/intro
- Feature files for test scenarios

## License

ISC

## Contact

For support or questions about the test suite, please contact the QA team.
