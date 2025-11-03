import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import { authService } from '@/services/auth';
import { LoginRequest, SignupRequest } from '@/types/user';
import { isValidEmail } from '@/utils/validators';
import { Header } from '@/components/layout/Header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().min(1, 'Email is required').refine(isValidEmail, 'Please enter a valid email address'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters')
});

const signupSchema = z
    .object({
        name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
        email: z.string().min(1, 'Email is required').refine(isValidEmail, 'Please enter a valid email address'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        confirmPassword: z.string().min(1, 'Please confirm your password')
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword']
    });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export const AuthPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const signupForm = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const loginMutation = useMutation({
        mutationFn: (data: LoginRequest) => authService.login(data),
        onSuccess: () => {
            toast.success('Successfully logged in!');
            navigate('/dashboard');
        },
        onError: error => {
            toast.error('Login failed. Please check your credentials.');
            console.error('Login error:', error);
        }
    });

    const signupMutation = useMutation({
        mutationFn: (data: SignupRequest) => authService.register(data),
        onSuccess: () => {
            toast.success('Account created successfully!');
            navigate('/dashboard');
        },
        onError: error => {
            toast.error('Registration failed. Please try again.');
            console.error('Signup error:', error);
        }
    });

    const onLoginSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data);
    };

    const onSignupSubmit = (data: SignupFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...signupData } = data;
        signupMutation.mutate(signupData);
    };

    return (
        <div className='min-h-screen bg-background'>
            <Header />
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-md mx-auto'>
                    <Card>
                        <CardHeader className='text-center'>
                            <CardTitle className='text-2xl'>Welcome to LoanLink</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs
                                value={activeTab}
                                onValueChange={setActiveTab}
                                className='space-y-6'
                            >
                                <TabsList className='grid w-full grid-cols-2'>
                                    <TabsTrigger value='login'>Sign In</TabsTrigger>
                                    <TabsTrigger value='signup'>Create Account</TabsTrigger>
                                </TabsList>

                                {/* Login Form */}
                                <TabsContent
                                    value='login'
                                    className='space-y-4'
                                >
                                    <form
                                        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                                        className='space-y-4'
                                    >
                                        <div className='space-y-2'>
                                            <Label htmlFor='login-email'>Email</Label>
                                            <div className='relative'>
                                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    id='login-email'
                                                    type='email'
                                                    placeholder='john@example.com'
                                                    className='pl-9'
                                                    {...loginForm.register('email')}
                                                />
                                            </div>
                                            {loginForm.formState.errors.email && (
                                                <p className='text-sm text-destructive'>
                                                    {loginForm.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='login-password'>Password</Label>
                                            <div className='relative'>
                                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    id='login-password'
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder='Enter your password'
                                                    className='pl-9 pr-9'
                                                    {...loginForm.register('password')}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className='h-4 w-4' />
                                                    ) : (
                                                        <Eye className='h-4 w-4' />
                                                    )}
                                                </Button>
                                            </div>
                                            {loginForm.formState.errors.password && (
                                                <p className='text-sm text-destructive'>
                                                    {loginForm.formState.errors.password.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='flex justify-end'>
                                            <Button
                                                variant='link'
                                                className='px-0'
                                                asChild
                                            >
                                                <Link to='/forgot-password'>Forgot password?</Link>
                                            </Button>
                                        </div>

                                        <Button
                                            type='submit'
                                            className='w-full'
                                            disabled={loginMutation.isPending}
                                        >
                                            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                                        </Button>
                                    </form>
                                </TabsContent>

                                {/* Signup Form */}
                                <TabsContent
                                    value='signup'
                                    className='space-y-4'
                                >
                                    <form
                                        onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                                        className='space-y-4'
                                    >
                                        <div className='space-y-2'>
                                            <Label htmlFor='signup-name'>Full Name</Label>
                                            <div className='relative'>
                                                <User className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    id='signup-name'
                                                    type='text'
                                                    placeholder='John Doe'
                                                    className='pl-9'
                                                    {...signupForm.register('name')}
                                                />
                                            </div>
                                            {signupForm.formState.errors.name && (
                                                <p className='text-sm text-destructive'>
                                                    {signupForm.formState.errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='signup-email'>Email</Label>
                                            <div className='relative'>
                                                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    id='signup-email'
                                                    type='email'
                                                    placeholder='john@example.com'
                                                    className='pl-9'
                                                    {...signupForm.register('email')}
                                                />
                                            </div>
                                            {signupForm.formState.errors.email && (
                                                <p className='text-sm text-destructive'>
                                                    {signupForm.formState.errors.email.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='signup-password'>Password</Label>
                                            <div className='relative'>
                                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    id='signup-password'
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder='Create a password'
                                                    className='pl-9 pr-9'
                                                    {...signupForm.register('password')}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className='h-4 w-4' />
                                                    ) : (
                                                        <Eye className='h-4 w-4' />
                                                    )}
                                                </Button>
                                            </div>
                                            {signupForm.formState.errors.password && (
                                                <p className='text-sm text-destructive'>
                                                    {signupForm.formState.errors.password.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className='space-y-2'>
                                            <Label htmlFor='signup-confirm-password'>Confirm Password</Label>
                                            <div className='relative'>
                                                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                                                <Input
                                                    id='signup-confirm-password'
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder='Confirm your password'
                                                    className='pl-9 pr-9'
                                                    {...signupForm.register('confirmPassword')}
                                                />
                                                <Button
                                                    type='button'
                                                    variant='ghost'
                                                    size='sm'
                                                    className='absolute right-0 top-0 h-full px-3'
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOff className='h-4 w-4' />
                                                    ) : (
                                                        <Eye className='h-4 w-4' />
                                                    )}
                                                </Button>
                                            </div>
                                            {signupForm.formState.errors.confirmPassword && (
                                                <p className='text-sm text-destructive'>
                                                    {signupForm.formState.errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>

                                        <Alert>
                                            <AlertCircle className='h-4 w-4' />
                                            <AlertDescription>
                                                By creating an account, you agree to our Terms of Service and Privacy
                                                Policy.
                                            </AlertDescription>
                                        </Alert>

                                        <Button
                                            type='submit'
                                            className='w-full'
                                            disabled={signupMutation.isPending}
                                        >
                                            {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
                                        </Button>
                                    </form>
                                </TabsContent>
                            </Tabs>

                            <Separator className='my-6' />

                            <div className='text-center text-sm text-muted-foreground'>
                                <p>
                                    {activeTab === 'login' ? "Don't have an account? " : 'Already have an account? '}
                                    <Button
                                        variant='link'
                                        className='px-0'
                                        onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                                    >
                                        {activeTab === 'login' ? 'Create one' : 'Sign in'}
                                    </Button>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
