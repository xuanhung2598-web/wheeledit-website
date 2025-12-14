import { Service, Testimonial } from '../types';

export const contactInfo = {
  email: 'contact@wheeledit.com',
  phoneDisplay: '+84 334 925 969',
  address: 'Ha Tinh, Vietnam',
  addressLink: 'https://www.google.com/maps/search/?api=1&query=Ha+Tinh,+Vietnam',
};

export const services: Service[] = [
    {
      title: 'AI Enhancement',
      description: 'Instantly elevate standard photos. We use advanced AI tools for sky replacement, lawn greening, and lighting correction to make your exterior shots pop.',
      before: 'https://live.staticflickr.com/65535/54861016673_0f59f4200b_b.jpg',
      after: 'https://live.staticflickr.com/65535/54861015368_9246bfc2eb_b.jpg',
    },
    {
      title: 'Single Exposure',
      description: 'Perfect for clean, natural-looking results. We correct colors, fix perspective, and sharpen details to deliver a polished image suitable for standard listings.',
      before: 'https://live.staticflickr.com/65535/54829022669_6e6416f3bd_b.jpg',
      after: 'https://live.staticflickr.com/65535/54829022684_1289cf76ba_b.jpg',
    },
    {
      title: 'HDR Merge',
      description: 'Maximize dynamic range. We blend multiple exposures to reveal details in both shadows and highlights, ensuring clear window views and perfectly balanced lighting.',
      before: 'https://live.staticflickr.com/65535/54827937127_f75707f023_b.jpg',
      after: 'https://live.staticflickr.com/65535/54829036884_0985b6af3f_b.jpg',
    },
    {
      title: 'Flash',
      description: 'The gold standard for interiors. We hand-blend flash and ambient light to achieve accurate colors, crisp textures, and a high-end magazine finish.',
      before: 'https://live.staticflickr.com/65535/54897141567_0b7bdfc148_b.jpg',
      after: 'https://live.staticflickr.com/65535/54827949842_efeeb39a29_b.jpg',
    },
    
     {
      title: 'Video Editing',
      description: 'Turn raw footage into a cinematic tour. Includes stabilization, color grading, music sync, and transitions to tell a compelling story of the property.',
      videoUrl: "https://www.youtube.com/embed/VKAKbueezMk?autoplay=1&mute=1&loop=1&playlist=VKAKbueezMk"
    },
    {
      title: 'Object Removal',
      description: 'Erase clutter seamlessly. From stray cords to unwanted furniture, we clean up the scene to highlight the property\'s actual space and remove distractions.',
      before: 'https://live.staticflickr.com/65535/54829080033_c23baa136b_b.jpg',
      after: 'https://live.staticflickr.com/65535/54828818451_5ea312f454_b.jpg',
    },
    {
      title: 'Virtual Staging',
      description: 'Bring empty rooms to life. We add photorealistic stylish furniture to help buyers visualize the home\'s potential and create an immediate emotional connection.',
      before: 'https://live.staticflickr.com/65535/54829166810_16e0cbd5ee_b.jpg',
      after: 'https://live.staticflickr.com/65535/54829166930_ed2a3b04bf_b.jpg',
    },
  ];

  export const testimonials: Testimonial[] = [
    {
      quote: "I've used their HDR editing service multiple times and the results are always consistent. The photos look bright, natural, and professional — exactly what I was hoping for!",
      author: 'Sarah L.',
      role: 'Real Estate Agent',
      avatar: 'https://i.pravatar.cc/150?img=47'
    },
    {
      quote: "The turnaround speed really impressed me. I sent a large batch and got everything back the next day with perfect edits. Reliable and easy to work with.",
      author: 'Mark S.',
      role: 'Photographer',
      avatar: 'https://i.pravatar.cc/150?img=54'
    },
    {
      quote: "Their attention to detail is outstanding. Every correction was spot on, and the final images looked better than I expected. Highly recommended.",
      author: 'Emily R.',
      role: 'Property Manager',
      avatar: 'https://i.pravatar.cc/150?img=9'
    }
  ];

  export const socialLinks = {
    facebook: 'https://www.facebook.com/wheeledit',
    instagram: 'https://www.instagram.com/wheel_editer',
    youtube: 'https://www.youtube.com/@wheelediter',
    whatsapp: 'https://wa.me/84334925969',
  };