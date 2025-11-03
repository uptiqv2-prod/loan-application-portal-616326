import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { applicationService } from '@/services/applicationService';
import { formatCurrency, formatDateTime } from '@/utils/formatters';
import { ApplicationStatus, LoanType } from '@/types/application';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, FileText, Clock, CheckCircle, XCircle, TrendingUp, Eye, AlertTriangle } from 'lucide-react';

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

export const DashboardPage = () => {
    const {
        data: applications,
        isLoading: applicationsLoading,
        error: applicationsError
    } = useQuery({
        queryKey: ['applications'],
        queryFn: () => applicationService.getApplications(1, 10)
    });

    const { data: summary, isLoading: summaryLoading } = useQuery({
        queryKey: ['applicationSummary'],
        queryFn: applicationService.getApplicationSummary
    });

    const recentApplications = applications?.results || [];

    if (applicationsError) {
        return (
            <div className='min-h-screen bg-background'>
                <Header />
                <div className='container mx-auto px-4 py-8'>
                    <Alert variant='destructive'>
                        <AlertTriangle className='h-4 w-4' />
                        <AlertDescription>Unable to load your applications. Please try again later.</AlertDescription>
                    </Alert>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-background'>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-6xl mx-auto space-y-6'>
                    {/* Welcome Header */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <h1 className='text-3xl font-bold'>Welcome back!</h1>
                            <p className='text-muted-foreground'>Manage your loan applications and account</p>
                        </div>
                        <Button
                            asChild
                            size='lg'
                        >
                            <Link to='/apply'>
                                <Plus className='h-4 w-4 mr-2' />
                                New Application
                            </Link>
                        </Button>
                    </div>

                    {/* Summary Stats */}
                    <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                        {summaryLoading ? (
                            Array(4)
                                .fill(0)
                                .map((_, i) => (
                                    <Card key={i}>
                                        <CardContent className='p-6'>
                                            <Skeleton className='h-4 w-20 mb-2' />
                                            <Skeleton className='h-8 w-12' />
                                        </CardContent>
                                    </Card>
                                ))
                        ) : summary ? (
                            <>
                                <Card>
                                    <CardContent className='p-6'>
                                        <div className='flex items-center gap-2'>
                                            <FileText className='h-4 w-4 text-muted-foreground' />
                                            <span className='text-sm font-medium text-muted-foreground'>
                                                Total Applications
                                            </span>
                                        </div>
                                        <p className='text-2xl font-bold'>{summary.totalApplications}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className='p-6'>
                                        <div className='flex items-center gap-2'>
                                            <Clock className='h-4 w-4 text-yellow-600' />
                                            <span className='text-sm font-medium text-muted-foreground'>Pending</span>
                                        </div>
                                        <p className='text-2xl font-bold text-yellow-600'>
                                            {summary.pendingApplications}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className='p-6'>
                                        <div className='flex items-center gap-2'>
                                            <CheckCircle className='h-4 w-4 text-green-600' />
                                            <span className='text-sm font-medium text-muted-foreground'>Approved</span>
                                        </div>
                                        <p className='text-2xl font-bold text-green-600'>
                                            {summary.approvedApplications}
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className='p-6'>
                                        <div className='flex items-center gap-2'>
                                            <TrendingUp className='h-4 w-4 text-primary' />
                                            <span className='text-sm font-medium text-muted-foreground'>
                                                Success Rate
                                            </span>
                                        </div>
                                        <p className='text-2xl font-bold text-primary'>
                                            {summary.totalApplications > 0
                                                ? Math.round(
                                                      (summary.approvedApplications / summary.totalApplications) * 100
                                                  )
                                                : 0}
                                            %
                                        </p>
                                    </CardContent>
                                </Card>
                            </>
                        ) : null}
                    </div>

                    {/* Recent Applications */}
                    <Card>
                        <CardHeader>
                            <div className='flex items-center justify-between'>
                                <CardTitle>Recent Applications</CardTitle>
                                {recentApplications.length > 0 && (
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        asChild
                                    >
                                        <Link to='/applications'>View All</Link>
                                    </Button>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            {applicationsLoading ? (
                                <div className='space-y-4'>
                                    {Array(3)
                                        .fill(0)
                                        .map((_, i) => (
                                            <div
                                                key={i}
                                                className='flex items-center justify-between p-4 border rounded-lg'
                                            >
                                                <div className='space-y-2'>
                                                    <Skeleton className='h-4 w-32' />
                                                    <Skeleton className='h-3 w-24' />
                                                </div>
                                                <Skeleton className='h-8 w-20' />
                                            </div>
                                        ))}
                                </div>
                            ) : recentApplications.length > 0 ? (
                                <div className='space-y-4'>
                                    {recentApplications.map(application => (
                                        <div
                                            key={application.id}
                                            className='flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors'
                                        >
                                            <div className='flex-1'>
                                                <div className='flex items-center gap-3 mb-2'>
                                                    <h3 className='font-medium'>
                                                        {getLoanTypeLabel(application.data.loanDetails.loanType)}
                                                    </h3>
                                                    <Badge className={getStatusColor(application.status)}>
                                                        {getStatusIcon(application.status)}
                                                        <span className='ml-1'>
                                                            {application.status.replace('_', ' ').toUpperCase()}
                                                        </span>
                                                    </Badge>
                                                </div>
                                                <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                                    <span>
                                                        {formatCurrency(application.data.loanDetails.requestedAmount)}
                                                    </span>
                                                    <span>Applied {formatDateTime(application.createdAt)}</span>
                                                </div>
                                            </div>
                                            <Button
                                                variant='ghost'
                                                size='sm'
                                                asChild
                                            >
                                                <Link to={`/status/${application.id}`}>
                                                    <Eye className='h-4 w-4 mr-2' />
                                                    View
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-8'>
                                    <FileText className='h-12 w-12 text-muted-foreground mx-auto mb-4' />
                                    <h3 className='text-lg font-medium mb-2'>No Applications Yet</h3>
                                    <p className='text-muted-foreground mb-4'>
                                        Get started by submitting your first loan application.
                                    </p>
                                    <Button asChild>
                                        <Link to='/apply'>
                                            <Plus className='h-4 w-4 mr-2' />
                                            Apply for a Loan
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        <Link
                            to='/apply'
                            className='block'
                        >
                            <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                                <CardContent className='p-6 text-center'>
                                    <Plus className='h-8 w-8 text-primary mx-auto mb-3' />
                                    <h3 className='font-medium mb-1'>New Application</h3>
                                    <p className='text-sm text-muted-foreground'>Start a new loan application</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link
                            to='/dashboard'
                            className='block'
                        >
                            <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                                <CardContent className='p-6 text-center'>
                                    <FileText className='h-8 w-8 text-primary mx-auto mb-3' />
                                    <h3 className='font-medium mb-1'>My Applications</h3>
                                    <p className='text-sm text-muted-foreground'>View all your applications</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link
                            to='/dashboard'
                            className='block'
                        >
                            <Card className='hover:shadow-lg transition-shadow cursor-pointer'>
                                <CardContent className='p-6 text-center'>
                                    <CheckCircle className='h-8 w-8 text-primary mx-auto mb-3' />
                                    <h3 className='font-medium mb-1'>Account Settings</h3>
                                    <p className='text-sm text-muted-foreground'>Manage your profile</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
