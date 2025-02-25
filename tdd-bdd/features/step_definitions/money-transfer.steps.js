const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const { AccountService } = require('../../dist/services/AccountService');

let accountService;
let lastTransactionResult;

Given('the following accounts exist:', function (dataTable) {
  accountService = new AccountService();
  const accounts = dataTable.hashes();
  
  accounts.forEach(account => {
    accountService.createAccount(
      account.accountId,
      account.owner,
      parseFloat(account.balance)
    );
  });
});

Given('account {string} has a balance of {float}', function (accountId, balance) {
  const account = accountService.getAccount(accountId);
  assert.strictEqual(account.balance, balance);
});

When('I transfer {float} from account {string} to account {string}', function (amount, sourceId, targetId) {
  lastTransactionResult = accountService.transferMoney(sourceId, targetId, amount);
});

When('I try to transfer {float} from account {string} to account {string}', function (amount, sourceId, targetId) {
  lastTransactionResult = accountService.transferMoney(sourceId, targetId, amount);
});

Then('account {string} should have a balance of {float}', function (accountId, expectedBalance) {
  const account = accountService.getAccount(accountId);
  assert.strictEqual(account.balance, expectedBalance);
});

Then('the transfer should be recorded in the transaction history', function () {
  const transactions = accountService.getTransactionHistory();
  const lastTransaction = transactions[transactions.length - 1];
  assert.strictEqual(lastTransaction.status, 'SUCCESS');
});

Then('the transfer should be rejected', function () {
  assert.strictEqual(lastTransactionResult.success, false);
});

Then('an {string} error should be raised', function (errorType) {
  assert.strictEqual(lastTransactionResult.message, errorType);
});
