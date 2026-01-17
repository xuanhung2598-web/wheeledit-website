
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  author: string;
  excerpt: string;
  image: string;
  tags: string[];
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export interface Service {
  slug: string; // Bắt buộc phải có để tạo link
  title: string;
  description: string;
  before?: string;
  after?: string;
  videoUrl?: string;
  gallery?: string[]; // Mảng chứa các link ảnh
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  whatsapp: string;
}
