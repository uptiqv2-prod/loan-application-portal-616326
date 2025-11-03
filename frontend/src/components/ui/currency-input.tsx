import { forwardRef } from 'react';
import { Input } from './input';
import { formatCurrencyInput } from '@/utils/validators';
import { cn } from '@/lib/utils';

type CurrencyInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    value?: number | string;
    onChange?: (value: number) => void;
    onValueChange?: (value: string) => void;
    symbol?: string;
    className?: string;
};

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ value = '', onChange, onValueChange, symbol = '$', className, ...props }, ref) => {
        const displayValue = typeof value === 'number' ? value.toString() : value;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value.replace(/[^\d.]/g, '');
            const formatted = formatCurrencyInput(inputValue);

            if (onValueChange) {
                onValueChange(formatted);
            }

            if (onChange) {
                const numericValue = parseFloat(formatted) || 0;
                onChange(numericValue);
            }
        };

        return (
            <div className='relative'>
                <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>{symbol}</div>
                <Input
                    {...props}
                    ref={ref}
                    type='text'
                    value={displayValue}
                    onChange={handleChange}
                    className={cn('pl-8', className)}
                />
            </div>
        );
    }
);
