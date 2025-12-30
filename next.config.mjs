
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Chuyển sang chế độ Web tĩnh hoàn toàn
    output: 'export',
    
    // Cloudflare Pages yêu cầu tắt tối ưu ảnh server-side của Next.js
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: 'https', hostname: 'live.staticflickr.com' },
            { protocol: 'https', hostname: 'images.pexels.com' },
            { protocol: 'https', hostname: 'i.pravatar.cc' },
            { protocol: 'https', hostname: 'picsum.photos' }
        ],
    },
    
    // Đảm bảo URL luôn kết thúc bằng / (ví dụ: /blog/) giúp SEO và định tuyến tĩnh tốt hơn
    trailingSlash: true,
};

export default nextConfig;
