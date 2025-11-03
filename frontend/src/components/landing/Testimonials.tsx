import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Star } from 'lucide-react';

export const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Small Business Owner',
            avatar: '/avatars/sarah.jpg',
            rating: 5,
            content:
                'LoanLink made getting a business loan incredibly easy. The process was transparent, fast, and the rates were competitive. I was able to expand my bakery thanks to their quick approval process.'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Software Engineer',
            avatar: '/avatars/michael.jpg',
            rating: 5,
            content:
                'I needed a personal loan for home improvements, and LoanLink delivered exactly what they promised. No hidden fees, great customer service, and the funds were in my account the next day.'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Teacher',
            avatar: '/avatars/emily.jpg',
            rating: 5,
            content:
                'As someone with average credit, I was worried about getting approved. LoanLink not only approved my application but gave me a better rate than I expected. Their team was supportive throughout.'
        },
        {
            id: 4,
            name: 'David Thompson',
            role: 'Marketing Manager',
            avatar: '/avatars/david.jpg',
            rating: 5,
            content:
                'The entire loan application process took less than 10 minutes online. I received approval within hours and had the money for my car purchase the same week. Excellent service!'
        },
        {
            id: 5,
            name: 'Lisa Park',
            role: 'Freelancer',
            avatar: '/avatars/lisa.jpg',
            rating: 5,
            content:
                'LoanLink understood my unique situation as a freelancer. They worked with my irregular income and provided flexible terms that actually fit my budget. Highly recommend!'
        },
        {
            id: 6,
            name: 'Robert Wilson',
            role: 'Retired Teacher',
            avatar: '/avatars/robert.jpg',
            rating: 5,
            content:
                "At 65, I thought getting a loan would be difficult. LoanLink's team was patient, explained everything clearly, and helped me consolidate my debt with a much better interest rate."
        }
    ];

    const stats = [
        { number: '50,000+', label: 'Happy Customers' },
        { number: '4.9/5', label: 'Customer Rating' },
        { number: '$2B+', label: 'Loans Funded' },
        { number: '98%', label: 'Approval Rate' }
    ];

    return (
        <section className='py-20 px-4'>
            <div className='container max-w-7xl'>
                <div className='text-center mb-16'>
                    <h2 className='text-3xl md:text-4xl font-bold mb-4'>What Our Customers Say</h2>
                    <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                        Don't just take our word for it. Hear from thousands of satisfied customers who have achieved
                        their financial goals with LoanLink.
                    </p>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className='text-center'
                        >
                            <div className='text-3xl md:text-4xl font-bold text-primary mb-2'>{stat.number}</div>
                            <div className='text-muted-foreground font-medium'>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Testimonials Grid */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {testimonials.map(testimonial => (
                        <Card
                            key={testimonial.id}
                            className='h-full'
                        >
                            <CardContent className='p-6'>
                                <div className='flex items-center gap-1 mb-4'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className='w-4 h-4 fill-primary text-primary'
                                        />
                                    ))}
                                </div>
                                <blockquote className='text-muted-foreground mb-6 italic'>
                                    "{testimonial.content}"
                                </blockquote>
                                <div className='flex items-center gap-3'>
                                    <Avatar>
                                        <AvatarImage
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                        />
                                        <AvatarFallback>
                                            {testimonial.name
                                                .split(' ')
                                                .map(n => n[0])
                                                .join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className='font-semibold'>{testimonial.name}</div>
                                        <div className='text-sm text-muted-foreground'>{testimonial.role}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className='text-center mt-16'>
                    <div className='bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto'>
                        <h3 className='text-2xl font-bold mb-4'>Join Our Growing Community</h3>
                        <p className='text-muted-foreground mb-6'>
                            Experience the same great service that has earned us thousands of 5-star reviews. Your
                            financial goals are within reach.
                        </p>
                        <div className='flex justify-center gap-1 mb-4'>
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className='w-5 h-5 fill-primary text-primary'
                                />
                            ))}
                            <span className='ml-2 font-semibold'>4.9 out of 5 stars</span>
                        </div>
                        <p className='text-sm text-muted-foreground'>Based on 12,000+ customer reviews</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
