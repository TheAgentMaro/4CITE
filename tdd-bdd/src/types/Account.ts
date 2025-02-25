export interface Account {
  accountId: string;
  owner: string;
  balance: number;
}

export interface TransactionResult {
  success: boolean;
  message?: string;
  newSourceBalance?: number;
  newTargetBalance?: number;
  transactionId?: string;
}

export interface Transaction {
  transactionId: string;
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  timestamp: Date;
  status: 'SUCCESS' | 'FAILED';
  errorMessage?: string;
}
