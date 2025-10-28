/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'live.staticflickr.com',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pravatar.cc',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            }
        ],
    },
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html',
            },
        ]
    },
    // This header is necessary to allow Decap CMS and Cloudflare scripts to run.
    async headers() {
        return [
            {
                source: '/admin/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        // Allows scripts from self, unsafe-eval/inline, unpkg.com, and Cloudflare Insights
                        value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com https://static.cloudflareinsights.com; object-src 'none'",
                    },
                ],
            },
        ]
    },
};

export default nextConfig;