import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { LoanApplication, LoanProduct, ApplicationSummary } from '@/types/application';
import { LoanType, ApplicationStatus, EmploymentType, DocumentType } from '@/types/application';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

export const mockApplications: LoanApplication[] = [
    {
        id: 'app_001',
        userId: '1',
        status: ApplicationStatus.UNDER_REVIEW,
        data: {
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '(555) 123-4567',
                dateOfBirth: '1990-01-15',
                ssn: '***-**-1234',
                address: {
                    street: '123 Main Street',
                    city: 'Anytown',
                    state: 'CA',
                    zipCode: '12345'
                }
            },
            employmentInfo: {
                employmentType: EmploymentType.FULL_TIME,
                employerName: 'Tech Corp Inc.',
                jobTitle: 'Software Engineer',
                workAddress: {
                    street: '456 Business Ave',
                    city: 'Business City',
                    state: 'CA',
                    zipCode: '54321'
                },
                employmentStartDate: '2020-03-01',
                monthlyIncome: 8500,
                additionalIncome: 1000,
                additionalIncomeSource: 'Freelance consulting'
            },
            loanDetails: {
                loanType: LoanType.PERSONAL,
                requestedAmount: 25000,
                loanPurpose: 'Debt consolidation',
                preferredTerm: 36
            },
            documents: [
                {
                    id: 'doc_001',
                    name: 'drivers_license.pdf',
                    type: DocumentType.ID_VERIFICATION,
                    size: 245760,
                    uploadedAt: '2024-01-15T10:30:00Z',
                    verified: true
                },
                {
                    id: 'doc_002',
                    name: 'pay_stub.pdf',
                    type: DocumentType.INCOME_VERIFICATION,
                    size: 189432,
                    uploadedAt: '2024-01-15T10:35:00Z',
                    verified: false
                }
            ]
        },
        createdAt: '2024-01-15T09:00:00Z',
        updatedAt: '2024-01-16T14:22:00Z'
    },
    {
        id: 'app_002',
        userId: '1',
        status: ApplicationStatus.APPROVED,
        data: {
            personalInfo: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '(555) 123-4567',
                dateOfBirth: '1990-01-15',
                ssn: '***-**-1234',
                address: {
                    street: '123 Main Street',
                    city: 'Anytown',
                    state: 'CA',
                    zipCode: '12345'
                }
            },
            employmentInfo: {
                employmentType: EmploymentType.FULL_TIME,
                employerName: 'Tech Corp Inc.',
                jobTitle: 'Software Engineer',
                workAddress: {
                    street: '456 Business Ave',
                    city: 'Business City',
                    state: 'CA',
                    zipCode: '54321'
                },
                employmentStartDate: '2020-03-01',
                monthlyIncome: 8500
            },
            loanDetails: {
                loanType: LoanType.AUTO,
                requestedAmount: 35000,
                loanPurpose: 'Vehicle purchase',
                preferredTerm: 60
            },
            documents: [
                {
                    id: 'doc_003',
                    name: 'drivers_license.pdf',
                    type: DocumentType.ID_VERIFICATION,
                    size: 245760,
                    uploadedAt: '2023-12-01T10:30:00Z',
                    verified: true
                }
            ]
        },
        createdAt: '2023-12-01T09:00:00Z',
        updatedAt: '2023-12-05T16:45:00Z',
        reviewedAt: '2023-12-05T16:45:00Z',
        reviewedBy: 'Jane Smith'
    }
];

export const mockLoanProducts: LoanProduct[] = [
    {
        id: 'prod_personal',
        type: LoanType.PERSONAL,
        name: 'Personal Loan',
        description: 'Unsecured personal loans for debt consolidation, home improvements, or major purchases.',
        minAmount: 1000,
        maxAmount: 50000,
        minTerm: 12,
        maxTerm: 84,
        interestRate: {
            min: 6.99,
            max: 24.99
        },
        requirements: [
            'Minimum credit score of 600',
            'Steady income for at least 6 months',
            'Debt-to-income ratio below 40%'
        ],
        features: [
            'No collateral required',
            'Fixed interest rates',
            'Flexible repayment terms',
            'Quick approval process'
        ],
        isActive: true
    },
    {
        id: 'prod_home',
        type: LoanType.HOME,
        name: 'Home Mortgage',
        description: 'Competitive home loans for purchasing or refinancing your primary residence.',
        minAmount: 50000,
        maxAmount: 2000000,
        minTerm: 120,
        maxTerm: 360,
        interestRate: {
            min: 3.25,
            max: 7.5
        },
        requirements: [
            'Down payment of at least 5%',
            'Minimum credit score of 620',
            'Stable employment history',
            'Property appraisal required'
        ],
        features: [
            'Competitive interest rates',
            'Various loan programs available',
            'Local processing and servicing',
            'First-time buyer programs'
        ],
        isActive: true
    },
    {
        id: 'prod_auto',
        type: LoanType.AUTO,
        name: 'Auto Loan',
        description: 'Financing for new and used vehicles with competitive rates and flexible terms.',
        minAmount: 5000,
        maxAmount: 100000,
        minTerm: 24,
        maxTerm: 84,
        interestRate: {
            min: 2.99,
            max: 18.99
        },
        requirements: [
            "Valid driver's license",
            'Proof of income',
            'Insurance on the vehicle',
            'Vehicle details and VIN'
        ],
        features: [
            'New and used vehicle financing',
            'Pre-approval available',
            'Gap insurance options',
            'No prepayment penalties'
        ],
        isActive: true
    },
    {
        id: 'prod_business',
        type: LoanType.BUSINESS,
        name: 'Business Loan',
        description: 'Working capital and equipment financing for small and medium businesses.',
        minAmount: 10000,
        maxAmount: 500000,
        minTerm: 12,
        maxTerm: 120,
        interestRate: {
            min: 5.99,
            max: 29.99
        },
        requirements: [
            'Business operating for at least 1 year',
            'Annual revenue of $50,000+',
            'Good business and personal credit',
            'Financial statements required'
        ],
        features: [
            'Working capital financing',
            'Equipment purchase loans',
            'Line of credit options',
            'SBA loan programs'
        ],
        isActive: true
    }
];

export const mockApplicationSummary: ApplicationSummary = {
    totalApplications: 2,
    pendingApplications: 1,
    approvedApplications: 1,
    rejectedApplications: 0
};
