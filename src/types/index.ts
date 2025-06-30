export interface Lead {
  id: string;
  leadId: string;
  loanType: string;
  profile: 'Approved' | 'Pending' | 'Rejected';
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  income: number;
  loanAmount: number;
  pan: string;
  pincode: string;
  consent: boolean;
  documents: {
    aadhaar?: string;
    pan?: string;
    bankStatement?: string;
    paymentSlip?: string;
  };
  partnerId?: string;
  partnerName?: string;
  utmSource?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: 'Active' | 'Inactive';
  leadCount: number;
  conversionRate: number;
  createdAt: string;
}

export interface Lender {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  interestRate: string;
  loanTypes: string[];
  minLoanAmount: number;
  maxLoanAmount: number;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  createdAt: string;
}

export interface SmsTemplate {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}
