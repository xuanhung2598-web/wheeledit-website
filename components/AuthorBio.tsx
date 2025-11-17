import React from 'react';
import Image from 'next/image';
import { Author } from '../lib/authors';
import AnimateOnScroll from './AnimateOnScroll';

interface AuthorBioProps {
  author: Author;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  if (!author) return null;

  return (
    <AnimateOnScroll>
        <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gray-50 p-6 rounded-lg">
            <Image 
                src={author.avatar}
                alt={`Photo of ${author.name}`}
                width={80}
                height={80}
                className="rounded-full flex-shrink-0"
            />
            <div className='text-center sm:text-left'>
                <h3 className="text-xl font-bold text-gray-800">About {author.name}</h3>
                <p className="text-gray-600 mt-2">{author.bio}</p>
            </div>
        </div>
    </AnimateOnScroll>
  );
};

export default AuthorBio;
