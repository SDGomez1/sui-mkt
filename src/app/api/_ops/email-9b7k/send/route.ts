import { sendPersonalizedEmails } from "./sendPersonalizedEmails";

export async function POST(request: Request) {
  const body = await request.json();
  return sendPersonalizedEmails(body);
}
