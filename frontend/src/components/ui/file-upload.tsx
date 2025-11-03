import { useState, useCallback, forwardRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/utils/formatters';
import { isValidFileType, isValidFileSize } from '@/utils/validators';

type FileUploadProps = {
    onFileSelect: (files: File[]) => void;
    onFileRemove?: (index: number) => void;
    multiple?: boolean;
    accept?: string;
    maxSize?: number; // in MB
    maxFiles?: number;
    className?: string;
    disabled?: boolean;
    files?: File[];
    error?: string;
};

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
    (
        {
            onFileSelect,
            onFileRemove,
            multiple = false,
            accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
            maxSize = 5,
            maxFiles = 5,
            className,
            disabled = false,
            files = [],
            error
        },
        ref
    ) => {
        const [isDragOver, setIsDragOver] = useState(false);
        const [uploadError, setUploadError] = useState<string>('');

        const allowedTypes = accept.split(',').map(type => {
            if (type.startsWith('.')) {
                const ext = type.slice(1);
                const mimeTypes: Record<string, string> = {
                    pdf: 'application/pdf',
                    doc: 'application/msword',
                    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    jpg: 'image/jpeg',
                    jpeg: 'image/jpeg',
                    png: 'image/png'
                };
                return mimeTypes[ext] || type;
            }
            return type.trim();
        });

        const handleFileSelect = useCallback(
            (selectedFiles: File[]) => {
                setUploadError('');

                const errors: string[] = [];
                const valid: File[] = [];

                for (const file of selectedFiles) {
                    if (!isValidFileType(file, allowedTypes)) {
                        errors.push(`${file.name}: Invalid file type. Allowed types: ${accept}`);
                        continue;
                    }

                    if (!isValidFileSize(file, maxSize)) {
                        errors.push(`${file.name}: File size exceeds ${maxSize}MB limit`);
                        continue;
                    }

                    if (files.length + valid.length >= maxFiles) {
                        errors.push(`Maximum ${maxFiles} files allowed`);
                        break;
                    }

                    valid.push(file);
                }

                if (errors.length > 0) {
                    setUploadError(errors[0]);
                    return;
                }

                if (valid.length > 0) {
                    onFileSelect(valid);
                }
            },
            [accept, allowedTypes, files.length, maxFiles, maxSize, onFileSelect]
        );

        const handleDragOver = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                if (!disabled) {
                    setIsDragOver(true);
                }
            },
            [disabled]
        );

        const handleDragLeave = useCallback((e: React.DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
        }, []);

        const handleDrop = useCallback(
            (e: React.DragEvent) => {
                e.preventDefault();
                setIsDragOver(false);

                if (disabled) return;

                const droppedFiles = Array.from(e.dataTransfer.files);
                handleFileSelect(droppedFiles);
            },
            [disabled, handleFileSelect]
        );

        const handleInputChange = useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                if (disabled) return;

                const selectedFiles = Array.from(e.target.files || []);
                handleFileSelect(selectedFiles);

                // Reset input value to allow selecting same file again
                e.target.value = '';
            },
            [disabled, handleFileSelect]
        );

        const displayError = error || uploadError;

        return (
            <div
                ref={ref}
                className={cn('w-full', className)}
            >
                <div
                    className={cn(
                        'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                        isDragOver && !disabled && 'border-primary bg-primary/5',
                        disabled && 'bg-muted cursor-not-allowed opacity-50',
                        displayError && 'border-destructive bg-destructive/5',
                        !displayError && !isDragOver && 'border-muted-foreground/25 hover:border-muted-foreground/50'
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type='file'
                        multiple={multiple}
                        accept={accept}
                        onChange={handleInputChange}
                        disabled={disabled}
                        className='hidden'
                        id='file-upload-input'
                    />

                    <div className='flex flex-col items-center gap-2'>
                        <Upload
                            className={cn('h-8 w-8', displayError ? 'text-destructive' : 'text-muted-foreground')}
                        />
                        <div>
                            <label
                                htmlFor='file-upload-input'
                                className={cn(
                                    'cursor-pointer font-medium text-primary hover:text-primary/80',
                                    disabled && 'cursor-not-allowed'
                                )}
                            >
                                Choose files
                            </label>
                            <span className='text-muted-foreground'> or drag and drop</span>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            {accept.split(',').join(', ')} up to {maxSize}MB each
                        </p>
                        {maxFiles > 1 && <p className='text-sm text-muted-foreground'>Maximum {maxFiles} files</p>}
                    </div>
                </div>

                {displayError && (
                    <div className='flex items-center gap-2 mt-2 text-sm text-destructive'>
                        <AlertCircle className='h-4 w-4' />
                        {displayError}
                    </div>
                )}

                {files.length > 0 && (
                    <div className='mt-4 space-y-2'>
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className='flex items-center justify-between p-3 bg-muted rounded-lg'
                            >
                                <div className='flex items-center gap-3'>
                                    <File className='h-4 w-4 text-muted-foreground' />
                                    <div>
                                        <p className='text-sm font-medium'>{file.name}</p>
                                        <p className='text-xs text-muted-foreground'>{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                                {onFileRemove && !disabled && (
                                    <button
                                        onClick={() => onFileRemove(index)}
                                        className='text-muted-foreground hover:text-destructive'
                                        type='button'
                                    >
                                        <X className='h-4 w-4' />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);
