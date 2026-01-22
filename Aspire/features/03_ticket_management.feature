Feature: Ticket Management - Support Ticket Desk
  As a support admin or agent
  I want to manage tickets efficiently
  So that I can track and resolve customer issues

  Background:
    Given I navigate to the application
    When I login with "admin" username and "admin123" password
    And I navigate to Tickets page

  @smoke @critical
  Scenario: Create a new ticket with all required fields
    When I click Add Ticket button
    And I create a ticket with:
      | Field       | Value                         |
      | Title       | Email configuration issue     |
      | Description | User unable to configure...   |
      | Priority    | High                          |
    Then a success message should be displayed

  @regression
  Scenario: View ticket details
    When I view the first ticket
    Then the ticket detail page should be loaded
    And ticket title should be displayed
    And ticket description should be displayed
    And ticket status should be displayed

  @regression
  Scenario: Edit ticket status
    When I view the first ticket
    And I update ticket status to "In Progress"
    And I save the ticket
    Then a success message should be displayed

  @regression
  Scenario: Edit ticket priority
    When I view the first ticket
    And I update ticket priority to "Medium"
    And I save the ticket
    Then a success message should be displayed

  @regression
  Scenario: Filter tickets by status
    When I filter tickets by status "Open"
    Then only "Open" status tickets should be displayed

  @regression
  Scenario Outline: Filter tickets by different statuses
    When I filter tickets by status "<status>"
    Then only "<status>" status tickets should be displayed

    Examples:
      | status      |
      | Open        |
      | In Progress |
      | Resolved    |
      | Closed      |

  @regression
  Scenario Outline: Filter tickets by priority
    When I filter tickets by priority "<priority>"
    Then only "<priority>" priority tickets should be displayed

    Examples:
      | priority |
      | Low      |
      | Medium   |
      | High     |
      | Critical |

  @regression
  Scenario: Search tickets by title
    When I search tickets by "configuration"
    Then only matching tickets should be displayed

  @regression
  Scenario: Clear all filters
    When I filter tickets by status "Open"
    And I click Clear Filters button
    Then all tickets should be displayed

  @regression
  Scenario: Delete ticket error scenario
    When I attempt to delete ticket with ID "TKT-001"
    Then an error message should be displayed

  @regression
  Scenario: Create ticket error scenario
    When I click Add Ticket button
    And I create a ticket with:
      | Field       | Value                         |
      | Title       | FAIL_CREATE error test        |
      | Description | This should trigger error     |
      | Priority    | High                          |
    Then an error message should be displayed

  @regression
  Scenario: No tickets found message
    When I filter tickets by status "Closed"
    And there are no matching tickets
    Then a "No tickets found" message should be displayed

  @regression
  Scenario: Ticket form validation - empty title
    When I click Add Ticket button
    And I leave title field empty
    And I try to create the ticket
    Then the ticket should not be created
    And a validation error should be shown

  @smoke
  Scenario: Admin can see delete button
    Then delete button should be visible for tickets

  @regression
  Scenario: Pagination works correctly
    Then I should be able to navigate through ticket pages
