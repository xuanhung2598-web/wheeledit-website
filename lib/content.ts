import fs from 'fs';
import path from 'path';
// FIX: Import 'process' to ensure correct types are used for process.cwd()
import process from 'process';
import { Service, Testimonial, SocialLinks } from '../types';

export interface HomePageContent {
  services: Service[];
  testimonials: Testimonial[];
  socialLinks: SocialLinks;
}

const contentDirectory = path.join(process.cwd(), '_content');

export function getHomePageContent(): HomePageContent {
  try {
    const fullPath = path.join(contentDirectory, 'homepage.json');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const data = JSON.parse(fileContents);
    return data as HomePageContent;
  } catch (error) {
    console.error("Error reading homepage content:", error);
    // Return a default structure to prevent build errors
    return {
      services: [],
      testimonials: [],
      socialLinks: {
        facebook: '#',
        instagram: '#',
        youtube: '#',
        whatsapp: '#'
      }
    };
  }
}
