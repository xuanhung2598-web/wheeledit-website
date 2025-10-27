
'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const PageProgressBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    // When the effect runs, it signifies navigation is complete.
    NProgress.done();

    // The cleanup function runs when the component unmounts,
    // which happens just before the new page/component is rendered.
    // This is the ideal time to start the progress bar.
    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]);

  return null;
};

export default PageProgressBar;
