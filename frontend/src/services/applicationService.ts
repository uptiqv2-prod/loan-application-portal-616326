import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import {
    LoanApplication,
    CreateApplicationInput,
    UpdateApplicationInput,
    LoanProduct,
    ApplicationSummary,
    ApplicationStatus
} from '@/types/application';
import { PaginatedResponse } from '@/types/api';
import { mockApplications, mockLoanProducts, mockApplicationSummary } from '@/data/mockData';

export const applicationService = {
    // Get all applications for current user
    getApplications: async (page = 1, limit = 10): Promise<PaginatedResponse<LoanApplication>> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplications ---', { page, limit });
            await mockApiDelay();
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedResults = mockApplications.slice(startIndex, endIndex);

            return {
                results: paginatedResults,
                page,
                limit,
                totalPages: Math.ceil(mockApplications.length / limit),
                totalResults: mockApplications.length
            };
        }

        const response = await api.get(`/applications?page=${page}&limit=${limit}`);
        return response.data;
    },

    // Get single application by ID
    getApplication: async (id: string): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplication ---', { id });
            await mockApiDelay();
            const application = mockApplications.find(app => app.id === id);
            if (!application) {
                throw new Error('Application not found');
            }
            return application;
        }

        const response = await api.get(`/applications/${id}`);
        return response.data;
    },

    // Create new application
    createApplication: async (input: CreateApplicationInput): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: createApplication ---', input);
            await mockApiDelay();
            const newApplication: LoanApplication = {
                id: `app_${Date.now()}`,
                userId: 'user_123',
                status: ApplicationStatus.SUBMITTED,
                data: input.data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            mockApplications.unshift(newApplication);
            return newApplication;
        }

        const response = await api.post('/applications', input);
        return response.data;
    },

    // Update existing application
    updateApplication: async (id: string, input: UpdateApplicationInput): Promise<LoanApplication> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: updateApplication ---', { id, input });
            await mockApiDelay();
            const applicationIndex = mockApplications.findIndex(app => app.id === id);
            if (applicationIndex === -1) {
                throw new Error('Application not found');
            }

            const updatedApplication = {
                ...mockApplications[applicationIndex],
                ...input,
                data: input.data
                    ? { ...mockApplications[applicationIndex].data, ...input.data }
                    : mockApplications[applicationIndex].data,
                updatedAt: new Date().toISOString()
            };
            mockApplications[applicationIndex] = updatedApplication;
            return updatedApplication;
        }

        const response = await api.put(`/applications/${id}`, input);
        return response.data;
    },

    // Delete application
    deleteApplication: async (id: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: deleteApplication ---', { id });
            await mockApiDelay();
            const applicationIndex = mockApplications.findIndex(app => app.id === id);
            if (applicationIndex === -1) {
                throw new Error('Application not found');
            }
            mockApplications.splice(applicationIndex, 1);
            return;
        }

        await api.delete(`/applications/${id}`);
    },

    // Get available loan products
    getLoanProducts: async (): Promise<LoanProduct[]> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getLoanProducts ---');
            await mockApiDelay();
            return mockLoanProducts;
        }

        const response = await api.get('/loan-products');
        return response.data;
    },

    // Get application summary/statistics
    getApplicationSummary: async (): Promise<ApplicationSummary> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getApplicationSummary ---');
            await mockApiDelay();
            return mockApplicationSummary;
        }

        const response = await api.get('/applications/summary');
        return response.data;
    }
};
