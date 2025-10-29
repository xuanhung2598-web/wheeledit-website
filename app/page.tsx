import { getAllPosts } from '../lib/posts';
import HomePageClient from '../components/HomePageClient';
import { getHomePageContent } from '../lib/content';

// This is now the default export and a Server Component
export default async function Page() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  const homePageContent = getHomePageContent();
  return <HomePageClient recentPosts={recentPosts} homePageContent={homePageContent} />;
}
