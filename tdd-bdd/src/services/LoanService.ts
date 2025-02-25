import { Customer, LoanRequest, LoanDetails, Loan } from '../types/Loan';

export class LoanService {
  private customers: Map<string, Customer>;
  private loans: Map<string, Loan>;
  private nextLoanId: number;

  constructor() {
    this.customers = new Map();
    this.loans = new Map();
    this.nextLoanId = 1;
  }

  public addCustomer(customer: Customer): void {
    this.customers.set(customer.customerId, customer);
  }

  public requestLoan(request: LoanRequest): LoanDetails {
    const customer = this.customers.get(request.customerId);
    if (!customer) {
      return { approved: false, rejectionReason: 'customer not found' };
    }

    // Validate loan term (minimum 12 months, maximum 60 months)
    if (request.termMonths < 12 || request.termMonths > 60) {
      return { approved: false, rejectionReason: 'invalid loan term' };
    }

    // Validate loan amount (maximum 10x annual income)
    if (request.amount > customer.annualIncome * 10) {
      return { approved: false, rejectionReason: 'loan amount too high' };
    }

    // Check credit score (minimum 650 for approval)
    if (customer.creditScore < 650) {
      return { approved: false, rejectionReason: 'low credit score' };
    }

    // Calculate interest rate based on credit score
    const interestRate = this.calculateInterestRate(customer.creditScore);
    const monthlyPayment = this.calculateMonthlyPayment(request.amount, interestRate, request.termMonths);
    const totalInterest = this.round((monthlyPayment * request.termMonths) - request.amount);

    const loanDetails: LoanDetails = {
      approved: true,
      interestRate,
      monthlyPayment,
      totalInterest
    };

    // Record the loan if approved
    const loan: Loan = {
      ...loanDetails,
      loanId: `LOAN${this.nextLoanId++}`,
      customerId: request.customerId,
      amount: request.amount,
      termMonths: request.termMonths,
      startDate: new Date()
    };

    this.loans.set(loan.loanId, loan);
    return loanDetails;
  }

  public calculateLoanDetails(amount: number, interestRate: number, termMonths: number): LoanDetails {
    const monthlyPayment = this.calculateMonthlyPayment(amount, interestRate, termMonths);
    const totalInterest = this.round((monthlyPayment * termMonths) - amount);

    return {
      approved: true,
      interestRate,
      monthlyPayment,
      totalInterest
    };
  }

  private calculateInterestRate(creditScore: number): number {
    if (creditScore >= 800) return 4.5;
    if (creditScore >= 750) return 5.5;
    if (creditScore >= 700) return 6.5;
    return 7.5;
  }

  private calculateMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
    const monthlyRate = (annualRate / 100) / 12;
    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                   (Math.pow(1 + monthlyRate, termMonths) - 1);
    return this.round(payment);
  }

  private round(value: number): number {
    return Number(value.toFixed(2));
  }

  public getCustomer(customerId: string): Customer | undefined {
    return this.customers.get(customerId);
  }

  public getLoan(loanId: string): Loan | undefined {
    return this.loans.get(loanId);
  }
}
