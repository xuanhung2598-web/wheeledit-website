
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Chế độ Web tĩnh hoàn toàn
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
    
    // Bật trailingSlash để tạo cấu trúc thư mục /page/index.html
    // Giúp Cloudflare Pages xử lý định tuyến tốt hơn, tránh lỗi 404 khi refresh.
    trailingSlash: true,
};

export default nextConfig;
