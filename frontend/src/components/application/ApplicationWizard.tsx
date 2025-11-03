import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ApplicationData, PersonalInfo, EmploymentInfo, LoanDetails, Document } from '@/types/application';
import { PersonalInfoFormData, EmploymentInfoFormData, LoanDetailsFormData } from '@/utils/validationSchemas';
import { applicationService } from '@/services/applicationService';
import {
    saveApplicationDraft,
    getApplicationDraft,
    saveCurrentStep,
    getCurrentStep,
    clearApplicationData
} from '@/utils/storage';
import { ProgressIndicator } from './ProgressIndicator';
import { PersonalInfoStep } from './PersonalInfoStep';
import { EmploymentInfoStep } from './EmploymentInfoStep';
import { LoanDetailsStep } from './LoanDetailsStep';
import { DocumentUploadStep } from './DocumentUploadStep';
import { ReviewStep } from './ReviewStep';

const STEPS = [
    {
        id: 1,
        title: 'Personal Info',
        description: 'Basic information'
    },
    {
        id: 2,
        title: 'Employment',
        description: 'Employment details'
    },
    {
        id: 3,
        title: 'Loan Details',
        description: 'Loan preferences'
    },
    {
        id: 4,
        title: 'Documents',
        description: 'Upload documents'
    },
    {
        id: 5,
        title: 'Review',
        description: 'Review & submit'
    }
];

export const ApplicationWizard = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(() => getCurrentStep() || 0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [applicationData, setApplicationData] = useState<Partial<ApplicationData>>(
        () => getApplicationDraft<Partial<ApplicationData>>() || {}
    );

    // Save draft whenever application data changes
    useEffect(() => {
        if (Object.keys(applicationData).length > 0) {
            saveApplicationDraft(applicationData);
        }
    }, [applicationData]);

    // Save current step
    useEffect(() => {
        saveCurrentStep(currentStep);
    }, [currentStep]);

    const submitMutation = useMutation({
        mutationFn: (data: ApplicationData) => applicationService.createApplication({ data }),
        onSuccess: application => {
            toast.success('Application submitted successfully!');
            clearApplicationData();
            navigate(`/status/${application.id}`);
        },
        onError: error => {
            toast.error('Failed to submit application. Please try again.');
            console.error('Application submission error:', error);
        }
    });

    const handlePersonalInfoSubmit = (data: PersonalInfoFormData) => {
        setApplicationData(prev => ({ ...prev, personalInfo: data as PersonalInfo }));
        setCompletedSteps(prev => [...prev.filter(s => s !== STEPS[0].id), STEPS[0].id]);
        setCurrentStep(1);
    };

    const handleEmploymentInfoSubmit = (data: EmploymentInfoFormData) => {
        setApplicationData(prev => ({ ...prev, employmentInfo: data as EmploymentInfo }));
        setCompletedSteps(prev => [...prev.filter(s => s !== STEPS[1].id), STEPS[1].id]);
        setCurrentStep(2);
    };

    const handleLoanDetailsSubmit = (data: LoanDetailsFormData) => {
        setApplicationData(prev => ({ ...prev, loanDetails: data as LoanDetails }));
        setCompletedSteps(prev => [...prev.filter(s => s !== STEPS[2].id), STEPS[2].id]);
        setCurrentStep(3);
    };

    const handleDocumentsSubmit = (documents: Document[]) => {
        setApplicationData(prev => ({ ...prev, documents }));
        setCompletedSteps(prev => [...prev.filter(s => s !== STEPS[3].id), STEPS[3].id]);
        setCurrentStep(4);
    };

    const handleReviewSubmit = () => {
        if (!isApplicationComplete()) {
            toast.error('Please complete all required steps before submitting.');
            return;
        }

        submitMutation.mutate(applicationData as ApplicationData);
    };

    const handleBackStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleEditStep = (stepIndex: number) => {
        setCurrentStep(stepIndex);
    };

    const isApplicationComplete = (): boolean => {
        return !!(
            applicationData.personalInfo &&
            applicationData.employmentInfo &&
            applicationData.loanDetails &&
            applicationData.documents
        );
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <PersonalInfoStep
                        initialData={applicationData.personalInfo}
                        onNext={handlePersonalInfoSubmit}
                        isLoading={false}
                    />
                );
            case 1:
                return (
                    <EmploymentInfoStep
                        initialData={applicationData.employmentInfo}
                        onNext={handleEmploymentInfoSubmit}
                        onBack={handleBackStep}
                        isLoading={false}
                    />
                );
            case 2:
                return (
                    <LoanDetailsStep
                        initialData={applicationData.loanDetails}
                        onNext={handleLoanDetailsSubmit}
                        onBack={handleBackStep}
                        isLoading={false}
                    />
                );
            case 3:
                return (
                    <DocumentUploadStep
                        initialData={applicationData.documents}
                        onNext={handleDocumentsSubmit}
                        onBack={handleBackStep}
                        isLoading={false}
                    />
                );
            case 4:
                return (
                    <ReviewStep
                        data={applicationData as ApplicationData}
                        onSubmit={handleReviewSubmit}
                        onEdit={handleEditStep}
                        onBack={handleBackStep}
                        isLoading={submitMutation.isPending}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className='min-h-screen bg-background py-8'>
            <div className='container mx-auto px-4'>
                {/* Progress Indicator */}
                <div className='mb-8'>
                    <ProgressIndicator
                        steps={STEPS}
                        currentStep={STEPS[currentStep]?.id || 1}
                        completedSteps={completedSteps}
                    />
                </div>

                {/* Current Step */}
                <div className='flex justify-center'>{renderCurrentStep()}</div>
            </div>
        </div>
    );
};
