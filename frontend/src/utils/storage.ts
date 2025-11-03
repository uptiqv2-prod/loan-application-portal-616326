const STORAGE_PREFIX = 'loanlink_';

export const STORAGE_KEYS = {
    APPLICATION_DRAFT: `${STORAGE_PREFIX}application_draft`,
    APPLICATION_STEP: `${STORAGE_PREFIX}application_step`,
    FORM_DATA: `${STORAGE_PREFIX}form_data`
} as const;

export const setItem = <T>(key: string, value: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const getItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

export const clearApplicationData = (): void => {
    removeItem(STORAGE_KEYS.APPLICATION_DRAFT);
    removeItem(STORAGE_KEYS.APPLICATION_STEP);
    removeItem(STORAGE_KEYS.FORM_DATA);
};

export const saveApplicationDraft = (data: unknown): void => {
    setItem(STORAGE_KEYS.APPLICATION_DRAFT, data);
};

export const getApplicationDraft = <T>(): T | null => {
    return getItem<T>(STORAGE_KEYS.APPLICATION_DRAFT);
};

export const saveCurrentStep = (step: number): void => {
    setItem(STORAGE_KEYS.APPLICATION_STEP, step);
};

export const getCurrentStep = (): number => {
    return getItem<number>(STORAGE_KEYS.APPLICATION_STEP) || 0;
};
