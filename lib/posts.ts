import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post, PostMeta } from '../types';
import { cache } from 'react';
// FIX: Using 'node:process' is the modern, explicit way to import Node.js built-in modules. This prevents potential module resolution conflicts and ensures the correct type definitions for the 'process' object are loaded, resolving the error.
import process from 'node:process';

const postsDirectory = path.join(process.cwd(), '_posts');

export const getAllPosts = cache((): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Ensure we only process markdown files
    .map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const data = matterResult.data;
    
    const post: Post = {
        meta: {
            slug,
            title: data.title ?? 'Untitled Post',
            date: data.date ?? '1970-01-01',
            author: data.author ?? 'Anonymous',
            excerpt: data.excerpt ?? '',
            image: data.image ?? '/default-image.png',
            // The `tags` property from gray-matter's data is of type `any`. To satisfy the `PostMeta` type and prevent downstream errors, we must ensure it's a `string[]` by checking if it is an array and filtering out any non-string values.
            tags: Array.isArray(data.tags) ? data.tags.filter(tag => typeof tag === 'string') : [],
        },
        content: matterResult.content,
    };
    return post;
  });

  // Sort posts by date in descending order (newest first)
  return allPostsData.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
});

// This regex splits content by markdown links, inline code, and code blocks, capturing the delimiters.
const LINK_DETECTION_REGEX = /(\[.*?\]\(.*?\)|`.*?`|```[\s\S]*?```)/g;

/**
 * Injects internal links into post content automatically.
 * - Links service-related keywords to the services page.
 * - Links topic-related keywords (based on tags) to the most recent relevant post.
 * - Only links the first occurrence of each keyword to avoid over-linking.
 * - Intelligently avoids adding links inside existing markdown links or code blocks.
 */
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

    // Automatically create topic keywords from all existing tags in the blog
    const topicKeywords: string[] = Array.from(new Set(allPosts.flatMap(p => p.meta.tags)));

    const allKeywords: { [key: string]: string } = { ...serviceKeywords };
    
    // Find the most recent related post for each topic keyword (tag)
    topicKeywords.forEach(keyword => {
        // Don't overwrite service keywords if a tag has the same name
        if (allKeywords[keyword]) return;

        // Find the most recent post that has this tag and is not the current one
        const relatedPost = allPosts.find(p => 
            p.meta.slug !== currentSlug && 
            p.meta.tags.some(tag => tag.toLowerCase() === keyword.toLowerCase())
        );
        if (relatedPost) {
            allKeywords[keyword] = `/blog/${relatedPost.meta.slug}`;
        }
    });
    
    // Split the content into text parts and delimiter parts (links, code)
    const parts = content.split(LINK_DETECTION_REGEX);
    const replacedKeywords = new Set<string>();

    // Sort keywords by length, descending, to match longer phrases first (e.g., "Virtual Staging" before "Staging")
    const sortedKeywords = Object.keys(allKeywords).sort((a, b) => b.length - a.length);

    const processedParts = parts.map((part, index) => {
        // If the part is a link or code block (odd indexes from split), return it as is.
        if (index % 2 !== 0) {
            return part;
        }

        let newPart = part;
        for (const keyword of sortedKeywords) {
            // Use a case-insensitive check for the Set to ensure each keyword is only linked once
            const lowerKeyword = keyword.toLowerCase();
            if (replacedKeywords.has(lowerKeyword)) {
                continue;
            }

            // Regex to find the keyword as a whole word, case-insensitive
            const regex = new RegExp(`\\b(${keyword})\\b`, 'i');
            if (regex.test(newPart)) {
                const url = allKeywords[keyword];
                // Replace only the first match found in this text part
                newPart = newPart.replace(regex, `[$1](${url})`);
                replacedKeywords.add(lowerKeyword);
            }
        }
        return newPart;
    });

    return processedParts.join('');
}

export const getPostBySlug = cache((slug: string): Post | undefined => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: originalContent } = matter(fileContents);
        
        // Inject internal links into the markdown content
        const allPosts = getAllPosts(); // This is cached, so it's efficient
        const content = injectInternalLinks(originalContent, slug, allPosts);

        return {
            meta: { 
                slug, 
                title: data.title ?? 'Untitled Post',
                date: data.date ?? '1970-01-01',
                author: data.author ?? 'Anonymous',
                excerpt: data.excerpt ?? '',
                image: data.image ?? '/default-image.png',
                // The `tags` property from gray-matter's data is of type `any`. To satisfy the `PostMeta` type and prevent downstream errors, we must ensure it's a `string[]` by checking if it is an array and filtering out any non-string values.
                tags: Array.isArray(data.tags) ? data.tags.filter(tag => typeof tag === 'string') : [],
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
  // Using `flatMap` to gather all tags. A type guard in the subsequent `filter` call ensures that the resulting array is of type `string[]`, resolving potential upstream type issues from gray-matter.
  const allTags = allPosts
    .flatMap(post => post.meta.tags)
    .filter((tag: unknown): tag is string => typeof tag === 'string');
  return [...new Set(allTags)];
}