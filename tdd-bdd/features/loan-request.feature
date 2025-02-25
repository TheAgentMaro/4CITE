@loan
Feature: Loan Request Processing
  As a bank customer
  I want to request a loan
  So that I can borrow money for my needs

  Background:
    Given the following customers exist:
      | customerId | name       | creditScore | annualIncome |
      | CUST001   | John Doe   | 750         | 60000.00     |
      | CUST002   | Jane Smith | 600         | 45000.00     |

  Scenario: Successful loan request with good credit score
    When customer "CUST001" requests a loan of 50000.00 for 36 months
    Then the loan should be approved
    And the interest rate should be 5.5%
    And the monthly payment should be 1509.80
    And the loan details should be recorded

  Scenario: Rejected loan request due to low credit score
    When customer "CUST002" requests a loan of 50000.00 for 36 months
    Then the loan should be rejected
    And the "low credit score" rejection reason should be given

  Scenario: Rejected loan request due to high loan amount
    When customer "CUST001" requests a loan of 500000.00 for 36 months
    Then the loan should be rejected
    And the "loan amount too high" rejection reason should be given

  Scenario: Rejected loan request due to invalid loan term
    When customer "CUST001" requests a loan of 50000.00 for 6 months
    Then the loan should be rejected
    And the "invalid loan term" rejection reason should be given

  Scenario: Calculating loan details
    When I calculate loan details for 100000.00 at 6.5% for 48 months
    Then the monthly payment should be 2371.50
    And the total interest should be 13832.00
