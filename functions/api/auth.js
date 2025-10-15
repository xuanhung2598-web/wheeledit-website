export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const code = body.code;
    const client_id = "Ov23liA32xSuJKiBEb0F"; // 👈 Thay bằng Client ID của bạn
    const client_secret = "YOUR_CLIENT_SECRET"; // 👈 Dán GitHub OAuth Client Secret vào đây

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
