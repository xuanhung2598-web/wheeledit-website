import type { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';

export const metadata: Metadata = {
  title: 'Content Manager | WheelEdit',
};

const AdminPage = () => {
  return (
    <>
      {/* This script will be loaded first to make the CMS object available */}
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="beforeInteractive"
      />
      {/* This inline script will run after the above script has loaded */}
      <Script id="decap-init" strategy="lazyOnload">
        {`
          // The CMS object is now available on the window
          if (window.CMS) {
            window.CMS.init({
              config: {
                // Tells the CMS to load its configuration from a separate file
                load_config_file: '/admin/config.yml',
              },
            });
          }
        `}
      </Script>
    </>
  );
};

export default AdminPage;
