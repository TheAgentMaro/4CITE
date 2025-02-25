import { AccountService } from './AccountService';

describe('AccountService', () => {
  let accountService: AccountService;

  beforeEach(() => {
    accountService = new AccountService();
    // Setup test accounts
    accountService.createAccount('ACC001', 'John Doe', 1000);
    accountService.createAccount('ACC002', 'Jane Smith', 500);
  });

  describe('Account Creation', () => {
    it('should create a new account with initial balance', () => {
      const account = accountService.createAccount('ACC003', 'Bob Wilson', 750);
      expect(account.balance).toBe(750);
      expect(account.owner).toBe('Bob Wilson');
    });

    it('should throw error when creating duplicate account', () => {
      expect(() => {
        accountService.createAccount('ACC001', 'John Doe', 1000);
      }).toThrow('Account already exists');
    });
  });

  describe('Money Transfer', () => {
    it('should successfully transfer money between accounts', () => {
      const result = accountService.transferMoney('ACC001', 'ACC002', 500);
      expect(result.success).toBe(true);
      expect(result.newSourceBalance).toBe(500);
      expect(result.newTargetBalance).toBe(1000);
    });

    it('should reject transfer with insufficient funds', () => {
      const result = accountService.transferMoney('ACC001', 'ACC002', 1500);
      expect(result.success).toBe(false);
      expect(result.message).toBe('insufficient funds');
    });

    it('should reject transfer with negative amount', () => {
      const result = accountService.transferMoney('ACC001', 'ACC002', -100);
      expect(result.success).toBe(false);
      expect(result.message).toBe('invalid amount');
    });

    it('should reject transfer to same account', () => {
      const result = accountService.transferMoney('ACC001', 'ACC001', 100);
      expect(result.success).toBe(false);
      expect(result.message).toBe('same account transfer');
    });

    it('should reject transfer with invalid account', () => {
      const result = accountService.transferMoney('INVALID', 'ACC002', 100);
      expect(result.success).toBe(false);
      expect(result.message).toBe('invalid account');
    });
  });

  describe('Transaction History', () => {
    it('should record successful transactions', () => {
      accountService.transferMoney('ACC001', 'ACC002', 500);
      const history = accountService.getTransactionHistory();
      const lastTransaction = history[history.length - 1];
      
      expect(lastTransaction.status).toBe('SUCCESS');
      expect(lastTransaction.amount).toBe(500);
      expect(lastTransaction.sourceAccountId).toBe('ACC001');
      expect(lastTransaction.targetAccountId).toBe('ACC002');
    });

    it('should record failed transactions', () => {
      accountService.transferMoney('ACC001', 'ACC002', 2000);
      const history = accountService.getTransactionHistory();
      const lastTransaction = history[history.length - 1];
      
      expect(lastTransaction.status).toBe('FAILED');
      expect(lastTransaction.errorMessage).toBe('insufficient funds');
    });
  });
});
