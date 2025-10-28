import { getAllPosts } from '../lib/posts';
import HomePageClient from '../components/HomePageClient';
import { getServices, getTestimonials, getSocialLinks } from '../lib/data';

// This is now the default export and a Server Component
export default function Page() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  
  const services = getServices();
  const testimonials = getTestimonials();
  const socialLinks = getSocialLinks();

  return (
    <HomePageClient 
      recentPosts={recentPosts} 
      services={services}
      testimonials={testimonials}
      socialLinks={socialLinks}
    />
  );
}
