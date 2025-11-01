'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaYoutube, FaBars, FaTimes } from 'react-icons/fa';
import { socialLinks } from '../lib/data';


interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: isHomePage ? '#services' : '/#services', label: 'Services' },
    { href: isHomePage ? '#about' : '/#about', label: 'Why Us' },
    { href: isHomePage ? '#testimonials' : '/#testimonials', label: 'Testimonials' },
    { href: '/blog', label: 'Blog' },
    { href: isHomePage ? '#contact' : '/#contact', label: 'Contact' },
  ];
  
  const headerClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen || !isHomePage ? 'bg-white shadow-md' : 'bg-transparent'}`;
  const linkClasses = `whitespace-nowrap font-medium transition-colors ${isScrolled || isMenuOpen || !isHomePage ? 'text-gray-600 hover:text-[#007BFF]' : 'text-gray-200 hover:text-white'}`;
  const logoClasses = `text-2xl font-bold transition-colors ${isScrolled || isMenuOpen || !isHomePage ? 'text-gray-900' : 'text-white'}`;
  const hamburgerClasses = `focus:outline-none ${isScrolled || isMenuOpen || !isHomePage ? 'text-gray-800' : 'text-white'}`;
  const socialIconClasses = `text-lg transition-colors ${isScrolled || isMenuOpen || !isHomePage ? 'text-gray-600 hover:text-[#007BFF]' : 'text-gray-200 hover:text-white'}`;


  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
             <Link href="/" className={logoClasses}>
               WheelEdit
             </Link>
          </div>
          
          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex items-center gap-8">
                {navLinks.map(link => (
                <li key={link.label}>
                    <Link href={link.href} className={linkClasses}>
                    {link.label}
                    </Link>
                </li>
                ))}
            </ul>
          </nav>
          
          {/* Right: Socials and CTA */}
          <div className="hidden lg:flex flex-1 justify-end items-center">
            <div className="flex items-center gap-4 mr-5">
                 <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialIconClasses}><FaFacebookF /></a>
                 <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialIconClasses}><FaInstagram /></a>
                 <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialIconClasses}><FaYoutube /></a>
            </div>
            <button onClick={onOpenModal} className="cta-button bg-[#007BFF] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#0056b3] transition-all duration-300 transform hover:-translate-y-0.5">
              Get Free Test
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={hamburgerClasses} aria-label="Toggle menu" aria-expanded={isMenuOpen}>
              {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg absolute w-full">
          <nav className="flex flex-col items-center gap-6 py-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-lg font-medium text-gray-700 hover:text-[#007BFF]">
                {link.label}
              </Link>
            ))}
             <div className="flex items-center gap-6 mt-4">
                 <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-[#007BFF] text-xl"><FaFacebookF /></a>
                 <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 hover:text-[#007BFF] text-xl"><FaInstagram /></a>
                 <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-600 hover:text-[#007BFF] text-xl"><FaYoutube /></a>
            </div>
            <button 
              onClick={() => {
                onOpenModal();
                setIsMenuOpen(false);
              }} 
              className="cta-button bg-[#007BFF] text-white px-7 py-3 rounded-lg font-semibold hover:bg-[#0056b3] transition-all duration-300 transform hover:-translate-y-0.5 mt-4"
            >
              Get Your Free Test Edit
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;