export interface Author {
    name: string;
    avatar: string;
    bio: string;
}

export const authors: Record<string, Author> = {
    'Stacy Render': {
        name: 'Stacy Render',
        avatar: 'https://i.pravatar.cc/150?img=9',
        bio: 'Stacy is a real estate marketing expert with a passion for visual storytelling. She specializes in virtual staging and high-end photo editing techniques that help properties sell faster.'
    },
    'John Aperture': {
        name: 'John Aperture',
        avatar: 'https://i.pravatar.cc/150?img=54',
        bio: 'John is a professional photographer and editing workflow specialist. With over a decade of experience, he focuses on technical excellence, from mastering HDR to perfecting aerial shots.'
    }
};
