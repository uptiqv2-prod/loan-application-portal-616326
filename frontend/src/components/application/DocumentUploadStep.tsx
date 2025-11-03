import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DocumentType, Document } from '@/types/application';
import { uploadService } from '@/services/uploadService';
import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react';
import { formatFileSize, formatDateTime } from '@/utils/formatters';

type DocumentUploadStepProps = {
    initialData?: Document[];
    onNext: (documents: Document[]) => void;
    onBack?: () => void;
    isLoading?: boolean;
};

const requiredDocuments = [
    {
        type: DocumentType.ID_VERIFICATION,
        title: 'ID Verification',
        description: "Driver's license, passport, or state ID",
        required: true
    },
    {
        type: DocumentType.INCOME_VERIFICATION,
        title: 'Income Verification',
        description: 'Recent pay stubs or income statements',
        required: true
    },
    {
        type: DocumentType.BANK_STATEMENTS,
        title: 'Bank Statements',
        description: 'Last 3 months of bank statements',
        required: false
    },
    {
        type: DocumentType.EMPLOYMENT_VERIFICATION,
        title: 'Employment Verification',
        description: 'Employment letter or contact information',
        required: false
    },
    {
        type: DocumentType.TAX_RETURNS,
        title: 'Tax Returns',
        description: 'Last 2 years of tax returns (if self-employed)',
        required: false
    }
];

export const DocumentUploadStep = ({
    initialData = [],
    onNext,
    onBack,
    isLoading = false
}: DocumentUploadStepProps) => {
    const [documents, setDocuments] = useState<Document[]>(initialData);
    const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
    const [errors, setErrors] = useState<Record<DocumentType, string>>({} as Record<DocumentType, string>);

    const uploadMutation = useMutation({
        mutationFn: ({ file, type }: { file: File; type: DocumentType }) => uploadService.uploadDocument(file, type),
        onSuccess: (data, variables) => {
            setDocuments(prev => [...prev, data.document]);
            setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[`${variables.type}-${variables.file.name}`];
                return newProgress;
            });
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[variables.type];
                return newErrors;
            });
        },
        onError: (error, variables) => {
            setErrors(prev => ({
                ...prev,
                [variables.type]: error instanceof Error ? error.message : 'Upload failed'
            }));
            setUploadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[`${variables.type}-${variables.file.name}`];
                return newProgress;
            });
        }
    });

    const handleFileSelect = (type: DocumentType) => (files: File[]) => {
        files.forEach(file => {
            const progressKey = `${type}-${file.name}`;
            setUploadProgress(prev => ({ ...prev, [progressKey]: 0 }));

            // Simulate progress for demo
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    const current = prev[progressKey] || 0;
                    if (current >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return { ...prev, [progressKey]: current + 10 };
                });
            }, 100);

            uploadMutation.mutate({ file, type });
        });
    };

    const handleFileRemove = (documentId: string) => {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    };

    const getDocumentsForType = (type: DocumentType) => {
        return documents.filter(doc => doc.type === type);
    };

    const isTypeComplete = (type: DocumentType, required: boolean) => {
        const typeDocuments = getDocumentsForType(type);
        return !required || typeDocuments.length > 0;
    };

    const canProceed = () => {
        return requiredDocuments.every(docType => isTypeComplete(docType.type, docType.required));
    };

    const onSubmit = () => {
        onNext(documents);
    };

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle>Document Upload</CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
                <Alert>
                    <FileText className='h-4 w-4' />
                    <AlertDescription>
                        Please upload clear, readable copies of the required documents. All documents should be in PDF,
                        DOC, DOCX, JPG, or PNG format and under 5MB each.
                    </AlertDescription>
                </Alert>

                {requiredDocuments.map(docType => {
                    const typeDocuments = getDocumentsForType(docType.type);
                    const hasError = errors[docType.type];
                    const isComplete = isTypeComplete(docType.type, docType.required);
                    const progressKeys = Object.keys(uploadProgress).filter(key => key.startsWith(docType.type));

                    return (
                        <div
                            key={docType.type}
                            className='space-y-3'
                        >
                            <div className='flex items-center gap-2'>
                                <h3 className='font-medium'>{docType.title}</h3>
                                {docType.required ? (
                                    <Badge variant='destructive'>Required</Badge>
                                ) : (
                                    <Badge variant='secondary'>Optional</Badge>
                                )}
                                {isComplete && docType.required && <CheckCircle className='h-4 w-4 text-green-600' />}
                            </div>

                            <p className='text-sm text-muted-foreground'>{docType.description}</p>

                            <FileUpload
                                onFileSelect={handleFileSelect(docType.type)}
                                multiple={false}
                                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
                                maxSize={5}
                                maxFiles={1}
                                error={hasError}
                                disabled={uploadMutation.isPending}
                            />

                            {/* Upload Progress */}
                            {progressKeys.map(key => (
                                <div
                                    key={key}
                                    className='space-y-2'
                                >
                                    <div className='flex items-center justify-between text-sm'>
                                        <span>Uploading {key.split('-').slice(1).join('-')}...</span>
                                        <span>{uploadProgress[key]}%</span>
                                    </div>
                                    <Progress
                                        value={uploadProgress[key]}
                                        className='h-2'
                                    />
                                </div>
                            ))}

                            {/* Uploaded Documents */}
                            {typeDocuments.map(document => (
                                <div
                                    key={document.id}
                                    className='flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg'
                                >
                                    <div className='flex items-center gap-3'>
                                        <CheckCircle className='h-4 w-4 text-green-600' />
                                        <div>
                                            <p className='text-sm font-medium'>{document.name}</p>
                                            <p className='text-xs text-muted-foreground'>
                                                {formatFileSize(document.size)} • Uploaded{' '}
                                                {formatDateTime(document.uploadedAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => handleFileRemove(document.id)}
                                        disabled={isLoading}
                                    >
                                        <XCircle className='h-4 w-4' />
                                    </Button>
                                </div>
                            ))}

                            {hasError && (
                                <Alert variant='destructive'>
                                    <AlertTriangle className='h-4 w-4' />
                                    <AlertDescription>{hasError}</AlertDescription>
                                </Alert>
                            )}
                        </div>
                    );
                })}

                {/* Summary */}
                <div className='bg-muted/50 p-4 rounded-lg'>
                    <h4 className='font-medium mb-2'>Upload Summary</h4>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
                        <div>Total documents: {documents.length}</div>
                        <div>
                            Required documents:{' '}
                            {requiredDocuments.filter(d => d.required && getDocumentsForType(d.type).length > 0).length}{' '}
                            of {requiredDocuments.filter(d => d.required).length}
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className='flex gap-4 pt-6'>
                    {onBack && (
                        <Button
                            type='button'
                            variant='outline'
                            onClick={onBack}
                            disabled={isLoading || uploadMutation.isPending}
                        >
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={onSubmit}
                        className='flex-1'
                        disabled={!canProceed() || isLoading || uploadMutation.isPending}
                    >
                        {isLoading ? 'Saving...' : 'Continue'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
