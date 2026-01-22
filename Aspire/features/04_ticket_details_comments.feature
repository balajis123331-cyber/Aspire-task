Feature: Ticket Details and Comments - Support Ticket Desk
  As a support team member
  I want to view ticket details and manage comments
  So that I can properly handle customer issues

  Background:
    Given I navigate to the application
    When I login with "admin" username and "admin123" password
    And I navigate to Tickets page

  @smoke @critical
  Scenario: View ticket details page
    When I view the first ticket
    Then the ticket detail page should be loaded
    And ticket ID should be displayed
    And ticket title should be displayed
    And ticket description should be displayed
    And ticket status should be displayed
    And ticket priority should be displayed

  @smoke @critical
  Scenario: Add comment to ticket
    When I view the first ticket
    And I add a comment "This is a test comment"
    Then the comment should be added successfully
    And the comment should appear in the comments list

  @regression
  Scenario: Verify validation error for empty comment
    When I view the first ticket
    And I try to submit an empty comment
    Then a validation error should be displayed

  @regression
  Scenario: Multiple comments on a ticket
    When I view the first ticket
    And I add a comment "First comment"
    And I add a comment "Second comment"
    And I add a comment "Third comment"
    Then all three comments should be visible

  @regression
  Scenario: View customer details from ticket
    When I view the first ticket
    And I click on the customer link
    Then the customer detail page should be loaded
    And customer information should be displayed

  @regression
  Scenario: Edit ticket and save changes
    When I view the first ticket
    And I update ticket description to "Updated description for testing"
    And I save the ticket
    Then a success message should be displayed
    And the updated description should be persisted

  @regression
  Scenario: Cancel ticket edit
    When I view the first ticket
    And I update ticket description to "This should be cancelled"
    And I cancel the edit
    Then the changes should not be saved

  @smoke
  Scenario: Navigate back from ticket details
    When I view the first ticket
    And I click back button
    Then I should return to the tickets list
