import { ApplicationData, LoanType, EmploymentType, DocumentType } from '@/types/application';
import { formatCurrency, formatLoanTerm, formatPhoneNumber, formatSSN, formatDateTime } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, Briefcase, DollarSign, FileText, Edit } from 'lucide-react';

type ReviewStepProps = {
    data: ApplicationData;
    onSubmit: () => void;
    onEdit: (step: number) => void;
    onBack?: () => void;
    isLoading?: boolean;
};

const getLoanTypeLabel = (type: LoanType) => {
    const labels = {
        [LoanType.PERSONAL]: 'Personal Loan',
        [LoanType.HOME]: 'Home Mortgage',
        [LoanType.AUTO]: 'Auto Loan',
        [LoanType.BUSINESS]: 'Business Loan',
        [LoanType.STUDENT]: 'Student Loan'
    };
    return labels[type];
};

const getEmploymentTypeLabel = (type: EmploymentType) => {
    const labels = {
        [EmploymentType.FULL_TIME]: 'Full-time',
        [EmploymentType.PART_TIME]: 'Part-time',
        [EmploymentType.CONTRACT]: 'Contract',
        [EmploymentType.SELF_EMPLOYED]: 'Self-employed',
        [EmploymentType.UNEMPLOYED]: 'Unemployed',
        [EmploymentType.RETIRED]: 'Retired',
        [EmploymentType.STUDENT]: 'Student'
    };
    return labels[type];
};

const getDocumentTypeLabel = (type: DocumentType) => {
    const labels = {
        [DocumentType.ID_VERIFICATION]: 'ID Verification',
        [DocumentType.INCOME_VERIFICATION]: 'Income Verification',
        [DocumentType.EMPLOYMENT_VERIFICATION]: 'Employment Verification',
        [DocumentType.BANK_STATEMENTS]: 'Bank Statements',
        [DocumentType.TAX_RETURNS]: 'Tax Returns',
        [DocumentType.OTHER]: 'Other'
    };
    return labels[type];
};

export const ReviewStep = ({ data, onSubmit, onEdit, onBack, isLoading = false }: ReviewStepProps) => {
    const { personalInfo, employmentInfo, loanDetails, documents } = data;

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle>Review Your Application</CardTitle>
                <p className='text-muted-foreground'>
                    Please review all information carefully before submitting your loan application.
                </p>
            </CardHeader>
            <CardContent className='space-y-6'>
                {/* Personal Information */}
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <User className='h-5 w-5 text-primary' />
                            <h3 className='text-lg font-medium'>Personal Information</h3>
                        </div>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => onEdit(0)}
                            disabled={isLoading}
                        >
                            <Edit className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                        <div>
                            <span className='font-medium'>Name:</span>
                            <p>
                                {personalInfo.firstName} {personalInfo.lastName}
                            </p>
                        </div>
                        <div>
                            <span className='font-medium'>Email:</span>
                            <p>{personalInfo.email}</p>
                        </div>
                        <div>
                            <span className='font-medium'>Phone:</span>
                            <p>{formatPhoneNumber(personalInfo.phone)}</p>
                        </div>
                        <div>
                            <span className='font-medium'>Date of Birth:</span>
                            <p>{new Date(personalInfo.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <span className='font-medium'>SSN:</span>
                            <p>{formatSSN(personalInfo.ssn, true)}</p>
                        </div>
                        <div>
                            <span className='font-medium'>Address:</span>
                            <p>
                                {personalInfo.address.street}
                                <br />
                                {personalInfo.address.city}, {personalInfo.address.state} {personalInfo.address.zipCode}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Employment Information */}
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Briefcase className='h-5 w-5 text-primary' />
                            <h3 className='text-lg font-medium'>Employment Information</h3>
                        </div>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => onEdit(1)}
                            disabled={isLoading}
                        >
                            <Edit className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                        <div>
                            <span className='font-medium'>Employment Type:</span>
                            <p>{getEmploymentTypeLabel(employmentInfo.employmentType)}</p>
                        </div>
                        {employmentInfo.employerName && (
                            <div>
                                <span className='font-medium'>Employer:</span>
                                <p>{employmentInfo.employerName}</p>
                            </div>
                        )}
                        {employmentInfo.jobTitle && (
                            <div>
                                <span className='font-medium'>Job Title:</span>
                                <p>{employmentInfo.jobTitle}</p>
                            </div>
                        )}
                        {employmentInfo.employmentStartDate && (
                            <div>
                                <span className='font-medium'>Employment Start Date:</span>
                                <p>{new Date(employmentInfo.employmentStartDate).toLocaleDateString()}</p>
                            </div>
                        )}
                        <div>
                            <span className='font-medium'>Monthly Income:</span>
                            <p>{formatCurrency(employmentInfo.monthlyIncome)}</p>
                        </div>
                        {employmentInfo.additionalIncome && (
                            <div>
                                <span className='font-medium'>Additional Income:</span>
                                <p>
                                    {formatCurrency(employmentInfo.additionalIncome)}
                                    {employmentInfo.additionalIncomeSource && (
                                        <span className='text-muted-foreground'>
                                            {' '}
                                            ({employmentInfo.additionalIncomeSource})
                                        </span>
                                    )}
                                </p>
                            </div>
                        )}
                        {employmentInfo.workAddress && (
                            <div className='md:col-span-2'>
                                <span className='font-medium'>Work Address:</span>
                                <p>
                                    {employmentInfo.workAddress.street}
                                    <br />
                                    {employmentInfo.workAddress.city}, {employmentInfo.workAddress.state}{' '}
                                    {employmentInfo.workAddress.zipCode}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <Separator />

                {/* Loan Details */}
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <DollarSign className='h-5 w-5 text-primary' />
                            <h3 className='text-lg font-medium'>Loan Details</h3>
                        </div>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => onEdit(2)}
                            disabled={isLoading}
                        >
                            <Edit className='h-4 w-4' />
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                        <div>
                            <span className='font-medium'>Loan Type:</span>
                            <p>{getLoanTypeLabel(loanDetails.loanType)}</p>
                        </div>
                        <div>
                            <span className='font-medium'>Requested Amount:</span>
                            <p className='text-lg font-semibold text-primary'>
                                {formatCurrency(loanDetails.requestedAmount)}
                            </p>
                        </div>
                        <div>
                            <span className='font-medium'>Preferred Term:</span>
                            <p>{formatLoanTerm(loanDetails.preferredTerm)}</p>
                        </div>
                        <div className='md:col-span-2'>
                            <span className='font-medium'>Loan Purpose:</span>
                            <p className='mt-1'>{loanDetails.loanPurpose}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Documents */}
                <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <FileText className='h-5 w-5 text-primary' />
                            <h3 className='text-lg font-medium'>Documents</h3>
                        </div>
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => onEdit(3)}
                            disabled={isLoading}
                        >
                            <Edit className='h-4 w-4' />
                        </Button>
                    </div>

                    {documents.length > 0 ? (
                        <div className='space-y-2'>
                            {documents.map(document => (
                                <div
                                    key={document.id}
                                    className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'
                                >
                                    <div className='flex items-center gap-3'>
                                        <CheckCircle className='h-4 w-4 text-green-600' />
                                        <div>
                                            <p className='font-medium'>{document.name}</p>
                                            <div className='flex items-center gap-2'>
                                                <Badge
                                                    variant='secondary'
                                                    className='text-xs'
                                                >
                                                    {getDocumentTypeLabel(document.type)}
                                                </Badge>
                                                <span className='text-xs text-muted-foreground'>
                                                    Uploaded {formatDateTime(document.uploadedAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant={document.verified ? 'default' : 'secondary'}>
                                        {document.verified ? 'Verified' : 'Pending'}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-muted-foreground'>No documents uploaded</p>
                    )}
                </div>

                {/* Summary Box */}
                <div className='bg-primary/5 border border-primary/20 p-4 rounded-lg'>
                    <h4 className='font-medium text-primary mb-2'>Application Summary</h4>
                    <p className='text-sm text-muted-foreground mb-4'>
                        You are requesting a {getLoanTypeLabel(loanDetails.loanType).toLowerCase()}
                        of {formatCurrency(loanDetails.requestedAmount)} for {formatLoanTerm(loanDetails.preferredTerm)}
                        . You have uploaded {documents.length} supporting document{documents.length !== 1 ? 's' : ''}.
                    </p>
                    <p className='text-sm text-muted-foreground'>
                        By submitting this application, you authorize us to review your credit report and verify the
                        information provided. We'll contact you within 1-2 business days with an initial decision.
                    </p>
                </div>

                {/* Form Actions */}
                <div className='flex gap-4 pt-6'>
                    {onBack && (
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onBack}
                            disabled={isLoading}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={onSubmit}
                        className='flex-1'
                        disabled={isLoading}
                        size='lg'
                    >
                        {isLoading ? 'Submitting Application...' : 'Submit Application'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
