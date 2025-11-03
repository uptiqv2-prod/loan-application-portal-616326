import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, DollarSign, ArrowRight } from 'lucide-react';

export const ProcessSteps = () => {
    const steps = [
        {
            step: '01',
            icon: FileText,
            title: 'Apply Online',
            description:
                'Complete our simple online application in just a few minutes. Provide basic information about yourself and your loan needs.',
            time: '2-3 minutes'
        },
        {
            step: '02',
            icon: CheckCircle,
            title: 'Get Approved',
            description:
                'Our advanced system reviews your application instantly. Get a decision within 24 hours, often much faster.',
            time: 'Within 24 hours'
        },
        {
            step: '03',
            icon: DollarSign,
            title: 'Receive Funds',
            description:
                'Once approved, funds are deposited directly into your bank account. Start using your loan right away.',
            time: '1-2 business days'
        }
    ];

    return (
        <section className='py-20 px-4 bg-muted/30'>
            <div className='container max-w-6xl'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>How It Works</h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Getting a loan has never been easier. Follow these simple steps and get the funds you need
                        quickly and securely.
                    </p>
                </div>

                <div className='grid lg:grid-cols-3 gap-8 lg:gap-12 mb-12'>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className='relative'
                            >
                                <Card className='h-full'>
                                    <CardContent className='p-8 text-center'>
                                        <div className='relative mb-6'>
                                            <div className='absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg'>
                                                {step.step}
                                            </div>
                                            <div className='w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center'>
                                                <Icon className='w-10 h-10 text-primary' />
                                            </div>
                                        </div>
                                        <h3 className='text-xl font-semibold mb-3'>{step.title}</h3>
                                        <p className='text-muted-foreground mb-4'>{step.description}</p>
                                        <div className='text-sm font-medium text-primary'>⏱️ {step.time}</div>
                                    </CardContent>
                                </Card>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <div className='hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2'>
                                        <ArrowRight className='w-6 h-6 text-primary' />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className='text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8'>
                    <h3 className='text-2xl font-bold mb-4'>Ready to Get Started?</h3>
                    <p className='text-muted-foreground mb-6 max-w-lg mx-auto'>
                        Join thousands of satisfied customers who have trusted us with their lending needs. Start your
                        application today and get the funds you need tomorrow.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                        <Button
                            size='lg'
                            className='text-lg'
                            asChild
                        >
                            <Link to='/apply'>Start Your Application</Link>
                        </Button>
                        <Button
                            variant='outline'
                            size='lg'
                            className='text-lg'
                            asChild
                        >
                            <Link to='/status'>Check Existing Application</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
