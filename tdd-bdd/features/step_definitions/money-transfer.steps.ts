import { Given, When, Then } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { AccountService } from '../../src/services/AccountService';
import { TransactionResult } from '../../src/types/Account';

let accountService: AccountService;
let lastTransactionResult: TransactionResult;

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

Given('account {string} has a balance of {float}', function (accountId: string, balance: number) {
  const account = accountService.getAccount(accountId);
  assert.equal(account.balance, balance);
});

When('I transfer {float} from account {string} to account {string}', function (amount: number, sourceId: string, targetId: string) {
  lastTransactionResult = accountService.transferMoney(sourceId, targetId, amount);
});

When('I try to transfer {float} from account {string} to account {string}', function (amount: number, sourceId: string, targetId: string) {
  lastTransactionResult = accountService.transferMoney(sourceId, targetId, amount);
});

Then('account {string} should have a balance of {float}', function (accountId: string, expectedBalance: number) {
  const account = accountService.getAccount(accountId);
  assert.equal(account.balance, expectedBalance);
});

Then('the transfer should be recorded in the transaction history', function () {
  const transactions = accountService.getTransactionHistory();
  const lastTransaction = transactions[transactions.length - 1];
  assert.equal(lastTransaction.status, 'SUCCESS');
});

Then('the transfer should be rejected', function () {
  assert.equal(lastTransactionResult.success, false);
});

Then('an {string} error should be raised', function (errorType: string) {
  assert.equal(lastTransactionResult.message, errorType);
});
