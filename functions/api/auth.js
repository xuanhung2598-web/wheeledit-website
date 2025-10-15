export async function onRequestGet({ env }) {
  const clientId = env.GITHUB_CLIENT_ID;
  const redirectUri = `${env.REDIRECT_URI}`;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=repo,user`;

  return Response.redirect(githubAuthUrl, 302);
}
