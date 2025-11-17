'use client';

import React from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

interface SocialShareProps {
  title: string;
  url: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`,
  };

  return (
    <div className="flex items-center gap-4 mt-8">
      <h4 className="text-md font-semibold text-gray-700">Share this post:</h4>
      <div className="flex gap-2">
        <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
          <FaTwitter />
        </a>
        <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
          <FaFacebookF />
        </a>
        <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
          <FaLinkedinIn />
        </a>
        <a href={shareLinks.email} aria-label="Share via Email" className="p-2.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
          <IoMdMail />
        </a>
      </div>
    </div>
  );
};

export default SocialShare;