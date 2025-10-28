import { getAllPosts } from '../lib/posts';
import HomePageClient from '../components/HomePageClient';

// This is now the default export and a Server Component
export default async function Page() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  return <HomePageClient recentPosts={recentPosts} />;
}
