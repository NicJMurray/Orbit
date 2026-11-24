# Orbit Audit

The marketing site for Orbit Audit, served at https://orbit.njmurray.com/. The repository is the source of truth; make site changes in GitHub and review them in a pull request before merging to `main`.

- Homepage: `app/page.tsx`; shared copy: `lib/site-content.ts`.
- Interactive globe: `components/orbit/Globe.tsx`.
- Downloadable fictional audit: `public/alder-orbit-audit.html`.
- Contact UI: `components/orbit/ContactForm.tsx`; enquiry processing: `app/api/enquiries/route.ts`.
- Search metadata: `app/layout.tsx`; crawler files: `public/robots.txt` and `public/sitemap.xml`.

Use Node 22.13 or later. Run `npm ci` to install dependencies and `npm run build` to validate a production build. See the deployment notes in the repository for Cloudflare and form configuration.

The enquiry database and the recipient address are configured in Cloudflare and never committed here. Only fictional examples belong in `public/`; do not add client exports, API keys, or contact submissions.