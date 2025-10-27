import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '../types';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), '_posts');

export const getAllPosts = cache((): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    const post: Post = {
        meta: {
            slug,
            ...matterResult.data as Omit<PostMeta, 'slug'>,
        },
        content: matterResult.content,
    };
    return post;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.meta.date < b.meta.date) {
      return 1;
    } else {
      return -1;
    }
  });
});

export const getPostBySlug = cache((slug: string): Post | undefined => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            meta: { 
                slug, 
                ...data as Omit<PostMeta, 'slug'>
            },
            content
        };
    } catch (err) {
        console.error(`Error reading post with slug: ${slug}`, err);
        return undefined;
    }
});

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const allTags = allPosts.flatMap(post => post.meta.tags);
  return [...new Set(allTags)];
}