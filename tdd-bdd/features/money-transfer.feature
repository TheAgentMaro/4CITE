Feature: Money Transfer Between Accounts
  As a bank customer
  I want to transfer money between accounts
  So that I can manage my finances effectively

  Background:
    Given the following accounts exist:
      | accountId | owner        | balance |
      | ACC001   | John Doe     | 1000.00 |
      | ACC002   | Jane Smith   | 500.00  |

  Scenario: Successful money transfer between accounts
    Given account "ACC001" has a balance of 1000.00
    When I transfer 500.00 from account "ACC001" to account "ACC002"
    Then account "ACC001" should have a balance of 500.00
    And account "ACC002" should have a balance of 1000.00
    And the transfer should be recorded in the transaction history

  Scenario: Failed transfer due to insufficient funds
    Given account "ACC001" has a balance of 100.00
    When I try to transfer 500.00 from account "ACC001" to account "ACC002"
    Then the transfer should be rejected
    And account "ACC001" should have a balance of 100.00
    And account "ACC002" should have a balance of 500.00
    And an "insufficient funds" error should be raised

  Scenario: Transfer with invalid account number
    When I try to transfer 100.00 from account "INVALID" to account "ACC002"
    Then the transfer should be rejected
    And an "invalid account" error should be raised

  Scenario: Transfer with negative amount
    When I try to transfer -100.00 from account "ACC001" to account "ACC002"
    Then the transfer should be rejected
    And an "invalid amount" error should be raised

  Scenario: Transfer to same account
    When I try to transfer 100.00 from account "ACC001" to account "ACC001"
    Then the transfer should be rejected
    And a "same account transfer" error should be raised
