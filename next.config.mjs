
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
    
    // Rất quan trọng: Tạo cấu trúc thư mục /service-name/index.html
    // Giúp Cloudflare Pages phục vụ trang khi người dùng truy cập trực tiếp hoặc F5.
    trailingSlash: true,
    
    // Tắt telemetry để build nhanh hơn
    telemetry: false,
};

export default nextConfig;
