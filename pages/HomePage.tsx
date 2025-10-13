import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import { Service, BlogPost } from '../types';

interface HomePageProps {
    onOpenModal: (service?: Service) => void;
    posts: BlogPost[];
    locationHash: string;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenModal, posts, locationHash }) => {
    
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
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }, [locationHash]);

    return (
        <>
            <Hero onOpenModal={onOpenModal} />
            <Services onGetFreeTest={onOpenModal} />
            <WhyChooseUs />
            <Testimonials />
            <Blog posts={posts} />
            <Contact />
        </>
    );
};

export default HomePage;