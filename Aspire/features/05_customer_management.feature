Feature: Customer Management - Support Ticket Desk
  As an admin user
  I want to manage customers
  So that I can maintain customer database and manage their accounts

  Background:
    Given I navigate to the application
    When I login with "admin" username and "admin123" password
    And I navigate to Customers page

  @smoke @critical
  Scenario: View customers list
    Then the customers page should be loaded
    And the customers table should be visible

  @regression
  Scenario: Filter customers by SLA level
    When I filter customers by SLA level "Gold"
    Then only "Gold" SLA customers should be displayed

  @regression
  Scenario Outline: Filter customers by different SLA levels
    When I filter customers by SLA level "<slaLevel>"
    Then only "<slaLevel>" SLA customers should be displayed

    Examples:
      | slaLevel |
      | Gold     |
      | Silver   |
      | Bronze   |

  @regression
  Scenario: Filter customers by status
    When I filter customers by status "Active"
    Then only "Active" status customers should be displayed

  @regression
  Scenario Outline: Filter customers by different statuses
    When I filter customers by status "<status>"
    Then only "<status>" status customers should be displayed

    Examples:
      | status   |
      | Active   |
      | Inactive |

  @regression
  Scenario: Search customers by name
    When I search customers by "John"
    Then customers matching "John" should be displayed

  @regression
  Scenario: Search customers by email
    When I search customers by "john@example.com"
    Then customers matching "john@example.com" should be displayed

  @smoke @critical
  Scenario: Create a new customer
    When I click Add Customer button
    And I create a customer with:
      | Field    | Value                  |
      | Name     | Test Customer          |
      | Email    | test@example.com       |
      | Company  | Test Company           |
      | SLA      | Gold                   |
      | Status   | Active                 |
    Then a success message should be displayed

  @regression
  Scenario: Edit existing customer
    When I edit the first customer with:
      | Field    | Value                    |
      | Name     | Updated Customer Name    |
      | Email    | updated@example.com      |
      | Company  | Updated Company          |
    Then a success message should be displayed

  @regression
  Scenario: Delete customer with confirmation
    When I click delete button for the first customer
    And I accept the delete confirmation
    Then a success message should be displayed

  @regression
  Scenario: Create customer error scenario
    When I click Add Customer button
    And I create a customer with:
      | Field    | Value                  |
      | Name     | FAIL_CREATE Customer   |
      | Email    | fail@example.com       |
      | Company  | Fail Company           |
      | SLA      | Silver                 |
      | Status   | Active                 |
    Then an error message should be displayed

  @regression
  Scenario: Delete customer error scenario
    When I attempt to delete customer with ID "CUST-ERROR"
    Then an error message should be displayed

  @regression
  Scenario: No customers found message
    When I filter customers by SLA level "Gold"
    And I filter customers by status "Inactive"
    And there are no matching customers
    Then a "No customers found" message should be displayed

  @regression
  Scenario: Customer form validation - empty name
    When I click Add Customer button
    And I leave name field empty
    And I try to create the customer
    Then the customer should not be created
    And a validation error should be shown

  @regression
  Scenario: Customer form validation - invalid email
    When I click Add Customer button
    And I create a customer with:
      | Field    | Value              |
      | Name     | Test Customer      |
      | Email    | invalidemail       |
      | Company  | Test Company       |
      | SLA      | Gold               |
      | Status   | Active             |
    Then a validation error for email should be shown

  @regression
  Scenario: Customer list pagination
    Then I should be able to navigate through customer pages

  @regression
  Scenario: Clear all filters on customers
    When I filter customers by SLA level "Gold"
    And I click Clear Filters button
    Then all customers should be displayed

  @smoke
  Scenario: Admin can see Add Customer button
    Then the Add Customer button should be visible

  @smoke
  Scenario: View customer details
    When I view the first customer
    Then the customer detail page should be loaded
    And customer name should be displayed
    And customer email should be displayed
    And associated tickets count should be displayed
