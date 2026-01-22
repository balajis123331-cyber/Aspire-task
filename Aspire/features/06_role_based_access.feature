Feature: Role-Based Access Control - Support Ticket Desk
  As a system
  I want to enforce role-based access control
  So that users can only access features permitted to their role

  Background:
    Given I navigate to the application

  @smoke @critical
  Scenario: Admin can see all features
    When I login with "admin" username and "admin123" password
    Then I should see the dashboard
    And I should be able to navigate to Tickets
    And I should be able to navigate to Customers
    And the Add Customer button should be visible

  @regression
  Scenario: Admin can see delete buttons on tickets
    When I login with "admin" username and "admin123" password
    And I navigate to Tickets page
    Then delete button should be visible for tickets

  @regression
  Scenario: Admin can see edit buttons on tickets
    When I login with "admin" username and "admin123" password
    And I navigate to Tickets page
    Then edit button should be visible for tickets

  @regression
  Scenario: Admin can see delete buttons on customers
    When I login with "admin" username and "admin123" password
    And I navigate to Customers page
    Then delete button should be visible for customers

  @regression
  Scenario: Admin can see edit buttons on customers
    When I login with "admin" username and "admin123" password
    And I navigate to Customers page
    Then edit button should be visible for customers

  @smoke @critical
  Scenario: Agent can see dashboard
    When I login with "agent" username and "agent123" password
    Then I should see the dashboard

  @regression
  Scenario: Agent can view assigned tickets only
    When I login with "agent" username and "agent123" password
    And I navigate to Tickets page
    Then I should see tickets assigned to me

  @regression
  Scenario: Agent cannot see Add Customer button
    When I login with "agent" username and "agent123" password
    And I navigate to Customers page
    Then the Add Customer button should not be visible

  @regression
  Scenario: Agent cannot see delete buttons on customers
    When I login with "agent" username and "agent123" password
    And I navigate to Customers page
    Then delete button should not be visible for customers

  @regression
  Scenario: Agent cannot see edit buttons on customers
    When I login with "agent" username and "agent123" password
    And I navigate to Customers page
    Then edit button should not be visible for customers

  @regression
  Scenario: Agent cannot delete tickets
    When I login with "agent" username and "agent123" password
    And I navigate to Tickets page
    Then delete button should not be visible for tickets

  @regression
  Scenario: Unauthorized access redirects to login
    When I navigate directly to tickets page without authentication
    Then I should be redirected to login page
