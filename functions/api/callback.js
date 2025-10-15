export async function onRequestGet(context) {
  // Khi GitHub trả về /api/callback?code=xxxx,
  // Cloudflare sẽ tự xử lý token OAuth nội bộ.
  // File này chỉ cần redirect người dùng về lại trang CMS.
  return Response.redirect("https://wheeledit-website.pages.dev/admin/#/");
}
