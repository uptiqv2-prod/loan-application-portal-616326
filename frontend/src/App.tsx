import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LandingPage } from './pages/LandingPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={<LandingPage />}
                    />
                    <Route
                        path='/apply'
                        element={
                            <ComingSoonPage
                                title='Loan Application'
                                description='Our secure loan application form will be available soon.'
                            />
                        }
                    />
                    <Route
                        path='/status'
                        element={
                            <ComingSoonPage
                                title='Application Status'
                                description='Track your loan application status here.'
                            />
                        }
                    />
                    <Route
                        path='/dashboard'
                        element={
                            <ComingSoonPage
                                title='User Dashboard'
                                description='Manage your loans and account settings.'
                            />
                        }
                    />
                    <Route
                        path='/auth'
                        element={
                            <ComingSoonPage
                                title='Sign In'
                                description='Login to your LoanLink account.'
                            />
                        }
                    />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
};
