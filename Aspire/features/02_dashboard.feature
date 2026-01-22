Feature: Dashboard - Support Ticket Desk
  As a logged in user
  I want to see the dashboard with statistics and recent tickets
  So that I can quickly understand the system status

  Background:
    Given I navigate to the application
    When I login with "admin" username and "admin123" password

  @smoke @critical
  Scenario: Dashboard displays all statistics cards
    Then the dashboard should be loaded
    And I should see Open Tickets card
    And I should see Assigned to Me card
    And I should see Total Tickets card
    And I should see Customers card

  @smoke @critical
  Scenario: Dashboard displays recent tickets table
    Then the dashboard should be loaded
    And the recent tickets table should be visible
    And the recent tickets table should display up to 5 tickets

  @smoke
  Scenario: Navigate to tickets list via View All button
    Then the dashboard should be loaded
    When I click View All button
    Then I should be on the Tickets page

  @smoke
  Scenario: Navigate using dashboard navigation menu
    Then the dashboard should be loaded
    When I navigate to Tickets from dashboard
    Then I should be on the Tickets page

  @regression
  Scenario: Navigate to Customers from dashboard
    Then the dashboard should be loaded
    When I navigate to Customers from dashboard
    Then I should be on the Customers page

  @regression
  Scenario: Dashboard statistics values are non-negative
    Then the dashboard should be loaded
    And Open Tickets count should be greater than or equal to 0
    And Total Tickets count should be greater than or equal to 0
    And Customers count should be greater than or equal to 0
