import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { User, Car, Home, Briefcase, GraduationCap, Heart } from 'lucide-react';

export const FeatureSection = () => {
    const loanTypes = [
        {
            icon: User,
            title: 'Personal Loans',
            description: 'Flexible loans for any personal expense',
            amount: '$1,000 - $50,000',
            rate: '4.9% - 24.9% APR',
            term: '2-7 years'
        },
        {
            icon: Car,
            title: 'Auto Loans',
            description: 'New and used vehicle financing',
            amount: '$5,000 - $100,000',
            rate: '3.9% - 18.9% APR',
            term: '3-8 years'
        },
        {
            icon: Home,
            title: 'Home Loans',
            description: 'Mortgages and home equity loans',
            amount: '$50,000 - $2,000,000',
            rate: '3.5% - 8.5% APR',
            term: '10-30 years'
        },
        {
            icon: Briefcase,
            title: 'Business Loans',
            description: 'Funding to grow your business',
            amount: '$10,000 - $500,000',
            rate: '5.9% - 29.9% APR',
            term: '1-10 years'
        },
        {
            icon: GraduationCap,
            title: 'Student Loans',
            description: 'Education financing solutions',
            amount: '$1,000 - $150,000',
            rate: '4.5% - 12.9% APR',
            term: '5-20 years'
        },
        {
            icon: Heart,
            title: 'Medical Loans',
            description: 'Healthcare and medical expenses',
            amount: '$1,000 - $25,000',
            rate: '6.9% - 19.9% APR',
            term: '2-5 years'
        }
    ];

    const benefits = [
        {
            title: 'Quick & Easy Application',
            description: 'Complete your application online in minutes with our streamlined process.'
        },
        {
            title: 'Fast Approval',
            description: 'Get approved in as little as 24 hours with our efficient review system.'
        },
        {
            title: 'Competitive Rates',
            description: 'We offer some of the most competitive interest rates in the market.'
        },
        {
            title: 'Flexible Terms',
            description: 'Choose repayment terms that work best for your financial situation.'
        },
        {
            title: 'No Prepayment Penalty',
            description: 'Pay off your loan early without any additional fees or penalties.'
        },
        {
            title: '24/7 Support',
            description: 'Our customer support team is available around the clock to help you.'
        }
    ];

    return (
        <section className='py-20 px-4'>
            <div className='container max-w-7xl'>
                {/* Loan Types */}
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>Choose the Right Loan for You</h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        We offer a variety of loan products to meet your specific needs, all with competitive rates and
                        flexible terms.
                    </p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
                    {loanTypes.map((loan, index) => {
                        const Icon = loan.icon;
                        return (
                            <Card
                                key={index}
                                className='relative overflow-hidden group hover:shadow-lg transition-shadow'
                            >
                                <CardHeader>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10'>
                                            <Icon className='h-5 w-5 text-primary' />
                                        </div>
                                        <CardTitle className='text-xl'>{loan.title}</CardTitle>
                                    </div>
                                    <CardDescription>{loan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2'>
                                    <div className='flex justify-between'>
                                        <span className='text-sm text-muted-foreground'>Amount:</span>
                                        <span className='text-sm font-medium'>{loan.amount}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-sm text-muted-foreground'>APR:</span>
                                        <span className='text-sm font-medium'>{loan.rate}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-sm text-muted-foreground'>Terms:</span>
                                        <span className='text-sm font-medium'>{loan.term}</span>
                                    </div>
                                    <Button
                                        className='w-full mt-4'
                                        asChild
                                    >
                                        <Link to='/apply'>Apply Now</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Benefits */}
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>Why Choose LoanLink?</h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        We're committed to making lending simple, transparent, and accessible for everyone.
                    </p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className='text-center'
                        >
                            <h3 className='text-lg font-semibold mb-2'>{benefit.title}</h3>
                            <p className='text-muted-foreground'>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
