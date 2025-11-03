import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { CheckCircle, Clock, Shield, DollarSign } from 'lucide-react';

export const LandingHero = () => {
    const features = [
        { icon: Clock, text: 'Fast Approval - 24 hours or less' },
        { icon: Shield, text: 'Secure & Confidential Process' },
        { icon: DollarSign, text: 'Competitive Interest Rates' },
        { icon: CheckCircle, text: 'No Hidden Fees' }
    ];

    return (
        <section className='py-20 px-4 bg-gradient-to-br from-primary/5 to-primary/10'>
            <div className='container max-w-6xl'>
                <div className='grid lg:grid-cols-2 gap-12 items-center'>
                    {/* Left Content */}
                    <div className='space-y-8'>
                        <div className='space-y-4'>
                            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight'>
                                Get the <span className='text-primary'>loan you need</span>, fast and simple
                            </h1>
                            <p className='text-xl text-muted-foreground max-w-lg'>
                                Quick approvals, competitive rates, and a hassle-free application process. From personal
                                loans to auto financing, we've got you covered.
                            </p>
                        </div>

                        <div className='flex flex-col sm:flex-row gap-4'>
                            <Button
                                asChild
                                size='lg'
                                className='text-lg'
                            >
                                <Link to='/apply'>Apply Now - It's Free</Link>
                            </Button>
                            <Button
                                variant='outline'
                                size='lg'
                                className='text-lg'
                                asChild
                            >
                                <Link to='/status'>Check Application Status</Link>
                            </Button>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className='flex items-center gap-3'
                                    >
                                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-primary/10'>
                                            <Icon className='h-4 w-4 text-primary' />
                                        </div>
                                        <span className='text-sm font-medium'>{feature.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Content - Stats Cards */}
                    <div className='space-y-6'>
                        <div className='grid grid-cols-2 gap-4'>
                            <Card>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-3xl font-bold text-primary'>$50K+</div>
                                    <div className='text-sm text-muted-foreground'>Max Loan Amount</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-3xl font-bold text-primary'>4.9%</div>
                                    <div className='text-sm text-muted-foreground'>Starting APR</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-3xl font-bold text-primary'>24hrs</div>
                                    <div className='text-sm text-muted-foreground'>Fast Approval</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className='p-6 text-center'>
                                    <div className='text-3xl font-bold text-primary'>98%</div>
                                    <div className='text-sm text-muted-foreground'>Customer Satisfaction</div>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className='bg-primary text-primary-foreground'>
                            <CardContent className='p-6'>
                                <div className='text-center space-y-2'>
                                    <div className='text-2xl font-bold'>Check Your Rate</div>
                                    <div className='text-primary-foreground/80'>
                                        See what you qualify for in 60 seconds without affecting your credit score
                                    </div>
                                    <Button
                                        variant='secondary'
                                        className='w-full mt-4'
                                        asChild
                                    >
                                        <Link to='/apply'>Get Started</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
