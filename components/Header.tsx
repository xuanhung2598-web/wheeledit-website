import React, { useState, useEffect } from 'react';

interface HeaderProps {
    onOpenModal: () => void;
    onHomePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal, onHomePage = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#/services', text: 'Services' },
    { href: '#/about', text: 'Why Us' },
    { href: '#/testimonials', text: 'Testimonials' },
    { href: '#/blog', text: 'Blog' },
    { href: '#/contact', text: 'Contact' },
  ];

  const socialLinks = [
    { href: '#', icon: 'fab fa-facebook-f', label: 'Facebook' },
    { href: '#', icon: 'fab fa-instagram', label: 'Instagram' },
    { href: '#', icon: 'fab fa-youtube', label: 'YouTube' },
    { href: '#', icon: 'fab fa-whatsapp', label: 'WhatsApp' },
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.location.hash = href;
    if(isOpen) setIsOpen(false);
  };

  const homePageStyle = isScrolled || isOpen 
    ? 'bg-white/90 backdrop-blur-sm shadow-lg text-gray-800' 
    : 'bg-transparent text-white';
    
  const otherPageStyle = 'bg-gray-900 text-white shadow-lg';
  const headerStyle = onHomePage ? homePageStyle : otherPageStyle;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${headerStyle}`}>
        <div className="container mx-auto px-6 h-20 flex justify-between items-center relative">
            {/* Left: Logo */}
            <a href="#/" onClick={(e) => handleNavClick(e, '/')} className="text-2xl font-bold z-10">Wheeledit</a>

            {/* Center: Nav Links */}
            <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
                {navLinks.map(link => (
                    <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href.substring(1))} className="font-semibold hover:text-blue-500 transition-colors">{link.text}</a>
                ))}
            </nav>
            
            {/* Right: Social Icons and Button */}
            <div className="hidden md:flex items-center space-x-4 z-10">
                 <div className="flex items-center space-x-5">
                    {socialLinks.map(link => (
                        <a key={link.label} href={link.href} aria-label={link.label} className="hover:text-blue-500 transition-colors">
                            <i className={link.icon}></i>
                        </a>
                    ))}
                 </div>
                 <button 
                    onClick={onOpenModal}
                    className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-md ml-4"
                    >
                    Get Free Test
                </button>
            </div>
            
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden z-50">
                <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden fixed top-0 left-0 w-full h-screen bg-white text-gray-800 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <nav className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
                {navLinks.map(link => (
                    <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href.substring(1))} className="font-semibold hover:text-blue-500 transition-colors">{link.text}</a>
                ))}
                 <button 
                    onClick={() => {
                        onOpenModal();
                        setIsOpen(false);
                    }}
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300 shadow-md"
                    >
                    Get Free Test
                </button>
                <div className="flex items-center space-x-6 pt-6">
                    {socialLinks.map(link => (
                        <a key={link.label} href={link.href} aria-label={link.label} className="text-2xl hover:text-blue-500 transition-colors">
                            <i className={link.icon}></i>
                        </a>
                    ))}
                 </div>
            </nav>
        </div>
    </header>
  );
};

export default Header;