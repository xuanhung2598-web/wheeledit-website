
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
    
    // Bật trailingSlash: QUAN TRỌNG NHẤT để sửa lỗi 404 trên Cloudflare Pages
    // Nó sẽ tạo ra cấu trúc: /services/single-exposure/index.html
    trailingSlash: true,
};

export default nextConfig;
