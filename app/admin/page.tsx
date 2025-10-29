import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Admin',
};

const AdminPage = () => {
  return (
    <>
      <Head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" defer></script>
      </Head>
      <iframe 
        src="/admin/index.html" 
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000
        }}
        title="Content Manager"
      ></iframe>
    </>
  );
};

export default AdminPage;
