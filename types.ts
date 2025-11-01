export interface PostMeta {
  slug: string;
  title: string;
  date: string;
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
  title: string;
  price: string;
  description: string;
  before?: string;
  after?: string;
  videoUrl?: string;
}