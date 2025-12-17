import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Logic middleware của bạn (nếu có) sẽ nằm ở đây.
  // Hiện tại chỉ cần return next() để cho phép request đi tiếp.
  return NextResponse.next()
}

// Cấu hình Matcher để loại trừ các file tĩnh
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml (SEO file)
     * - robots.txt (SEO file)
     * - logo.png, og-image.png (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo.png|og-image.png).*)',
  ],
}