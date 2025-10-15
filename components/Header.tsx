import React, { useState } from 'react';
import texts from '/data/texts.json'; // ✅ thêm dòng này

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = texts?.header?.nav ?? [
    { href: '#/services', text: 'Services' },
    { href: '#/about', text: 'Why Us' },
    { href: '#/testimonials', text: 'Testimonials' },
    { href: '#/blog', text: 'Blog' },
    { href: '#/contact', text: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-black/70 text-white py-4 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <a href="#/" className="text-2xl font-bold">
          {texts?.header?.logo ?? 'Wheeledit'}
        </a>
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href} className="hover:text-blue-400">
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
