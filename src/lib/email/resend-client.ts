import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const inboxEmail = process.env.CONTACT_INBOX_EMAIL;

if (!apiKey) {
  throw new Error(
    "RESEND_API_KEY is missing. Set it in Vercel project environment variables.",
  );
}
if (!fromEmail) {
  throw new Error(
    "RESEND_FROM_EMAIL is missing. Expected e.g. 'noreply@cadp.pro'.",
  );
}
if (!inboxEmail) {
  throw new Error(
    "CONTACT_INBOX_EMAIL is missing. Expected e.g. 'contact@cadp.pro'.",
  );
}

export const resend = new Resend(apiKey);
export const FROM_EMAIL = fromEmail;
export const INBOX_EMAIL = inboxEmail;
