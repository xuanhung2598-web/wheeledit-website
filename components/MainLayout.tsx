'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
import PageProgressBar from './PageProgressBar';

// Lazy-load the Modal component
const Modal = dynamic(() => import('./Modal'), { ssr: false });

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
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
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main>{children}</main>
      <Footer />
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default MainLayout;