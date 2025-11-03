import { ApplicationWizard } from '@/components/application/ApplicationWizard';
import { Header } from '@/components/layout/Header';

export const ApplicationPage = () => {
    return (
        <div className='min-h-screen bg-background'>
            <Header />
            <ApplicationWizard />
        </div>
    );
};
