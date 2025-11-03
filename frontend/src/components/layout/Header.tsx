import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, Phone, Mail } from 'lucide-react';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigationItems = [
        { label: 'Home', href: '/' },
        { label: 'Apply Now', href: '/apply' },
        { label: 'Dashboard', href: '/dashboard' }
    ];

    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container flex h-16 items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Link
                        to='/'
                        className='flex items-center gap-2'
                    >
                        <div className='flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground'>
                            <span className='text-sm font-bold'>LL</span>
                        </div>
                        <span className='text-xl font-bold'>LoanLink</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex items-center gap-6'>
                    {navigationItems.map(item => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className='text-sm font-medium transition-colors hover:text-primary'
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className='hidden md:flex items-center gap-4'>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                            <Phone className='h-4 w-4' />
                            <span>1-800-LOAN-NOW</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Mail className='h-4 w-4' />
                            <span>help@loanlink.com</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Button
                            variant='outline'
                            asChild
                        >
                            <Link to='/auth'>Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link to='/apply'>Apply Now</Link>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <Sheet
                    open={isOpen}
                    onOpenChange={setIsOpen}
                >
                    <SheetTrigger asChild>
                        <Button
                            variant='ghost'
                            size='icon'
                            className='md:hidden'
                        >
                            <Menu className='h-5 w-5' />
                            <span className='sr-only'>Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side='right'
                        className='w-80'
                    >
                        <div className='flex flex-col gap-6'>
                            <div className='flex items-center gap-2'>
                                <div className='flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground'>
                                    <span className='text-sm font-bold'>LL</span>
                                </div>
                                <span className='text-xl font-bold'>LoanLink</span>
                            </div>
                            <nav className='flex flex-col gap-3'>
                                {navigationItems.map(item => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className='text-lg font-medium transition-colors hover:text-primary'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className='flex flex-col gap-4 pt-4 border-t'>
                                <div className='flex items-center gap-2'>
                                    <Phone className='h-4 w-4' />
                                    <span className='text-sm'>1-800-LOAN-NOW</span>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Mail className='h-4 w-4' />
                                    <span className='text-sm'>help@loanlink.com</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Button
                                        variant='outline'
                                        asChild
                                        className='w-full'
                                    >
                                        <Link
                                            to='/auth'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className='w-full'
                                    >
                                        <Link
                                            to='/apply'
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Apply Now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};
