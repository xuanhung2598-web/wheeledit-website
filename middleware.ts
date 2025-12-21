import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Trả về sớm nhất có thể để tiết kiệm thời gian thực thi của Worker
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Chỉ chạy middleware trên các trang thực tế.
     * Loại trừ hoàn toàn:
     * - api routes
     * - _next (static, image, data)
     * - tệp tin có đuôi mở rộng (ảnh, icon, v.v.)
     */
    '/((?!api|_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
}