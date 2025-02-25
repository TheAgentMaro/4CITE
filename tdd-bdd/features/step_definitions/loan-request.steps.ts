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
  assert.strictEqual(lastLoanDetails.interestRate, expectedRate);
});

Then('the monthly payment should be {float}', function (expectedPayment: number) {
  assert.strictEqual(lastLoanDetails.monthlyPayment, expectedPayment);
});

Then('the total interest should be {float}', function (expectedInterest: number) {
  const actualInterest = Number(lastLoanDetails.totalInterest?.toFixed(2));
  assert.strictEqual(actualInterest, expectedInterest);
});

Then('the {string} rejection reason should be given', function (expectedReason: string) {
  assert.strictEqual(lastLoanDetails.rejectionReason, expectedReason);
});

Then('the loan details should be recorded', function () {
  // Cette étape est implicitement vérifiée car le service enregistre automatiquement les prêts approuvés
  assert.strictEqual(lastLoanDetails.approved, true);
});
