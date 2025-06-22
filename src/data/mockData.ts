
export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  avatar?: string;
  status: 'form_submitted' | 'proposal_sent' | 'contract_signed' | 'invoice_paid' | 'active' | 'inactive';
  projectType: string;
  budget: number;
  startDate: string;
  notes: string;
  createdAt: string;
  lastActivity: string;
}

export interface Proposal {
  id: string;
  clientId: string;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
  price: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: string;
  sentAt?: string;
  respondedAt?: string;
}

export interface Contract {
  id: string;
  clientId: string;
  proposalId: string;
  title: string;
  terms: string;
  paymentSchedule: string;
  status: 'draft' | 'sent' | 'viewed' | 'signed';
  createdAt: string;
  signedAt?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  contractId?: string;
  number: string;
  services: Array<{
    description: string;
    quantity: number;
    rate: number;
  }>;
  tax: number;
  total: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  createdAt: string;
  paidAt?: string;
}

export interface Payment {
  id: string;
  clientId: string;
  invoiceId: string;
  amount: number;
  method: 'card' | 'bank' | 'paypal';
  status: 'paid' | 'partial' | 'unpaid';
  date: string;
}

export interface ChatMessage {
  id: string;
  clientId: string;
  senderId: string;
  senderType: 'vendor' | 'client';
  message: string;
  timestamp: string;
  read: boolean;
}

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@techstartup.com',
    company: 'TechStartup Inc',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b566?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    projectType: 'Web Development',
    budget: 15000,
    startDate: '2024-02-01',
    notes: 'Looking for a complete e-commerce solution with custom features.',
    createdAt: '2024-01-15T10:00:00Z',
    lastActivity: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@designstudio.co',
    company: 'Design Studio Co',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'contract_signed',
    projectType: 'Mobile App',
    budget: 25000,
    startDate: '2024-03-01',
    notes: 'iOS and Android app for creative professionals.',
    createdAt: '2024-01-10T09:00:00Z',
    lastActivity: '2024-01-22T11:15:00Z'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@consultingfirm.com',
    company: 'Rodriguez Consulting',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'proposal_sent',
    projectType: 'Consulting',
    budget: 8000,
    startDate: '2024-02-15',
    notes: 'Business process optimization and digital transformation.',
    createdAt: '2024-01-18T16:20:00Z',
    lastActivity: '2024-01-21T09:45:00Z'
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david@retailchain.com',
    company: 'Retail Chain LLC',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'invoice_paid',
    projectType: 'E-commerce',
    budget: 12000,
    startDate: '2024-01-01',
    notes: 'Multi-store e-commerce platform with inventory management.',
    createdAt: '2024-01-05T12:00:00Z',
    lastActivity: '2024-01-25T15:20:00Z'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa@healthtech.org',
    company: 'HealthTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    status: 'form_submitted',
    projectType: 'Healthcare App',
    budget: 30000,
    startDate: '2024-04-01',
    notes: 'HIPAA-compliant patient management system.',
    createdAt: '2024-01-22T08:30:00Z',
    lastActivity: '2024-01-22T08:30:00Z'
  }
];

export const mockProposals: Proposal[] = [
  {
    id: '1',
    clientId: '1',
    title: 'E-commerce Platform Development',
    description: 'Complete e-commerce solution with custom features, payment integration, and admin dashboard.',
    deliverables: ['Custom e-commerce website', 'Payment gateway integration', 'Admin dashboard', 'Mobile responsive design', 'SEO optimization'],
    timeline: '8-10 weeks',
    price: 15000,
    status: 'approved',
    createdAt: '2024-01-16T10:00:00Z',
    sentAt: '2024-01-16T10:30:00Z',
    respondedAt: '2024-01-18T14:20:00Z'
  },
  {
    id: '2',
    clientId: '3',
    title: 'Business Process Optimization Consulting',
    description: 'Comprehensive analysis and optimization of business processes with digital transformation roadmap.',
    deliverables: ['Process analysis report', 'Optimization recommendations', 'Implementation roadmap', 'Staff training', '3-month support'],
    timeline: '4-6 weeks',
    price: 8000,
    status: 'sent',
    createdAt: '2024-01-19T09:00:00Z',
    sentAt: '2024-01-19T14:00:00Z'
  }
];

export const mockContracts: Contract[] = [
  {
    id: '1',
    clientId: '2',
    proposalId: '1',
    title: 'Mobile App Development Contract',
    terms: 'Development of iOS and Android application with 6 months post-launch support.',
    paymentSchedule: '50% upfront, 25% at milestone 1, 25% on completion',
    status: 'signed',
    createdAt: '2024-01-12T10:00:00Z',
    signedAt: '2024-01-14T16:30:00Z'
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    clientId: '4',
    number: 'INV-2024-001',
    services: [
      { description: 'E-commerce Platform Development', quantity: 1, rate: 12000 }
    ],
    tax: 960,
    total: 12960,
    dueDate: '2024-02-01',
    status: 'paid',
    createdAt: '2024-01-15T10:00:00Z',
    paidAt: '2024-01-28T14:20:00Z'
  },
  {
    id: '2',
    clientId: '2',
    contractId: '1',
    number: 'INV-2024-002',
    services: [
      { description: 'Mobile App Development - First Payment', quantity: 1, rate: 12500 }
    ],
    tax: 1000,
    total: 13500,
    dueDate: '2024-02-15',
    status: 'sent',
    createdAt: '2024-01-20T09:00:00Z'
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    clientId: '4',
    invoiceId: '1',
    amount: 12960,
    method: 'card',
    status: 'paid',
    date: '2024-01-28T14:20:00Z'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    clientId: '1',
    senderId: '1',
    senderType: 'vendor',
    message: 'Hi Sarah! Thanks for submitting the project form. I\'ve reviewed your requirements and I\'m excited to work on your e-commerce platform.',
    timestamp: '2024-01-16T09:00:00Z',
    read: true
  },
  {
    id: '2',
    clientId: '1',
    senderId: '1',
    senderType: 'client',
    message: 'Hi John! Thank you for the quick response. I\'m looking forward to seeing your proposal.',
    timestamp: '2024-01-16T09:15:00Z',
    read: true
  },
  {
    id: '3',
    clientId: '1',
    senderId: '1',
    senderType: 'vendor',
    message: 'I\'ve just sent over the proposal. Please take a look and let me know if you have any questions!',
    timestamp: '2024-01-16T10:30:00Z',
    read: true
  },
  {
    id: '4',
    clientId: '2',
    senderId: '2',
    senderType: 'client',
    message: 'The contract looks good. I\'ve signed it and we\'re ready to start!',
    timestamp: '2024-01-14T16:30:00Z',
    read: true
  },
  {
    id: '5',
    clientId: '2',
    senderId: '1',
    senderType: 'vendor',
    message: 'Perfect! I\'ll start working on the initial mockups and will have them ready by Friday.',
    timestamp: '2024-01-14T17:00:00Z',
    read: true
  }
];
