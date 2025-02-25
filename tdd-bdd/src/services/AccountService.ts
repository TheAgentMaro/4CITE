import { Account, TransactionResult, Transaction } from '../types/Account';

export class AccountService {
  private accounts: Map<string, Account>;
  private transactions: Transaction[];

  constructor() {
    this.accounts = new Map<string, Account>();
    this.transactions = [];
  }

  public createAccount(accountId: string, owner: string, initialBalance: number = 0): Account {
    if (this.accounts.has(accountId)) {
      throw new Error('Account already exists');
    }

    const account: Account = {
      accountId,
      owner,
      balance: initialBalance
    };

    this.accounts.set(accountId, account);
    return account;
  }

  public getAccount(accountId: string): Account {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return { ...account };
  }

  public setBalance(accountId: string, newBalance: number): Account {
    const account = this.accounts.get(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    account.balance = newBalance;
    this.accounts.set(accountId, account);
    return { ...account };
  }

  public transferMoney(
    sourceAccountId: string,
    targetAccountId: string,
    amount: number
  ): TransactionResult {
    // Validation de base
    if (amount <= 0) {
      return this.createFailedTransaction(
        sourceAccountId,
        targetAccountId,
        amount,
        'invalid amount'
      );
    }

    if (sourceAccountId === targetAccountId) {
      return this.createFailedTransaction(
        sourceAccountId,
        targetAccountId,
        amount,
        'same account transfer'
      );
    }

    // Vérification des comptes
    try {
      const sourceAccount = this.getAccount(sourceAccountId);
      const targetAccount = this.getAccount(targetAccountId);

      // Vérification du solde
      if (sourceAccount.balance < amount) {
        return this.createFailedTransaction(
          sourceAccountId,
          targetAccountId,
          amount,
          'insufficient funds'
        );
      }

      // Effectuer le transfert
      sourceAccount.balance -= amount;
      targetAccount.balance += amount;

      // Mettre à jour les comptes
      this.accounts.set(sourceAccountId, sourceAccount);
      this.accounts.set(targetAccountId, targetAccount);

      // Enregistrer la transaction
      const transaction: Transaction = {
        transactionId: this.generateTransactionId(),
        sourceAccountId,
        targetAccountId,
        amount,
        timestamp: new Date(),
        status: 'SUCCESS'
      };
      this.transactions.push(transaction);

      return {
        success: true,
        newSourceBalance: sourceAccount.balance,
        newTargetBalance: targetAccount.balance,
        transactionId: transaction.transactionId
      };
    } catch (error) {
      return this.createFailedTransaction(
        sourceAccountId,
        targetAccountId,
        amount,
        'invalid account'
      );
    }
  }

  private createFailedTransaction(
    sourceAccountId: string,
    targetAccountId: string,
    amount: number,
    errorMessage: string
  ): TransactionResult {
    const transaction: Transaction = {
      transactionId: this.generateTransactionId(),
      sourceAccountId,
      targetAccountId,
      amount,
      timestamp: new Date(),
      status: 'FAILED',
      errorMessage
    };
    this.transactions.push(transaction);

    return {
      success: false,
      message: errorMessage
    };
  }

  private generateTransactionId(): string {
    return `TRX${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  }

  public getTransactionHistory(): Transaction[] {
    return [...this.transactions];
  }
}
