import React from 'react';
import texts from '/data/texts.json'; // ✅ thêm dòng này

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      text: texts?.contact?.email ?? 'info@wheeledit.com',
      href: `mailto:${texts?.contact?.email ?? 'info@wheeledit.com'}`,
    },
    {
      icon: 'fas fa-phone',
      text: texts?.contact?.phone ?? '+1 (555) 123-4567',
      href: `tel:${(texts?.contact?.phone ?? '+1 (555) 123-4567')
        .replace(/\s|\(|\)|-/g, '')
        .trim()}`,
    },
    {
      icon: 'fas fa-map-marker-alt',
      text: texts?.contact?.address ?? '123 Photo Lane, Edit City, USA',
      href: '#',
    },
  ];

  const socialLinks = [
    { href: texts?.contact?.social?.facebook ?? '#', icon: 'fab fa-facebook-f' },
    { href: texts?.contact?.social?.instagram ?? '#', icon: 'fab fa-instagram' },
    { href: texts?.contact?.social?.youtube ?? '#', icon: 'fab fa-youtube' },
    { href: texts?.contact?.social?.whatsapp ?? '#', icon: 'fab fa-whatsapp' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-8">
        {texts?.contactTitle ?? 'Get In Touch'}
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-12 mb-8">
        {contactInfo.map((item, i) => (
          <a key={i} href={item.href} className="text-lg hover:text-blue-400">
            <i className={`${item.icon} mr-2`}></i>
            {item.text}
          </a>
        ))}
      </div>
      <div className="flex justify-center gap-6">
        {socialLinks.map((s, i) => (
          <a key={i} href={s.href} target="_blank">
            <i className={`${s.icon} text-2xl hover:text-blue-400`}></i>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
