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

export interface HeroData {
    title: string;
    subtitle: string;
    buttonText: string;
    backgroundImage: string;
}

export interface WhyChooseUsFeature {
    icon: string;
    title: string;
    description: string;
}
export interface WhyChooseUsData {
    title: string;
    description: string;
    features: WhyChooseUsFeature[];
}

export interface ContactInfo {
    icon: string;
    text: string;
    href: string;
}

export interface SocialLink {
    href: string;
    icon: string;
    label: string;
}

export interface ContactData {
    info: ContactInfo[];
    social: SocialLink[];
}

export interface HomepageData {
    hero: HeroData;
    services: Service[];
    whyChooseUs: WhyChooseUsData;
    testimonials: Testimonial[];
    contact: ContactData;
}
