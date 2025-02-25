export interface Customer {
  customerId: string;
  name: string;
  creditScore: number;
  annualIncome: number;
}

export interface LoanRequest {
  customerId: string;
  amount: number;
  termMonths: number;
}

export interface LoanDetails {
  approved: boolean;
  interestRate?: number;
  monthlyPayment?: number;
  totalInterest?: number;
  rejectionReason?: string;
}

export interface Loan extends LoanDetails {
  loanId: string;
  customerId: string;
  amount: number;
  termMonths: number;
  startDate: Date;
}
