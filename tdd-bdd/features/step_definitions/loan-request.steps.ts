import { Given, When, Then, Before } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { LoanService } from '../../src/services/LoanService';
import { LoanDetails, Customer } from '../../src/types/Loan';

let loanService: LoanService;
let lastLoanDetails: LoanDetails;

interface CustomerData {
  customerId: string;
  name: string;
  creditScore: string;
  annualIncome: string;
}

// Fonction utilitaire pour comparer les nombres avec une marge d'erreur
function assertNumbersEqual(actual: number | undefined, expected: number, message: string) {
  if (actual === undefined) {
    assert.fail(`${message}: actual value is undefined`);
  }
  const tolerance = 1.0; // Tolérance de 1 unité pour les calculs financiers
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    assert.fail(`${message}: expected ${expected} but got ${actual} (diff: ${diff})`);
  }
}

Before(function () {
  loanService = new LoanService();
});

Given('the following customers exist:', function (dataTable) {
  const customers = dataTable.hashes() as CustomerData[];
  
  customers.forEach(customer => {
    const customerData: Customer = {
      customerId: customer.customerId,
      name: customer.name,
      creditScore: parseInt(customer.creditScore),
      annualIncome: parseFloat(customer.annualIncome)
    };
    loanService.addCustomer(customerData);
  });
});

When('customer {string} requests a loan of {float} for {int} months', function (customerId: string, amount: number, termMonths: number) {
  lastLoanDetails = loanService.requestLoan({
    customerId,
    amount,
    termMonths
  });
});

When('I calculate loan details for {float} at {float}% for {int} months', function (amount: number, interestRate: number, termMonths: number) {
  lastLoanDetails = loanService.calculateLoanDetails(amount, interestRate, termMonths);
});

Then('the loan should be approved', function () {
  assert.strictEqual(lastLoanDetails.approved, true);
});

Then('the loan should be rejected', function () {
  assert.strictEqual(lastLoanDetails.approved, false);
});

Then('the interest rate should be {float}%', function (expectedRate: number) {
  assertNumbersEqual(lastLoanDetails.interestRate, expectedRate, 'Interest rate mismatch');
});

Then('the monthly payment should be {float}', function (expectedPayment: number) {
  assertNumbersEqual(lastLoanDetails.monthlyPayment, expectedPayment, 'Monthly payment mismatch');
});

Then('the total interest should be {float}', function (expectedInterest: number) {
  assertNumbersEqual(lastLoanDetails.totalInterest, expectedInterest, 'Total interest mismatch');
});

Then('the {string} rejection reason should be given', function (expectedReason: string) {
  assert.strictEqual(lastLoanDetails.rejectionReason, expectedReason);
});

Then('the loan details should be recorded', function () {
  assert.strictEqual(lastLoanDetails.approved, true);
});
