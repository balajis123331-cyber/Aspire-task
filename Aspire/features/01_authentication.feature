Feature: Authentication - Support Ticket Desk
  As a user of the Support Ticket Desk application
  I want to be able to login and logout securely
  So that I can access my assigned tickets

  Background:
    Given I navigate to the application

  @smoke @critical
  Scenario: Login with valid admin credentials
    When I login with "admin" username and "admin123" password
    Then I should see the dashboard

  @smoke @critical
  Scenario: Login with valid agent credentials
    When I login with "agent" username and "agent123" password
    Then I should see the dashboard

  @regression
  Scenario: Login with invalid credentials
    When I login with "invaliduser" username and "wrongpassword" password
    Then I should still see the login form

  @regression
  Scenario Outline: Login with invalid username and password combinations
    When I login with "<username>" username and "<password>" password
    Then I should still see the login form

    Examples:
      | username      | password       |
      | invaliduser   | invalidpass    |
      | admin         | wrongpassword  |
      |               |                |
      | admin         |                |

  @regression
  Scenario: Logout from dashboard
    When I login with "admin" username and "admin123" password
    Then I should see the dashboard
    When I logout
    Then I should see the login form

  @smoke
  Scenario: Form validation - empty fields
    When I try to login without entering credentials
    Then I should still see the login form

  @regression
  Scenario: Verify login form elements
    Then I should see username input field
    And I should see password input field
    And I should see sign in button
