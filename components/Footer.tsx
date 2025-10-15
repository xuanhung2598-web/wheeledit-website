import React, { useEffect, useState } from 'react';
import { loadTexts } from '@/utils/loadTexts';

const Footer: React.FC = () => {
  const [texts, setTexts] = useState<any>({});

  useEffect(() => {
    loadTexts().then(setTexts);
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p>
        &copy; {new Date().getFullYear()}{' '}
        {texts?.footer?.copyright ?? 'Wheeledit. All Rights Reserved.'}
      </p>
      <div className="mt-2">
        <a href={texts?.footer?.privacy ?? '#'} className="mx-3 hover:text-blue-400">
          Privacy Policy
        </a>
        <a href={texts?.footer?.terms ?? '#'} className="mx-3 hover:text-blue-400">
          Terms of Service
        </a>
      </div>
    </footer>
  );
};

export default Footer;
