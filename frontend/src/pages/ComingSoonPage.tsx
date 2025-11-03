import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Clock } from 'lucide-react';

interface ComingSoonPageProps {
    title: string;
    description: string;
}

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
    return (
        <Layout>
            <div className='min-h-[80vh] flex items-center justify-center px-4'>
                <Card className='w-full max-w-md text-center'>
                    <CardHeader>
                        <div className='flex justify-center mb-4'>
                            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                                <Clock className='h-8 w-8 text-primary' />
                            </div>
                        </div>
                        <CardTitle className='text-2xl'>{title}</CardTitle>
                        <CardDescription className='text-base'>{description}</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                        <p className='text-muted-foreground'>
                            We're working hard to bring you this feature. Check back soon!
                        </p>
                        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                            <Button asChild>
                                <Link to='/'>
                                    <ArrowLeft className='h-4 w-4 mr-2' />
                                    Back to Home
                                </Link>
                            </Button>
                            <Button
                                variant='outline'
                                asChild
                            >
                                <Link to='/apply'>Apply for Loan</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};
