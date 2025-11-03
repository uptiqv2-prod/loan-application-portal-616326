export enum LoanType {
    PERSONAL = 'personal',
    HOME = 'home',
    AUTO = 'auto',
    BUSINESS = 'business',
    STUDENT = 'student'
}

export enum ApplicationStatus {
    DRAFT = 'draft',
    SUBMITTED = 'submitted',
    UNDER_REVIEW = 'under_review',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    COMPLETED = 'completed'
}

export enum DocumentType {
    ID_VERIFICATION = 'id_verification',
    INCOME_VERIFICATION = 'income_verification',
    EMPLOYMENT_VERIFICATION = 'employment_verification',
    BANK_STATEMENTS = 'bank_statements',
    TAX_RETURNS = 'tax_returns',
    OTHER = 'other'
}

export enum EmploymentType {
    FULL_TIME = 'full_time',
    PART_TIME = 'part_time',
    CONTRACT = 'contract',
    SELF_EMPLOYED = 'self_employed',
    UNEMPLOYED = 'unemployed',
    RETIRED = 'retired',
    STUDENT = 'student'
}

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    ssn: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
};

export type EmploymentInfo = {
    employmentType: EmploymentType;
    employerName?: string;
    jobTitle?: string;
    workAddress?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    };
    employmentStartDate?: string;
    monthlyIncome: number;
    additionalIncome?: number;
    additionalIncomeSource?: string;
};

export type LoanDetails = {
    loanType: LoanType;
    requestedAmount: number;
    loanPurpose: string;
    preferredTerm: number; // in months
};

export type Document = {
    id: string;
    name: string;
    type: DocumentType;
    size: number;
    uploadedAt: string;
    url?: string;
    verified: boolean;
};

export type ApplicationData = {
    personalInfo: PersonalInfo;
    employmentInfo: EmploymentInfo;
    loanDetails: LoanDetails;
    documents: Document[];
};

export type LoanApplication = {
    id: string;
    userId: string;
    status: ApplicationStatus;
    data: ApplicationData;
    createdAt: string;
    updatedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    notes?: string;
};

export type CreateApplicationInput = {
    data: ApplicationData;
};

export type UpdateApplicationInput = {
    data?: Partial<ApplicationData>;
    status?: ApplicationStatus;
};

export type LoanProduct = {
    id: string;
    type: LoanType;
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    minTerm: number; // in months
    maxTerm: number; // in months
    interestRate: {
        min: number;
        max: number;
    };
    requirements: string[];
    features: string[];
    isActive: boolean;
};

export type UploadDocumentResponse = {
    document: Document;
    uploadUrl?: string; // Pre-signed URL for uploading
};

export type ApplicationSummary = {
    totalApplications: number;
    pendingApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
};
