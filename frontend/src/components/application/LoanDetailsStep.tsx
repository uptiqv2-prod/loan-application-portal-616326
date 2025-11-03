import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { loanDetailsSchema, LoanDetailsFormData } from '@/utils/validationSchemas';
import { LoanType } from '@/types/application';
import { applicationService } from '@/services/applicationService';
import { formatCurrency, formatLoanTerm } from '@/utils/formatters';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

type LoanDetailsStepProps = {
    initialData?: LoanDetailsFormData;
    onNext: (data: LoanDetailsFormData) => void;
    onBack?: () => void;
    isLoading?: boolean;
};

const loanTypeOptions = [
    { value: LoanType.PERSONAL, label: 'Personal Loan' },
    { value: LoanType.HOME, label: 'Home Mortgage' },
    { value: LoanType.AUTO, label: 'Auto Loan' },
    { value: LoanType.BUSINESS, label: 'Business Loan' },
    { value: LoanType.STUDENT, label: 'Student Loan' }
];

const commonLoanTerms = [12, 24, 36, 48, 60, 72, 84, 120, 180, 240, 300, 360];

export const LoanDetailsStep = ({ initialData, onNext, onBack, isLoading = false }: LoanDetailsStepProps) => {
    const form = useForm<LoanDetailsFormData>({
        resolver: zodResolver(loanDetailsSchema),
        defaultValues: initialData || {
            loanType: undefined,
            requestedAmount: 0,
            loanPurpose: '',
            preferredTerm: 36
        }
    });

    const { data: loanProducts, isLoading: productsLoading } = useQuery({
        queryKey: ['loanProducts'],
        queryFn: applicationService.getLoanProducts
    });

    const watchLoanType = form.watch('loanType');
    const selectedProduct = loanProducts?.find(product => product.type === watchLoanType);

    const onSubmit = (data: LoanDetailsFormData) => {
        onNext(data);
    };

    const getFilteredTerms = () => {
        if (!selectedProduct) return commonLoanTerms;

        return commonLoanTerms.filter(term => term >= selectedProduct.minTerm && term <= selectedProduct.maxTerm);
    };

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle>Loan Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        {/* Loan Type Selection */}
                        <FormField
                            control={form.control}
                            name='loanType'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select loan type' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {loanTypeOptions.map(option => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Product Information */}
                        {watchLoanType && (
                            <div className='space-y-4'>
                                {productsLoading ? (
                                    <div className='space-y-2'>
                                        <Skeleton className='h-4 w-32' />
                                        <Skeleton className='h-16 w-full' />
                                    </div>
                                ) : selectedProduct ? (
                                    <div className='bg-muted/50 p-4 rounded-lg'>
                                        <h3 className='font-medium mb-2'>{selectedProduct.name}</h3>
                                        <p className='text-sm text-muted-foreground mb-3'>
                                            {selectedProduct.description}
                                        </p>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                                            <div>
                                                <span className='font-medium'>Amount Range:</span>
                                                <p>
                                                    {formatCurrency(selectedProduct.minAmount)} -{' '}
                                                    {formatCurrency(selectedProduct.maxAmount)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className='font-medium'>Term Range:</span>
                                                <p>
                                                    {formatLoanTerm(selectedProduct.minTerm)} -{' '}
                                                    {formatLoanTerm(selectedProduct.maxTerm)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className='font-medium'>Interest Rate:</span>
                                                <p>
                                                    {selectedProduct.interestRate.min}% -{' '}
                                                    {selectedProduct.interestRate.max}% APR
                                                </p>
                                            </div>
                                        </div>

                                        {selectedProduct.features.length > 0 && (
                                            <div className='mt-3'>
                                                <span className='font-medium text-sm'>Key Features:</span>
                                                <div className='flex flex-wrap gap-1 mt-1'>
                                                    {selectedProduct.features.slice(0, 3).map((feature, index) => (
                                                        <Badge
                                                            key={index}
                                                            variant='secondary'
                                                            className='text-xs'
                                                        >
                                                            {feature}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg'>
                                        <AlertCircle className='h-4 w-4' />
                                        <span className='text-sm'>This loan type is currently not available.</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Loan Amount */}
                        <FormField
                            control={form.control}
                            name='requestedAmount'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Requested Loan Amount</FormLabel>
                                    <FormControl>
                                        <CurrencyInput
                                            placeholder='25000'
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    {selectedProduct && (
                                        <FormDescription>
                                            Available range: {formatCurrency(selectedProduct.minAmount)} -{' '}
                                            {formatCurrency(selectedProduct.maxAmount)}
                                        </FormDescription>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Loan Term */}
                        <FormField
                            control={form.control}
                            name='preferredTerm'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preferred Loan Term</FormLabel>
                                    <Select
                                        onValueChange={value => field.onChange(Number(value))}
                                        value={field.value?.toString()}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select loan term' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {getFilteredTerms().map(term => (
                                                <SelectItem
                                                    key={term}
                                                    value={term.toString()}
                                                >
                                                    {formatLoanTerm(term)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {selectedProduct && (
                                        <FormDescription>
                                            Available range: {formatLoanTerm(selectedProduct.minTerm)} -{' '}
                                            {formatLoanTerm(selectedProduct.maxTerm)}
                                        </FormDescription>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Loan Purpose */}
                        <FormField
                            control={form.control}
                            name='loanPurpose'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loan Purpose</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Please describe how you plan to use this loan (e.g., debt consolidation, home improvements, vehicle purchase, etc.)'
                                            className='min-h-[100px]'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide details about how you intend to use the loan funds.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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
                                type='submit'
                                className='flex-1'
                                disabled={isLoading}
                            >
                                {isLoading ? 'Saving...' : 'Continue'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};
