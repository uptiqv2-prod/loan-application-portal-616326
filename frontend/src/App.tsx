import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { LandingPage } from './pages/LandingPage';
import { ApplicationPage } from './pages/ApplicationPage';
import { ApplicationStatusPage } from './pages/ApplicationStatusPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';

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
                        element={<ApplicationPage />}
                    />
                    <Route
                        path='/status/:id'
                        element={<ApplicationStatusPage />}
                    />
                    <Route
                        path='/auth'
                        element={<AuthPage />}
                    />
                    <Route
                        path='/dashboard'
                        element={<DashboardPage />}
                    />
                </Routes>
                <Toaster position='top-right' />
            </Router>
        </QueryClientProvider>
    );
};
