import { Layout } from '../components/layout/Layout';
import { LandingHero } from '../components/landing/LandingHero';
import { FeatureSection } from '../components/landing/FeatureSection';
import { ProcessSteps } from '../components/landing/ProcessSteps';
import { Testimonials } from '../components/landing/Testimonials';

export const LandingPage = () => {
    return (
        <Layout>
            <LandingHero />
            <FeatureSection />
            <ProcessSteps />
            <Testimonials />
        </Layout>
    );
};
