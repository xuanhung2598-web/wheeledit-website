/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // CRITICAL: Tắt tối ưu hóa ảnh trên server.
        // Trên Cloudflare Pages Free, mỗi yêu cầu ảnh qua Next.js Image component 
        // sẽ tốn 1 Function Invocation. Tắt cái này sẽ cứu 100k request của bạn.
        unoptimized: true,
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
};

export default nextConfig;