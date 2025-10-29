'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
import PageProgressBar from './PageProgressBar';
import { SocialLinks } from '../types';

// Lazy-load the Modal component
const Modal = dynamic(() => import('./Modal'), { ssr: false });

interface MainLayoutProps {
  children: React.ReactNode;
  socialLinks: SocialLinks;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, socialLinks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener('open-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-modal', handleOpenModal);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PageProgressBar />
      </Suspense>
      <Header onOpenModal={() => setIsModalOpen(true)} socialLinks={socialLinks} />
      <main>{children}</main>
      <Footer />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default MainLayout;