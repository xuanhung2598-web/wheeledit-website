/**
 * Cloudflare Pages Middleware
 * Tự động prerender HTML cho các bot (SEO, social crawlers)
 * và giữ nguyên SPA cho người dùng thật.
 */

export async function onRequest(context) {
  const ua = context.request.headers.get("user-agent") || "";
  const url = new URL(context.request.url);

  // Danh sách các bot phổ biến cần prerender
  const botPattern = /(googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebot|facebookexternalhit|twitterbot|linkedinbot|embedly|pinterest|slackbot|telegrambot|applebot|whatsapp|discordbot|redditbot)/i;

  // Nếu là bot thì gọi dịch vụ prerender (Rendertron)
  if (botPattern.test(ua)) {
    try {
      const prerenderUrl = `https://render-tron.appspot.com/render/${url}`;
      const prerenderRes = await fetch(prerenderUrl, {
        headers: {
          "User-Agent": "Rendertron",
        },
      });

      if (prerenderRes.ok) {
        const html = await prerenderRes.text();
        return new Response(html, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } else {
        console.warn("Rendertron failed:", prerenderRes.status);
      }
    } catch (err) {
      console.error("Rendertron error:", err);
    }
  }

  // Nếu không phải bot, trả lại file tĩnh bình thường
  return context.next();
}
