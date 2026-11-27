import handler from "vinext/server/fetch-handler";
import { AUDIT_DOWNLOAD_URL, AUDIT_EXAMPLE_URL, AUDIT_URL } from "../lib/site-content";

const auditAssetPath = "/alder-orbit-audit";
const auditSummaryLink = `<a href="${AUDIT_EXAMPLE_URL}" aria-label="Back to the Orbit Audits sample summary" style="color:var(--ink);font-weight:700;text-decoration:underline;text-underline-offset:.18em">← Sample summary</a>`;

export default {
  async fetch(request: Request, env: Cloudflare.Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const isExample = url.pathname === AUDIT_URL || url.pathname === AUDIT_URL + "/";
    if (env.ASSETS && (isExample || url.pathname === AUDIT_DOWNLOAD_URL || url.pathname === auditAssetPath)) {
      // Fetch the asset internally so the browser stays at the published example URL.
      const source = new URL(request.url);
      source.pathname = auditAssetPath;
      if (!isExample) return env.ASSETS.fetch(new Request(source, request));

      const opts = new Headers(request.headers);
      opts.delete("If-None-Match");
      opts.delete("If-Modified-Since");
      opts.delete("Range");
      const asset = await env.ASSETS.fetch(new Request(source, { method: request.method, headers: opts }));
      if (!asset.ok) return asset;
      const headers = new Headers(asset.headers);
      headers.delete("Content-Length");
      headers.delete("ETag");
      headers.delete("Last-Modified");
      headers.set("Cache-Control", "no-cache");
      headers.set("X-Robots-Tag", "noindex");
      const page = new Response(asset.body, { status: asset.status, headers });
      if (!asset.body) return page;
      // The back link belongs to the web view; the downloaded report stays self-contained.
      return new HTMLRewriter().on(".topbar .breadcrumb > span:first-child", {
        element(title) {
          title.replace(auditSummaryLink, { html: true });
        },
      }).transform(page);
    }
    if (url.pathname === "/robots.txt" ||
        url.pathname === "/sitemap.xml" || /^\/(?:_next|work|fonts)\//.test(url.pathname) ||
        url.pathname === "/favicon.svg") {
      if (env.ASSETS) return env.ASSETS.fetch(request);
    }

    const response = await handler.fetch(request, env, ctx);
    // Keep the Pages address usable during custom-domain DNS issues, but out of search.
    if (url.hostname.endsWith(".pages.dev")) {
      const headers = new Headers(response.headers);
      headers.set("X-Robots-Tag", "noindex");
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
};
