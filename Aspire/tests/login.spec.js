// @ts-check
import { test, expect } from '@playwright/test';

const TEST_URL = 'https://simonluckenuikvalsoft.github.io/qa-test-sample-application/';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the application before each test
    await page.goto(TEST_URL);
  });

  test('should display login form element', async ({ page }) => {
    // Verify the login form is visible
    await expect(page).toHaveTitle(/Support Ticket/);
    
    // Check for username field
    const usernameInput = page.locator('input[type="text"]').first();
    await expect(usernameInput).toBeVisible();
    
    // Check for password field
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
    
    // Check for Sign In button
    const signInButton = page.locator('button:has-text("Sign In")');
    await expect(signInButton).toBeVisible();
  });

  test('should login successfully with admin credentials', async ({ page }) => {
    // Fill username field
    await page.locator('input[type="text"]').first().fill('admin');
    
    // Fill password field
    await page.locator('input[type="password"]').fill('admin123');
    
    // Click Sign In button
    await page.locator('button:has-text("Sign In")').click();
    
    // Wait for navigation and verify successful login
    await page.waitForTimeout(1000);
    
    // Verify we're on the dashboard (should not be on login page anymore)
    const loginForm = page.locator('text=Sign in to your account');
    await expect(loginForm).not.toBeVisible();
  });

  test('should login successfully with agent credentials', async ({ page }) => {
    // Fill username field
    await page.locator('input[type="text"]').first().fill('agent');
    
    // Fill password field
    await page.locator('input[type="password"]').fill('agent123');
    
    // Click Sign In button
    await page.locator('button:has-text("Sign In")').click();
    
    // Wait for navigation and verify successful login
    await page.waitForTimeout(1000);
    
    // Verify we're on the dashboard (should not be on login page anymore)
    const loginForm = page.locator('text=Sign in to your account');
    await expect(loginForm).not.toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Fill username field with invalid credentials
    await page.locator('input[type="text"]').first().fill('invaliduser');
    
    // Fill password field with invalid credentials
    await page.locator('input[type="password"]').fill('invalidpass');
    
    // Click Sign In button
    await page.locator('button:has-text("Sign In")').click();
    
    // Wait for response
    await page.waitForTimeout(1000);
    
    // Verify we're still on login page
    const loginForm = page.locator('text=Sign in to your account');
    await expect(loginForm).toBeVisible();
  });

  test('should not allow login with empty fields', async ({ page }) => {
    // Try to click Sign In without filling fields
    await page.locator('button:has-text("Sign In")').click();
    
    // Verify we're still on login page
    const loginForm = page.locator('text=Sign in to your account');
    await expect(loginForm).toBeVisible();
  });

  test('should not allow login with only username', async ({ page }) => {
    // Fill only username field
    await page.locator('input[type="text"]').first().fill('admin');
    
    // Click Sign In button without password
    await page.locator('button:has-text("Sign In")').click();
    
    // Verify we're still on login page
    const loginForm = page.locator('text=Sign in to your account');
    await expect(loginForm).toBeVisible();
  });
});
