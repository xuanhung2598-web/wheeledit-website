
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from '../types';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), '_posts');

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(postsDirectory)) {
    console.error(`Directory not found: ${postsDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Chuẩn hóa slug từ tên file về chữ thường
      const slug = fileName.replace(/\.md$/, '').toLowerCase();
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const data = matterResult.data;
      
      return {
        meta: {
          slug,
          title: data.title ?? 'Untitled Post',
          date: data.date ? (typeof data.date === 'string' ? data.date : data.date.toISOString().split('T')[0]) : '1970-01-01',
          updated: data.updated ? (typeof data.updated === 'string' ? data.updated : data.updated.toISOString().split('T')[0]) : undefined,
          author: data.author ?? 'Anonymous',
          excerpt: data.excerpt ?? '',
          image: data.image ?? '/default-image.png',
          tags: Array.isArray(data.tags) ? data.tags.filter((tag: unknown): tag is string => typeof tag === 'string') : [],
        },
        content: matterResult.content,
      } as Post;
    });

  console.log(`Found ${allPostsData.length} posts in ${postsDirectory}`);
  return allPostsData.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
});

const LINK_DETECTION_REGEX = /(\[.*?\]\(.*?\)|`.*?`|```[\s\S]*?```)/g;

function injectInternalLinks(content: string, currentSlug: string, allPosts: Post[]): string {
    const serviceKeywords: { [key: string]: string } = {
        'HDR': '/#services',
        'Virtual Staging': '/#services',
        'Single Exposure': '/#services',
        'Flash': '/#services',
        'AI Enhancement': '/#services',
        'Video Editing': '/#services',
        'Object Removal': '/#services',
        'real estate photo editing': '/#services',
        'real estate photography': '/',
        'real estate': '/'
    };

    const topicKeywords: string[] = Array.from(new Set(
        allPosts.flatMap(p => p.meta.tags)
    ));

    const allKeywords: { [key: string]: string } = { ...serviceKeywords };
    
    topicKeywords.forEach(keyword => {
        if (allKeywords[keyword]) return;
        const relatedPost = allPosts.find(p => 
            p.meta.slug !== currentSlug && 
            p.meta.tags.some(tag => tag.toLowerCase() === keyword.toLowerCase())
        );
        if (relatedPost) {
            allKeywords[keyword] = `/blog/${relatedPost.meta.slug}/`;
        }
    });
    
    const parts = content.split(LINK_DETECTION_REGEX);
    const processedParts = parts.map((part, index) => {
        if (index % 2 !== 0) return part;

        let processedChunk = '';
        let remainingChunk = part;
        const sortedKeywords = Object.keys(allKeywords).sort((a, b) => b.length - a.length);

        while (remainingChunk.length > 0) {
            let bestMatch: { keyword: string; match: RegExpExecArray; index: number } | null = null;

            for (const keyword of sortedKeywords) {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
                const match = regex.exec(remainingChunk);

                if (match && (!bestMatch || match.index < bestMatch.index)) {
                    bestMatch = { keyword, match, index: match.index };
                }
            }

            if (bestMatch) {
                processedChunk += remainingChunk.substring(0, bestMatch.index);
                processedChunk += `[${bestMatch.match[1]}](${allKeywords[bestMatch.keyword]})`;
                remainingChunk = remainingChunk.substring(bestMatch.index + bestMatch.match[1].length);
            } else {
                processedChunk += remainingChunk;
                remainingChunk = '';
            }
        }
        return processedChunk;
    });

    return processedParts.join('');
}

export const getPostBySlug = cache((slug: string): Post | undefined => {
    // Luôn tìm kiếm với slug chữ thường
    const searchSlug = slug.toLowerCase();
    const allPosts = getAllPosts();
    const post = allPosts.find(p => p.meta.slug === searchSlug);
    
    if (!post) return undefined;
    
    const content = injectInternalLinks(post.content, searchSlug, allPosts);
    return { ...post, content };
});

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.reduce<string[]>((acc, post) => acc.concat(post.meta.tags), []);
  return Array.from(new Set<string>(allTags));
}
