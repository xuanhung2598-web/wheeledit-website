
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
    
    // Bật trailingSlash để tạo cấu trúc thư mục/index.html, đây là cách tốt nhất để tránh 404 trên host tĩnh
    trailingSlash: true,
};

export default nextConfig;
