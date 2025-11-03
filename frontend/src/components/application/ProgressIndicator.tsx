import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = {
    id: number;
    title: string;
    description: string;
};

type ProgressIndicatorProps = {
    steps: Step[];
    currentStep: number;
    completedSteps: number[];
    className?: string;
};

export const ProgressIndicator = ({ steps, currentStep, completedSteps, className }: ProgressIndicatorProps) => {
    return (
        <div className={cn('w-full', className)}>
            <nav aria-label='Progress'>
                <ol
                    role='list'
                    className='flex items-center justify-between space-x-2 md:space-x-8'
                >
                    {steps.map((step, stepIdx) => {
                        const isCompleted = completedSteps.includes(step.id);
                        const isCurrent = step.id === currentStep;
                        const isUpcoming = step.id > currentStep && !isCompleted;

                        return (
                            <li
                                key={step.id}
                                className='flex-1'
                            >
                                <div
                                    className={cn(
                                        'group flex flex-col items-center border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4',
                                        isCompleted && 'border-primary',
                                        isCurrent && 'border-primary',
                                        isUpcoming && 'border-muted-foreground/25'
                                    )}
                                    aria-current={isCurrent ? 'step' : undefined}
                                >
                                    <span
                                        className={cn(
                                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2',
                                            isCompleted && 'bg-primary border-primary',
                                            isCurrent && 'border-primary bg-primary text-primary-foreground',
                                            isUpcoming && 'border-muted-foreground/25 bg-background'
                                        )}
                                    >
                                        {isCompleted ? (
                                            <Check className='h-4 w-4 text-primary-foreground' />
                                        ) : (
                                            <span
                                                className={cn(
                                                    'font-medium',
                                                    isCurrent && 'text-primary-foreground',
                                                    isUpcoming && 'text-muted-foreground'
                                                )}
                                            >
                                                {step.id}
                                            </span>
                                        )}
                                    </span>
                                    <div className='mt-2 text-center'>
                                        <span
                                            className={cn(
                                                'text-sm font-medium',
                                                isCompleted && 'text-primary',
                                                isCurrent && 'text-primary',
                                                isUpcoming && 'text-muted-foreground'
                                            )}
                                        >
                                            {step.title}
                                        </span>
                                        <p className='text-xs text-muted-foreground hidden md:block'>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                {stepIdx < steps.length - 1 && (
                                    <div
                                        className={cn(
                                            'absolute top-4 ml-4 -translate-x-1/2 h-0.5 w-full md:left-1/2 md:top-4 md:ml-0',
                                            'hidden md:block',
                                            isCompleted && 'bg-primary',
                                            !isCompleted && 'bg-muted-foreground/25'
                                        )}
                                        aria-hidden='true'
                                    />
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};
