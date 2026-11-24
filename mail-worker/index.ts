import { deliverEnquiry, retryPendingEnquiries } from "../lib/enquiry-notification";

// This Worker has no public route. The Orbit Pages project calls it through
// the ENQUIRY_MAILER service binding; it never accepts an address from a client.
export default {
  async fetch(request: Request, env: Cloudflare.Env) {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/notify") {
      return new Response(null, { status: 404 });
    }
    const { id } = await request.json() as { id?: string };
    if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 400 });
    await deliverEnquiry(env, id);
    return new Response(null, { status: 204 });
  },
  scheduled(_event: ScheduledController, env: Cloudflare.Env, ctx: ExecutionContext) {
    ctx.waitUntil(retryPendingEnquiries(env));
  },
};
