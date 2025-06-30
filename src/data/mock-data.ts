import { Lead, Partner, Lender, Team, EmailTemplate, SmsTemplate } from '../types';

// Generate a random date within the last 30 days
const getRandomDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
};

// Generate random leads
export const mockLeads: Lead[] = Array.from({ length: 50 }, (_, i) => {
  const id = `LD${String(i + 1001).padStart(4, '0')}`;
  const partnerId = Math.random() > 0.5 ? 'p1' : 'p2';
  const partnerName = partnerId === 'p1' ? 'Partner One' : 'Partner Two';
  const loanTypes = ['Personal', 'Home', 'Car', 'Education', 'Business'];
  const profiles: ('Approved' | 'Pending' | 'Rejected')[] = ['Approved', 'Pending', 'Rejected'];
  const genders: ('Male' | 'Female' | 'Other')[] = ['Male', 'Female', 'Other'];
  
  const createdAt = getRandomDate();
  const updatedAt = new Date(new Date(createdAt).getTime() + Math.random() * 86400000).toISOString();
  
  return {
    id: String(i + 1),
    leadId: id,
    loanType: loanTypes[Math.floor(Math.random() * loanTypes.length)],
    profile: profiles[Math.floor(Math.random() * profiles.length)],
    firstName: `FirstName${i + 1}`,
    lastName: `LastName${i + 1}`,
    mobile: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    email: `customer${i + 1}@example.com`,
    gender: genders[Math.floor(Math.random() * genders.length)],
    dob: new Date(1980 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    income: Math.floor(Math.random() * 900000) + 100000,
    loanAmount: Math.floor(Math.random() * 9000000) + 100000,
    pan: `ABCDE${Math.floor(Math.random() * 9000) + 1000}F`,
    pincode: `${Math.floor(Math.random() * 900000) + 100000}`,
    consent: true,
    documents: {
      aadhaar: Math.random() > 0.3 ? 'aadhaar.pdf' : undefined,
      pan: Math.random() > 0.3 ? 'pan.pdf' : undefined,
      bankStatement: Math.random() > 0.5 ? 'bank_statement.pdf' : undefined,
      paymentSlip: Math.random() > 0.5 ? 'payment_slip.pdf' : undefined,
    },
    partnerId,
    partnerName,
    utmSource: Math.random() > 0.5 ? 'Google Ads' : 'Facebook',
    createdAt,
    updatedAt,
  };
});

// Generate random partners
export const mockPartners: Partner[] = Array.from({ length: 10 }, (_, i) => {
  const id = `P${String(i + 101).padStart(3, '0')}`;
  const statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];
  
  return {
    id: id,
    name: `Partner ${i + 1}`,
    email: `partner${i + 1}@example.com`,
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    company: `Company ${i + 1}`,
    address: `Address ${i + 1}, City`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    leadCount: Math.floor(Math.random() * 100),
    conversionRate: Math.floor(Math.random() * 100),
    createdAt: getRandomDate(),
  };
});

// Generate random lenders
export const mockLenders: Lender[] = Array.from({ length: 8 }, (_, i) => {
  const id = `L${String(i + 101).padStart(3, '0')}`;
  const statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];
  const loanTypes = ['Personal', 'Home', 'Car', 'Education', 'Business'];
  const selectedLoanTypes = loanTypes.filter(() => Math.random() > 0.5);
  
  return {
    id: id,
    name: `Lender ${i + 1}`,
    email: `lender${i + 1}@example.com`,
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    company: `Lender Company ${i + 1}`,
    interestRate: `${(Math.random() * 10 + 5).toFixed(2)}%`,
    loanTypes: selectedLoanTypes.length ? selectedLoanTypes : [loanTypes[0]],
    minLoanAmount: Math.floor(Math.random() * 100000) + 50000,
    maxLoanAmount: Math.floor(Math.random() * 9000000) + 1000000,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: getRandomDate(),
  };
});

// Generate random teams
export const mockTeams: Team[] = Array.from({ length: 12 }, (_, i) => {
  const id = `T${String(i + 101).padStart(3, '0')}`;
  const statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive'];
  const roles = ['Manager', 'Agent', 'Supervisor', 'Admin'];
  const departments = ['Sales', 'Support', 'Operations', 'Finance'];
  
  return {
    id: id,
    name: `Team Member ${i + 1}`,
    role: roles[Math.floor(Math.random() * roles.length)],
    email: `team${i + 1}@example.com`,
    phone: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt: getRandomDate(),
  };
});

// Generate email templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    name: 'Welcome Email',
    subject: 'Welcome to Our Loan Service',
    body: 'Dear {{name}},\n\nThank you for applying for a loan with us. We are processing your application and will get back to you shortly.\n\nBest regards,\nThe Loan Team',
    createdAt: getRandomDate(),
  },
  {
    id: '2',
    name: 'Approval Notification',
    subject: 'Your Loan Application Has Been Approved',
    body: 'Dear {{name}},\n\nWe are pleased to inform you that your loan application has been approved. The amount of {{amount}} will be disbursed to your account within 2-3 business days.\n\nBest regards,\nThe Loan Team',
    createdAt: getRandomDate(),
  },
  {
    id: '3',
    name: 'Rejection Notification',
    subject: 'Regarding Your Loan Application',
    body: 'Dear {{name}},\n\nWe regret to inform you that your loan application could not be approved at this time. Please contact our customer service for more details.\n\nBest regards,\nThe Loan Team',
    createdAt: getRandomDate(),
  },
  {
    id: '4',
    name: 'Document Request',
    subject: 'Additional Documents Required for Your Loan Application',
    body: 'Dear {{name}},\n\nTo proceed with your loan application, we require the following additional documents:\n\n1. {{document1}}\n2. {{document2}}\n\nPlease upload these documents to your account or reply to this email with the attachments.\n\nBest regards,\nThe Loan Team',
    createdAt: getRandomDate(),
  },
];

// Generate SMS templates
export const mockSmsTemplates: SmsTemplate[] = [
  {
    id: '1',
    name: 'Welcome SMS',
    content: 'Thank you for applying with us. Your application ID is {{applicationId}}. We will process it shortly.',
    createdAt: getRandomDate(),
  },
  {
    id: '2',
    name: 'Approval SMS',
    content: 'Congratulations! Your loan of Rs.{{amount}} has been approved. It will be disbursed within 2-3 business days.',
    createdAt: getRandomDate(),
  },
  {
    id: '3',
    name: 'Rejection SMS',
    content: 'We regret to inform you that your loan application could not be approved at this time. Please contact our customer service.',
    createdAt: getRandomDate(),
  },
  {
    id: '4',
    name: 'Document Request SMS',
    content: 'Please upload the required documents for your loan application. Login to your account for details.',
    createdAt: getRandomDate(),
  },
];

// Dashboard statistics
export const dashboardStats = {
  totalLeads: mockLeads.length,
  approvedLeads: mockLeads.filter(lead => lead.profile === 'Approved').length,
  pendingLeads: mockLeads.filter(lead => lead.profile === 'Pending').length,
  rejectedLeads: mockLeads.filter(lead => lead.profile === 'Rejected').length,
  totalPartners: mockPartners.length,
  activePartners: mockPartners.filter(partner => partner.status === 'Active').length,
  totalLenders: mockLenders.length,
  activeLenders: mockLenders.filter(lender => lender.status === 'Active').length,
  totalTeams: mockTeams.length,
  activeTeams: mockTeams.filter(team => team.status === 'Active').length,
  
  // Monthly lead counts for charts
  monthlyLeads: [
    { month: 'Jan', count: 45 },
    { month: 'Feb', count: 52 },
    { month: 'Mar', count: 38 },
    { month: 'Apr', count: 65 },
    { month: 'May', count: 73 },
    { month: 'Jun', count: 92 },
    { month: 'Jul', count: 84 },
    { month: 'Aug', count: 110 },
    { month: 'Sep', count: 125 },
    { month: 'Oct', count: 98 },
    { month: 'Nov', count: 87 },
    { month: 'Dec', count: 74 },
  ],
  
  // Loan type distribution for charts
  loanTypeDistribution: [
    { name: 'Personal', value: 35 },
    { name: 'Home', value: 25 },
    { name: 'Car', value: 20 },
    { name: 'Education', value: 15 },
    { name: 'Business', value: 5 },
  ],
  
  // Partner performance for leaderboard
  partnerPerformance: [
    { id: 'P101', name: 'Partner 1', leads: 120, conversions: 85, conversionRate: 70.8 },
    { id: 'P102', name: 'Partner 2', leads: 95, conversions: 62, conversionRate: 65.3 },
    { id: 'P103', name: 'Partner 3', leads: 78, conversions: 45, conversionRate: 57.7 },
    { id: 'P104', name: 'Partner 4', leads: 65, conversions: 32, conversionRate: 49.2 },
    { id: 'P105', name: 'Partner 5', leads: 52, conversions: 28, conversionRate: 53.8 },
  ],
};
