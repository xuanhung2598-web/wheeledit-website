'use client';

import { useEffect } from 'react';
import Head from 'next/head';

const AdminPage = () => {
  useEffect(() => {
    // This effect runs only on the client side, after the component has mounted.
    // This ensures that `document.head` is available.
    
    // Fix: Use generic parameter to specify that querySelector returns an HTMLScriptElement.
    // This provides the correct type for the 'script' variable, resolving errors
    // when accessing 'src' and 'async' properties.
    let script = document.querySelector<HTMLScriptElement>('script[src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"]');

    if (!script) {
      script = document.createElement('script');
      script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
      script.async = true;
      document.head.appendChild(script);
    }
    
    // The CMS will automatically initialize itself once the script is loaded.

    return () => {
      // Optional: Cleanup the script when the component unmounts
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // We must return some JSX. The CMS will attach itself to the document body.
  // We can return null or an empty fragment.
  // Add a Head component to ensure the title is set correctly.
  return (
    <Head>
      <title>Content Manager</title>
    </Head>
  );
};

export default AdminPage;