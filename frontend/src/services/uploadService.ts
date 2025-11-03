import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { Document, DocumentType, UploadDocumentResponse } from '@/types/application';

export const uploadService = {
    // Upload a document
    uploadDocument: async (file: File, type: DocumentType, applicationId?: string): Promise<UploadDocumentResponse> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: uploadDocument ---', { fileName: file.name, type, applicationId });
            await mockApiDelay();

            const document: Document = {
                id: `doc_${Date.now()}`,
                name: file.name,
                type,
                size: file.size,
                uploadedAt: new Date().toISOString(),
                url: URL.createObjectURL(file), // Mock URL
                verified: false
            };

            return { document };
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        if (applicationId) {
            formData.append('applicationId', applicationId);
        }

        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    },

    // Delete a document
    deleteDocument: async (documentId: string): Promise<void> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: deleteDocument ---', { documentId });
            await mockApiDelay();
            return;
        }

        await api.delete(`/upload/${documentId}`);
    },

    // Get document download URL
    getDocumentUrl: async (documentId: string): Promise<string> => {
        if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
            console.log('--- MOCK API: getDocumentUrl ---', { documentId });
            await mockApiDelay();
            return `https://mock-storage.example.com/documents/${documentId}`;
        }

        const response = await api.get(`/upload/${documentId}/url`);
        return response.data.url;
    }
};
