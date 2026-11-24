import handler from "vinext/server/fetch-handler";

const production = "https://orbit.njmurray.com";

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.hostname === "orbit-audit.pages.dev" && (request.method === "GET" || request.method === "HEAD")) {
      return Response.redirect(production + url.pathname + url.search, 301);
    }

    // Pages serves HTML assets at extensionless URLs. Handle both forms here
    // so existing links and the Download HTML button keep working.
    if (url.pathname === "/alder-orbit-audit.html" || url.pathname === "/alder-orbit-audit") {
      if (env.ASSETS) {
        url.pathname = "/alder-orbit-audit";
        return env.ASSETS.fetch(new Request(url, request));
      }
    }
    if (url.pathname === "/robots.txt" ||
        url.pathname === "/sitemap.xml" || /^\/(?:_next|work|fonts)\//.test(url.pathname) ||
        url.pathname === "/favicon.svg") {
      if (env.ASSETS) return env.ASSETS.fetch(request);
    }

    const response = await handler.fetch(request, env, ctx);
    if (url.hostname.endsWith(".pages.dev")) {
      const headers = new Headers(response.headers);
      headers.set("X-Robots-Tag", "noindex");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
};
