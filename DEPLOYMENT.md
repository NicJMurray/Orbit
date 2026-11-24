# Deployment and enquiries

## Production website

Cloudflare Pages builds the `main` branch of `NicJMurray/Orbit`. Use `npm run build:pages` and publish `dist/client`; the production host is `orbit.njmurray.com`. Pull requests are the easiest way for two collaborators to review changes together. Do not change the ChatGPT Site copy as part of the publishing workflow.

Run `npm ci && npm run build:pages` locally. The homepage, contact page and sample report are served by the existing Vinext app; the sample report is intentionally excluded from search.

## Contact form

The application saves valid enquiries to the Cloudflare D1 binding `DB` before returning success. There is no public endpoint that reads stored records. SQL schema changes belong in `migrations/`; apply new migrations before deploying code that depends on them.

The private Cloudflare Worker `orbit-audit-mailer` handles email and delivery retries only. Pages calls it through `ENQUIRY_MAILER`. Its source is in `mail-worker/`; it also needs the same D1 database as `DB`, a Cloudflare Email Sending binding called `ENQUIRY_EMAIL`, and the verified destination stored in Cloudflare as `ENQUIRY_TO`. Do not put the destination, mail credentials or enquiries in the GitHub repository. The Worker should have no custom domains or public Worker URL. Its scheduled trigger runs every 15 minutes.
