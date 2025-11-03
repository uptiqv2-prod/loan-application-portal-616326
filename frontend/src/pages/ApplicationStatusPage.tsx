import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { applicationService } from '@/services/applicationService';
import { formatCurrency, formatLoanTerm, formatDateTime } from '@/utils/formatters';
import { ApplicationStatus, DocumentType, LoanType } from '@/types/application';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import {
    CheckCircle,
    Clock,
    XCircle,
    AlertTriangle,
    FileText,
    Mail,
    Phone,
    MessageSquare,
    ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusColor = (status: ApplicationStatus) => {
    const colors = {
        [ApplicationStatus.DRAFT]: 'bg-gray-100 text-gray-800',
        [ApplicationStatus.SUBMITTED]: 'bg-blue-100 text-blue-800',
        [ApplicationStatus.UNDER_REVIEW]: 'bg-yellow-100 text-yellow-800',
        [ApplicationStatus.APPROVED]: 'bg-green-100 text-green-800',
        [ApplicationStatus.REJECTED]: 'bg-red-100 text-red-800',
        [ApplicationStatus.COMPLETED]: 'bg-green-100 text-green-800'
    };
    return colors[status];
};

const getStatusIcon = (status: ApplicationStatus) => {
    const icons = {
        [ApplicationStatus.DRAFT]: <Clock className='h-4 w-4' />,
        [ApplicationStatus.SUBMITTED]: <Clock className='h-4 w-4' />,
        [ApplicationStatus.UNDER_REVIEW]: <Clock className='h-4 w-4' />,
        [ApplicationStatus.APPROVED]: <CheckCircle className='h-4 w-4' />,
        [ApplicationStatus.REJECTED]: <XCircle className='h-4 w-4' />,
        [ApplicationStatus.COMPLETED]: <CheckCircle className='h-4 w-4' />
    };
    return icons[status];
};

const getStatusProgress = (status: ApplicationStatus) => {
    const progress = {
        [ApplicationStatus.DRAFT]: 10,
        [ApplicationStatus.SUBMITTED]: 25,
        [ApplicationStatus.UNDER_REVIEW]: 50,
        [ApplicationStatus.APPROVED]: 85,
        [ApplicationStatus.REJECTED]: 100,
        [ApplicationStatus.COMPLETED]: 100
    };
    return progress[status];
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

export const ApplicationStatusPage = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: application,
        isLoading,
        error
    } = useQuery({
        queryKey: ['application', id],
        queryFn: () => applicationService.getApplication(id!),
        enabled: !!id
    });

    if (isLoading) {
        return (
            <div className='min-h-screen bg-background'>
                <Header />
                <div className='container mx-auto px-4 py-8'>
                    <div className='max-w-4xl mx-auto space-y-6'>
                        <Skeleton className='h-8 w-64' />
                        <Card>
                            <CardHeader>
                                <Skeleton className='h-6 w-48' />
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                <Skeleton className='h-4 w-full' />
                                <Skeleton className='h-4 w-3/4' />
                                <Skeleton className='h-4 w-1/2' />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className='min-h-screen bg-background'>
                <Header />
                <div className='container mx-auto px-4 py-8'>
                    <div className='max-w-4xl mx-auto'>
                        <Alert variant='destructive'>
                            <AlertTriangle className='h-4 w-4' />
                            <AlertDescription>
                                Unable to load application. Please check the application ID and try again.
                            </AlertDescription>
                        </Alert>
                        <div className='mt-4'>
                            <Button asChild>
                                <Link to='/dashboard'>
                                    <ArrowLeft className='h-4 w-4 mr-2' />
                                    Back to Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { data: appData, status, createdAt, updatedAt, reviewedAt, reviewedBy, notes } = application;
    const statusProgress = getStatusProgress(status);

    return (
        <div className='min-h-screen bg-background'>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-4xl mx-auto space-y-6'>
                    {/* Header */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <div className='flex items-center gap-2 mb-2'>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    asChild
                                >
                                    <Link to='/dashboard'>
                                        <ArrowLeft className='h-4 w-4 mr-2' />
                                        Back
                                    </Link>
                                </Button>
                            </div>
                            <h1 className='text-2xl font-bold'>Application Status</h1>
                            <p className='text-muted-foreground'>Application ID: {id}</p>
                        </div>
                        <Badge className={getStatusColor(status)}>
                            {getStatusIcon(status)}
                            <span className='ml-1'>{status.replace('_', ' ').toUpperCase()}</span>
                        </Badge>
                    </div>

                    {/* Status Progress */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Application Progress</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center justify-between text-sm'>
                                <span>Progress</span>
                                <span>{statusProgress}%</span>
                            </div>
                            <Progress
                                value={statusProgress}
                                className='h-2'
                            />

                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                                <div>
                                    <span className='font-medium'>Submitted:</span>
                                    <p>{formatDateTime(createdAt)}</p>
                                </div>
                                <div>
                                    <span className='font-medium'>Last Updated:</span>
                                    <p>{formatDateTime(updatedAt)}</p>
                                </div>
                                {reviewedAt && (
                                    <div>
                                        <span className='font-medium'>Reviewed:</span>
                                        <p>{formatDateTime(reviewedAt)}</p>
                                        {reviewedBy && <p className='text-muted-foreground'>by {reviewedBy}</p>}
                                    </div>
                                )}
                            </div>

                            {notes && (
                                <Alert>
                                    <MessageSquare className='h-4 w-4' />
                                    <AlertDescription>{notes}</AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Loan Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Loan Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='text-center p-4 bg-primary/5 rounded-lg'>
                                    <p className='text-sm text-muted-foreground'>Loan Type</p>
                                    <p className='text-lg font-semibold'>
                                        {getLoanTypeLabel(appData.loanDetails.loanType)}
                                    </p>
                                </div>
                                <div className='text-center p-4 bg-primary/5 rounded-lg'>
                                    <p className='text-sm text-muted-foreground'>Requested Amount</p>
                                    <p className='text-lg font-semibold text-primary'>
                                        {formatCurrency(appData.loanDetails.requestedAmount)}
                                    </p>
                                </div>
                                <div className='text-center p-4 bg-primary/5 rounded-lg'>
                                    <p className='text-sm text-muted-foreground'>Term</p>
                                    <p className='text-lg font-semibold'>
                                        {formatLoanTerm(appData.loanDetails.preferredTerm)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Document Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {appData.documents.length > 0 ? (
                                <div className='space-y-3'>
                                    {appData.documents.map(document => (
                                        <div
                                            key={document.id}
                                            className='flex items-center justify-between p-3 bg-muted/50 rounded-lg'
                                        >
                                            <div className='flex items-center gap-3'>
                                                <FileText className='h-4 w-4 text-muted-foreground' />
                                                <div>
                                                    <p className='font-medium'>{document.name}</p>
                                                    <p className='text-sm text-muted-foreground'>
                                                        {getDocumentTypeLabel(document.type)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant={document.verified ? 'default' : 'secondary'}>
                                                {document.verified ? (
                                                    <>
                                                        <CheckCircle className='h-3 w-3 mr-1' />
                                                        Verified
                                                    </>
                                                ) : (
                                                    <>
                                                        <Clock className='h-3 w-3 mr-1' />
                                                        Pending
                                                    </>
                                                )}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-muted-foreground'>No documents uploaded</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Next Steps */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Next Steps</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {status === ApplicationStatus.SUBMITTED && (
                                <Alert>
                                    <Clock className='h-4 w-4' />
                                    <AlertDescription>
                                        Your application has been submitted and is in our queue for review. We'll
                                        contact you within 1-2 business days with an initial decision.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {status === ApplicationStatus.UNDER_REVIEW && (
                                <Alert>
                                    <Clock className='h-4 w-4' />
                                    <AlertDescription>
                                        Your application is currently under review by our lending team. We may contact
                                        you if additional information is needed.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {status === ApplicationStatus.APPROVED && (
                                <Alert className='border-green-200 bg-green-50'>
                                    <CheckCircle className='h-4 w-4 text-green-600' />
                                    <AlertDescription>
                                        Congratulations! Your loan application has been approved. You'll receive final
                                        loan documents via email within 24 hours.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {status === ApplicationStatus.REJECTED && (
                                <Alert variant='destructive'>
                                    <XCircle className='h-4 w-4' />
                                    <AlertDescription>
                                        Unfortunately, we're unable to approve your loan application at this time.
                                        You'll receive a detailed explanation via email.
                                    </AlertDescription>
                                </Alert>
                            )}

                            {status === ApplicationStatus.COMPLETED && (
                                <Alert className='border-green-200 bg-green-50'>
                                    <CheckCircle className='h-4 w-4 text-green-600' />
                                    <AlertDescription>
                                        Your loan has been funded and is now complete. Thank you for choosing us!
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardContent>
                    </Card>

                    {/* Contact Support */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Need Help?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground mb-4'>
                                If you have questions about your application, our support team is here to help.
                            </p>
                            <div className='flex gap-4'>
                                <Button variant='outline'>
                                    <Mail className='h-4 w-4 mr-2' />
                                    Email Support
                                </Button>
                                <Button variant='outline'>
                                    <Phone className='h-4 w-4 mr-2' />
                                    Call (555) 123-4567
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
