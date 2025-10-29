'use client';

import Script from 'next/script';

const AdminPage = () => {
  // This component will be replaced by the Decap CMS UI once the script loads.
  // The Netlify Identity Widget script is already loaded from the root layout,
  // so both scripts can now interact in the same document context.
  return (
    <>
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
    </>
  );
};

export default AdminPage;
