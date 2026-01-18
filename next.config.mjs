
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Chế độ Web tĩnh hoàn toàn - Sẽ xuất ra thư mục 'out'
    output: 'export',
    
    // Tắt tối ưu ảnh server-side vì Cloudflare Pages Static không hỗ trợ
    images: {
        unoptimized: true,
        remotePatterns: [
            { protocol: 'https', hostname: 'live.staticflickr.com' },
            { protocol: 'https', hostname: 'images.pexels.com' },
            { protocol: 'https', hostname: 'i.pravatar.cc' },
            { protocol: 'https', hostname: 'picsum.photos' }
        ],
    },
    
    // Sử dụng mặc định (false) để Cloudflare Pages tự động xử lý tốt hơn các tệp .html
    trailingSlash: false,
};

export default nextConfig;
