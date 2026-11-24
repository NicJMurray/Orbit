declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    ASSETS?: Fetcher;
    ENQUIRY_MAILER?: Fetcher;
    ENQUIRY_TO?: string;
    ENQUIRY_EMAIL?: {
      send(message: {
        to: string;
        from: string;
        replyTo: string;
        subject: string;
        text: string;
      }): Promise<{ messageId?: string }>;
    };
  }
}
