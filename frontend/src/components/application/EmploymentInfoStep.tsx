import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employmentInfoSchema, EmploymentInfoFormData } from '@/utils/validationSchemas';
import { EmploymentType } from '@/types/application';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyInput } from '@/components/ui/currency-input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

type EmploymentInfoStepProps = {
    initialData?: EmploymentInfoFormData;
    onNext: (data: EmploymentInfoFormData) => void;
    onBack?: () => void;
    isLoading?: boolean;
};

const employmentTypeOptions = [
    { value: EmploymentType.FULL_TIME, label: 'Full-time' },
    { value: EmploymentType.PART_TIME, label: 'Part-time' },
    { value: EmploymentType.CONTRACT, label: 'Contract' },
    { value: EmploymentType.SELF_EMPLOYED, label: 'Self-employed' },
    { value: EmploymentType.UNEMPLOYED, label: 'Unemployed' },
    { value: EmploymentType.RETIRED, label: 'Retired' },
    { value: EmploymentType.STUDENT, label: 'Student' }
];

export const EmploymentInfoStep = ({ initialData, onNext, onBack, isLoading = false }: EmploymentInfoStepProps) => {
    const form = useForm<EmploymentInfoFormData>({
        resolver: zodResolver(employmentInfoSchema),
        defaultValues: initialData || {
            employmentType: undefined,
            employerName: '',
            jobTitle: '',
            workAddress: {
                street: '',
                city: '',
                state: '',
                zipCode: ''
            },
            employmentStartDate: '',
            monthlyIncome: 0,
            additionalIncome: 0,
            additionalIncomeSource: ''
        }
    });

    const watchEmploymentType = form.watch('employmentType');
    const needsEmployerInfo = [EmploymentType.FULL_TIME, EmploymentType.PART_TIME, EmploymentType.CONTRACT].includes(
        watchEmploymentType
    );

    const onSubmit = (data: EmploymentInfoFormData) => {
        onNext(data);
    };

    return (
        <Card className='w-full max-w-4xl mx-auto'>
            <CardHeader>
                <CardTitle>Employment Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-6'
                    >
                        {/* Employment Type */}
                        <FormField
                            control={form.control}
                            name='employmentType'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Employment Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select employment type' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {employmentTypeOptions.map(option => (
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

                        {/* Employer Information - Show only for employed individuals */}
                        {needsEmployerInfo && (
                            <div className='space-y-4'>
                                <h3 className='text-lg font-medium'>Employer Details</h3>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <FormField
                                        control={form.control}
                                        name='employerName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Employer Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Company Name Inc.'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='jobTitle'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Job Title</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='Software Engineer'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name='employmentStartDate'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Employment Start Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='date'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Work Address */}
                                <div className='space-y-4'>
                                    <h4 className='font-medium'>Work Address</h4>

                                    <FormField
                                        control={form.control}
                                        name='workAddress.street'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Street Address</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='456 Business Ave'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        <FormField
                                            control={form.control}
                                            name='workAddress.city'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>City</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='Business City'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='workAddress.state'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>State</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='CA'
                                                            maxLength={2}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='workAddress.zipCode'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>ZIP Code</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder='54321'
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Income Information */}
                        <div className='space-y-4'>
                            <h3 className='text-lg font-medium'>Income Information</h3>

                            <FormField
                                control={form.control}
                                name='monthlyIncome'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monthly Income</FormLabel>
                                        <FormControl>
                                            <CurrencyInput
                                                placeholder='5000'
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <FormField
                                    control={form.control}
                                    name='additionalIncome'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Income (Optional)</FormLabel>
                                            <FormControl>
                                                <CurrencyInput
                                                    placeholder='1000'
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='additionalIncomeSource'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Additional Income Source</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Freelance, rental income, etc.'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
