import { forwardRef } from 'react';
import { Input } from './input';
import { formatPhoneInput } from '@/utils/validators';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
};

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
    ({ value = '', onChange, className, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/\D/g, '');
            const formatted = formatPhoneInput(inputValue);

            if (onChange) {
                onChange(formatted);
            }
        };

        return (
            <Input
                {...props}
                ref={ref}
                type='tel'
                value={value}
                onChange={handleChange}
                placeholder='(555) 123-4567'
                maxLength={14}
                className={cn(className)}
            />
        );
    }
);
