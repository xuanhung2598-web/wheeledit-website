import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import { Service, BlogPost, HomepageData } from '../types';

interface HomePageProps {
    onOpenModal: (service?: Service) => void;
    posts: BlogPost[];
    locationHash: string;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenModal, posts, locationHash }) => {
    const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHomepageData = async () => {
            try {
                const response = await fetch('/data/homepage.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHomepageData(data);
            } catch (err: any) {
                console.error("Error loading homepage data:", err);
                setError(err.message || 'Could not load homepage data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchHomepageData();
    }, []);
    
    useEffect(() => {
        // This effect handles scrolling to sections when a hash link is clicked.
        if (locationHash.startsWith('#/')) {
            const id = locationHash.substring(2);
            
            // If hash is empty ('#/'), scroll to top.
            if (!id) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            // Only scroll to valid section IDs on the homepage.
            const validSectionIds = ['services', 'about', 'testimonials', 'blog-preview', 'contact'];
            if (validSectionIds.includes(id)) {
                // Use a short timeout to ensure the element is rendered before we try to scroll.
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        const yOffset = -80; // a little space from the top
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({top: y, behavior: 'smooth'});
                    }
                }, 100);
            }
        }
    }, [locationHash]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><p>Loading homepage...</p></div>;
    }

    if (error || !homepageData) {
        return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">Error: Could not load homepage content.</p></div>;
    }

    return (
        <>
            <Hero data={homepageData.hero} onOpenModal={() => onOpenModal()} />
            <Services servicesData={homepageData.services} onGetFreeTest={onOpenModal} />
            <WhyChooseUs data={homepageData.whyChooseUs} />
            <Testimonials testimonialsData={homepageData.testimonials} />
            <Blog posts={posts} />
            <Contact data={homepageData.contact} />
        </>
    );
};

export default HomePage;
