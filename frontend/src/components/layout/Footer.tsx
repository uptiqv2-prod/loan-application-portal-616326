import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className='bg-muted/50 border-t'>
            <div className='container py-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Company Info */}
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <div className='flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground'>
                                <span className='text-sm font-bold'>LL</span>
                            </div>
                            <span className='text-xl font-bold'>LoanLink</span>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                            Your trusted partner for personal loans, auto loans, and more. Fast approvals with
                            competitive rates.
                        </p>
                        <div className='flex gap-4'>
                            <a
                                href='#'
                                className='text-muted-foreground hover:text-primary'
                            >
                                <Facebook className='h-5 w-5' />
                            </a>
                            <a
                                href='#'
                                className='text-muted-foreground hover:text-primary'
                            >
                                <Twitter className='h-5 w-5' />
                            </a>
                            <a
                                href='#'
                                className='text-muted-foreground hover:text-primary'
                            >
                                <Linkedin className='h-5 w-5' />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='space-y-4'>
                        <h4 className='font-semibold'>Quick Links</h4>
                        <ul className='space-y-2 text-sm'>
                            <li>
                                <Link
                                    to='/apply'
                                    className='text-muted-foreground hover:text-primary'
                                >
                                    Apply for Loan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/status'
                                    className='text-muted-foreground hover:text-primary'
                                >
                                    Check Status
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/dashboard'
                                    className='text-muted-foreground hover:text-primary'
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/auth'
                                    className='text-muted-foreground hover:text-primary'
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Loan Types */}
                    <div className='space-y-4'>
                        <h4 className='font-semibold'>Loan Types</h4>
                        <ul className='space-y-2 text-sm text-muted-foreground'>
                            <li>Personal Loans</li>
                            <li>Auto Loans</li>
                            <li>Home Loans</li>
                            <li>Business Loans</li>
                            <li>Student Loans</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className='space-y-4'>
                        <h4 className='font-semibold'>Contact Us</h4>
                        <div className='space-y-2 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-2'>
                                <Phone className='h-4 w-4' />
                                <span>1-800-LOAN-NOW</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Mail className='h-4 w-4' />
                                <span>help@loanlink.com</span>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin className='h-4 w-4' />
                                <span>123 Finance St, Money City, MC 12345</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-sm text-muted-foreground'>© 2024 LoanLink. All rights reserved.</p>
                    <div className='flex gap-4 text-sm text-muted-foreground'>
                        <a
                            href='#'
                            className='hover:text-primary'
                        >
                            Privacy Policy
                        </a>
                        <a
                            href='#'
                            className='hover:text-primary'
                        >
                            Terms of Service
                        </a>
                        <a
                            href='#'
                            className='hover:text-primary'
                        >
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
