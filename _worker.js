export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Serve static assets directly
    if (pathname.startsWith('/assets/') || pathname === '/favicon.ico') {
      return env.ASSETS.fetch(request);
    }

    // For all other routes, serve index.html (SPA fallback)
    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    // Fallback to index.html
    return env.ASSETS.fetch(new Request(new URL('/', request.url), request));
  },
};
