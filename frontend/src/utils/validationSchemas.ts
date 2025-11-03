import { z } from 'zod';
import { EmploymentType, LoanType } from '@/types/application';
import { isValidEmail, isValidPhoneNumber, isValidSSN, isValidZipCode, isOldEnough } from './validators';

export const personalInfoSchema = z.object({
    firstName: z
        .string()
        .min(1, 'First name is required')
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters'),
    lastName: z
        .string()
        .min(1, 'Last name is required')
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters'),
    email: z.string().min(1, 'Email is required').refine(isValidEmail, 'Please enter a valid email address'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .refine(isValidPhoneNumber, 'Please enter a valid phone number'),
    dateOfBirth: z
        .string()
        .min(1, 'Date of birth is required')
        .refine(date => isOldEnough(date, 18), 'You must be at least 18 years old'),
    ssn: z
        .string()
        .min(1, 'Social Security Number is required')
        .refine(isValidSSN, 'Please enter a valid Social Security Number'),
    address: z.object({
        street: z
            .string()
            .min(1, 'Street address is required')
            .max(100, 'Street address must be less than 100 characters'),
        city: z.string().min(1, 'City is required').max(50, 'City must be less than 50 characters'),
        state: z.string().min(1, 'State is required').length(2, 'State must be 2 characters (e.g., CA)'),
        zipCode: z.string().min(1, 'ZIP code is required').refine(isValidZipCode, 'Please enter a valid ZIP code')
    })
});

export const employmentInfoSchema = z
    .object({
        employmentType: z.nativeEnum(EmploymentType).refine(val => val !== undefined, {
            message: 'Employment type is required'
        }),
        employerName: z.string().max(100, 'Employer name must be less than 100 characters').optional(),
        jobTitle: z.string().max(100, 'Job title must be less than 100 characters').optional(),
        workAddress: z
            .object({
                street: z.string().max(100, 'Street address must be less than 100 characters').optional(),
                city: z.string().max(50, 'City must be less than 50 characters').optional(),
                state: z.string().length(2, 'State must be 2 characters (e.g., CA)').optional(),
                zipCode: z
                    .string()
                    .refine(val => !val || isValidZipCode(val), 'Please enter a valid ZIP code')
                    .optional()
            })
            .optional(),
        employmentStartDate: z.string().optional(),
        monthlyIncome: z
            .number()
            .min(0, 'Monthly income cannot be negative')
            .max(1000000, 'Monthly income seems too high, please verify'),
        additionalIncome: z
            .number()
            .min(0, 'Additional income cannot be negative')
            .max(1000000, 'Additional income seems too high, please verify')
            .optional(),
        additionalIncomeSource: z
            .string()
            .max(100, 'Additional income source must be less than 100 characters')
            .optional()
    })
    .refine(
        data => {
            if (
                data.employmentType === EmploymentType.FULL_TIME ||
                data.employmentType === EmploymentType.PART_TIME ||
                data.employmentType === EmploymentType.CONTRACT
            ) {
                return data.employerName && data.jobTitle;
            }
            return true;
        },
        {
            message: 'Employer name and job title are required for employed individuals',
            path: ['employerName']
        }
    );

export const loanDetailsSchema = z.object({
    loanType: z.nativeEnum(LoanType).refine(val => val !== undefined, {
        message: 'Loan type is required'
    }),
    requestedAmount: z
        .number()
        .min(1000, 'Minimum loan amount is $1,000')
        .max(2000000, 'Maximum loan amount is $2,000,000'),
    loanPurpose: z
        .string()
        .min(1, 'Loan purpose is required')
        .min(10, 'Please provide more details about the loan purpose')
        .max(500, 'Loan purpose must be less than 500 characters'),
    preferredTerm: z.number().min(12, 'Minimum loan term is 12 months').max(360, 'Maximum loan term is 360 months')
});

export const applicationDataSchema = z.object({
    personalInfo: personalInfoSchema,
    employmentInfo: employmentInfoSchema,
    loanDetails: loanDetailsSchema,
    documents: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                type: z.string(),
                size: z.number(),
                uploadedAt: z.string(),
                url: z.string().optional(),
                verified: z.boolean()
            })
        )
        .default([])
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EmploymentInfoFormData = z.infer<typeof employmentInfoSchema>;
export type LoanDetailsFormData = z.infer<typeof loanDetailsSchema>;
export type ApplicationFormData = z.infer<typeof applicationDataSchema>;
