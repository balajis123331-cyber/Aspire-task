# Quick Start Guide - Support Ticket Desk E2E Test Suite

## 🚀 Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install chromium
```

Or use the automated setup script:
```bash
node setup.js
```

### 3. Run Tests
```bash
npm test
```

## 📋 Test Execution Options

### Run All Tests
```bash
npm test
```

### Run Smoke Tests (Fast validation)
```bash
npm run test:smoke
```

### Run Regression Tests
```bash
npm run test:regression
```

### Run Critical Path Tests
```bash
npm run test:critical
```

### Generate HTML Report
```bash
npm run test:report
```

Reports are generated in the `reports/` directory.

## 🔍 Running Specific Tests

### Run specific feature file:
```bash
npx cucumber-js features/01_authentication.feature
```

### Run tests with specific tags:
```bash
npx cucumber-js --tags "@smoke and @critical"
```

### Run tests by feature name:
```bash
npx cucumber-js --name "Login with valid admin credentials"
```

## 📁 Project Structure

```
├── features/          - Cucumber feature files (test scenarios)
├── pages/            - Page Object Model classes (UI interactions)
├── steps/            - Cucumber step definitions (test implementation)
├── testdata/         - Test data (users, tickets, customers, config)
├── support/          - Support utilities and hooks
├── reports/          - Test reports and screenshots
├── cucumber.js       - Cucumber configuration
└── README.md         - Full documentation
```

## 🔐 Login Credentials

### Admin Account
- **Username:** admin
- **Password:** admin123

### Agent Account
- **Username:** agent
- **Password:** agent123

## 🎯 Test Coverage

The test suite covers:

✅ Authentication (login, logout, validation)
✅ Dashboard (statistics, navigation)
✅ Ticket Management (CRUD, filtering, search)
✅ Ticket Comments (add, view, validate)
✅ Customer Management (CRUD, filtering, search)
✅ Role-Based Access Control (admin vs agent)
✅ Error Scenarios (validation, error handling)
✅ Form Validation (required fields, format)

## 📊 View Test Reports

After running tests, open the HTML report:

```bash
# Windows
start reports/cucumber-report.html

# macOS
open reports/cucumber-report.html

# Linux
xdg-open reports/cucumber-report.html
```

## 🐛 Troubleshooting

### Issue: Tests not running
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx playwright install chromium
npm test
```

### Issue: Browser not found
```bash
npx playwright install chromium
```

### Issue: Port conflicts
Check what's using the port and kill the process, or change the port in config.

### Issue: Timeout errors
Increase timeout values in `testdata/config.json`

## 📝 Writing New Tests

1. Add scenario to feature file in `features/`
2. Add step definitions to `steps/stepDefinitions.js`
3. Update page objects in `pages/` if needed
4. Add test data to JSON files in `testdata/`

Example step definition:
```javascript
When('I perform an action', async function() {
  await world.page.click('selector');
});
```

## ⚙️ Configuration

Edit `testdata/config.json` to customize:
- Timeouts
- Screenshot on failure
- Headless mode
- Browser options

## 🔗 Useful Links

- [Cucumber Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev/)
- [BDD Best Practices](https://cucumber.io/docs/bdd/)

## 💡 Tips

- Run with `npm run test:smoke` for quick validation during development
- Use `--dry-run` flag to validate scenarios without execution
- Keep test data in JSON files for easy maintenance
- Use page objects for all UI interactions
- Tag tests appropriately (@smoke, @regression, @critical)

## 📞 Support

For issues or questions, refer to the full README.md in the project root.

---

**Happy Testing! 🎉**
