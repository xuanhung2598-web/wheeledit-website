export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  // 1. Đổi code lấy access_token từ GitHub
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // 2. Redirect người dùng về CMS với token để Decap CMS nhận
  const redirectUrl = `https://wheeledit-website.pages.dev/admin/#access_token=${accessToken}`;
  return Response.redirect(redirectUrl, 302);
}
