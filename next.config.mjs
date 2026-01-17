
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
    
    // Tắt trailingSlash (mặc định là false) để tạo tệp dạng services/slug.html
    // Điều này đồng bộ với các link footer đang hoạt động tốt của bạn
    trailingSlash: false,
};

export default nextConfig;
