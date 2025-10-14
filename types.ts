export interface Service {
  id: string;
  name: string;
  price: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  isTestable: boolean;
  videoUrl?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: string; // This will now be the body of the markdown file
}