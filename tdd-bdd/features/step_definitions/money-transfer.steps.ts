import { Given, When, Then, Before } from '@cucumber/cucumber';
import { strict as assert } from 'assert';
import { AccountService } from '../../src/services/AccountService';
import { TransactionResult } from '../../src/types/Account';

let accountService: AccountService;
let lastTransactionResult: TransactionResult;

interface AccountData {
  accountId: string;
  owner: string;
  balance: string;
}

Before(function () {
  console.log('Creating new AccountService instance');
  accountService = new AccountService();
});

Given('the following accounts exist:', function (dataTable) {
  console.log('Creating initial accounts');
  const accounts = dataTable.hashes() as AccountData[];
  
  accounts.forEach(account => {
    console.log(`Creating account ${account.accountId} with balance ${account.balance}`);
    accountService.createAccount(
      account.accountId,
      account.owner,
      parseFloat(account.balance)
    );
  });
});

Given('account {string} has a balance of {float}', function (accountId: string, balance: number) {
  console.log(`Setting balance of ${accountId} to ${balance}`);
  accountService.setBalance(accountId, balance);
  const account = accountService.getAccount(accountId);
  console.log(`Current balance of ${accountId}: ${account.balance}`);
  assert.strictEqual(account.balance, balance);
});

When('I transfer {float} from account {string} to account {string}', function (amount: number, sourceId: string, targetId: string) {
  console.log(`Transferring ${amount} from ${sourceId} to ${targetId}`);
  lastTransactionResult = accountService.transferMoney(sourceId, targetId, amount);
  console.log('Transfer result:', lastTransactionResult);
});

When('I try to transfer {float} from account {string} to account {string}', function (amount: number, sourceId: string, targetId: string) {
  console.log(`Attempting to transfer ${amount} from ${sourceId} to ${targetId}`);
  lastTransactionResult = accountService.transferMoney(sourceId, targetId, amount);
  console.log('Transfer result:', lastTransactionResult);
});

Then('account {string} should have a balance of {float}', function (accountId: string, expectedBalance: number) {
  const account = accountService.getAccount(accountId);
  console.log(`Checking balance of ${accountId}. Expected: ${expectedBalance}, Actual: ${account.balance}`);
  assert.strictEqual(account.balance, expectedBalance);
});

Then('the transfer should be recorded in the transaction history', function () {
  const transactions = accountService.getTransactionHistory();
  const lastTransaction = transactions[transactions.length - 1];
  console.log('Last transaction:', lastTransaction);
  assert.strictEqual(lastTransaction.status, 'SUCCESS');
});

Then('the transfer should be rejected', function () {
  console.log('Checking if transfer was rejected:', lastTransactionResult);
  assert.strictEqual(lastTransactionResult.success, false);
});

Then('the {string} error should be raised', function (errorType: string) {
  console.log(`Checking error message. Expected: ${errorType}, Actual: ${lastTransactionResult.message}`);
  assert.strictEqual(lastTransactionResult.message, errorType);
});
