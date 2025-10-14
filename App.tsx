import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import FreeTestModal from './components/FreeTestModal';
import { Service, BlogPost } from './types';


const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [location, setLocation] = useState(window.location.hash);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blog posts from a single JSON file
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                // Fetch the single source of truth for blog posts
                const response = await fetch('/public/data/blog.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const posts: BlogPost[] = data.posts || [];
                
                // Sort posts by date, newest first
                posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setBlogPosts(posts);
            } catch (err: any) {
                console.error("Error loading blog posts:", err);
                setError(err.message || 'Could not load blog posts.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    // Handle hash-based routing
    useEffect(() => {
        const handleHashChange = () => {
            setLocation(window.location.hash);
        };
        handleHashChange(); // Initial set
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Scroll to top on page navigation
    useEffect(() => {
        const path = location.substring(1) || '/';
        if (path.startsWith('/blog')) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    const handleOpenModal = (service?: Service) => {
        setSelectedService(service || null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };
    
    const renderPage = () => {
        if (isLoading) {
            return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading posts...</p></div>;
        }
        if (error) {
            return <div className="min-h-screen flex items-center justify-center"><p className="text-xl text-red-500">{error}</p></div>;
        }

        const path = location.substring(1) || '/';

        if (path.startsWith('/blog/page/')) {
            const page = parseInt(path.replace('/blog/page/', ''), 10);
            return <BlogPage posts={blogPosts} currentPage={page || 1} />;
        }
        
        const postMatch = path.match(/^\/blog\/([^/]+)$/);
        if (postMatch && !path.includes('page')) {
            const postId = postMatch[1];
            const post = blogPosts.find(p => p.id === postId);
            if (post) {
                return <BlogPostPage post={post} allPosts={blogPosts} />;
            }
        }
        
        if (path === '/blog') {
            return <BlogPage posts={blogPosts} currentPage={1} />;
        }

        return <HomePage onOpenModal={handleOpenModal} posts={blogPosts} locationHash={location} />;
    };
    
    const isHomePage = () => {
        const path = location.substring(1) || '/';
        return !path.startsWith('/blog');
    };

    return (
        <div className="App">
            <Header onOpenModal={handleOpenModal} onHomePage={isHomePage()} />
            <main>
                {renderPage()}
            </main>
            <Footer />
            {isModalOpen && <FreeTestModal service={selectedService} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;