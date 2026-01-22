Feature: Edge Cases & Error Handling - Support Ticket Desk
  As a tester
  I want to verify edge cases and error handling
  So that the application is robust and handles unexpected scenarios

  Background:
    Given I navigate to the application
    When I login with "admin" username and "admin123" password

  @regression
  Scenario: Verify Invalid Ticket ID displays error
    When I navigate to an invalid ticket ID
    Then a "Ticket Not Found" page should be displayed

  @regression
  Scenario: Verify Invalid Customer ID displays error
    When I navigate to an invalid customer ID
    Then a "Customer Not Found" page should be displayed

  @regression
  Scenario: Verify No Tickets Found message
    When I navigate to Tickets page
    And I filter tickets by status "Closed"
    And I filter tickets by priority "Low"
    And there are no matching tickets
    Then a "No tickets found" message should be displayed

  @regression
  Scenario: Verify No Customers Found message
    When I navigate to Customers page
    And I filter customers by SLA level "Gold"
    And I filter customers by status "Inactive"
    And there are no matching customers
    Then a "No customers found" message should be displayed

  @regression
  Scenario: Loading spinner appears during data fetch
    When I navigate to Tickets page
    Then loading spinner should appear and disappear

  @regression
  Scenario: Success alert appears after successful action
    When I navigate to Tickets page
    And I create a ticket with valid data
    Then a success alert should appear and auto-dismiss

  @regression
  Scenario: Error alert appears after failed action
    When I navigate to Tickets page
    And I create a ticket with invalid data
    Then an error alert should appear

  @regression
  Scenario: Confirm dialog appears before delete
    When I navigate to Tickets page
    And I click delete button for the first ticket
    Then a confirmation dialog should appear

  @regression
  Scenario: Cancel delete operation
    When I navigate to Tickets page
    And I click delete button for the first ticket
    And I cancel the delete confirmation
    Then the ticket should not be deleted
    And I should remain on the tickets page

  @regression
  Scenario: Pagination displays correct number of items
    When I navigate to Tickets page
    Then each page should display correct number of items

  @regression
  Scenario: Sorting tickets by column headers
    When I navigate to Tickets page
    And I click on ticket title column header
    Then tickets should be sorted by title
    When I click on ticket status column header
    Then tickets should be sorted by status

  @regression
  Scenario: Special characters in search
    When I navigate to Tickets page
    And I search tickets by special characters "@#$%"
    Then the search should handle special characters gracefully

  @regression
  Scenario: Very long text in form fields
    When I navigate to Tickets page
    And I click Add Ticket button
    And I enter very long text in title field
    Then the form should handle long text appropriately

  @regression
  Scenario: Rapid filter changes
    When I navigate to Tickets page
    And I rapidly change filters
    Then the page should respond correctly to rapid changes

  @regression
  Scenario: Navigation with back button
    When I navigate to Tickets page
    And I view the first ticket
    And I use browser back button
    Then I should return to tickets list

  @regression
  Scenario: Refresh page preserves session
    When I navigate to Tickets page
    And I refresh the current page
    Then I should remain logged in
    And the tickets page should reload

  @regression
  Scenario: Multiple tabs - session consistency
    When I open the application in multiple tabs
    Then both tabs should show consistent data

  @regression
  Scenario: Logout from any page
    When I navigate to Tickets page
    And I logout
    Then I should be redirected to login page
    And I should not be able to access tickets without logging in again
