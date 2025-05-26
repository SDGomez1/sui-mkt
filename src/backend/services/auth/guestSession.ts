import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
  guestCartId?: string;
}

class GuestSessionService {
  private maxAgecookie = 60 * 60 * 24 * 14;
  private getSessionOptions() {
    const sessionOptions: SessionOptions = {
      password: process.env.BETTER_AUTH_SECRET as string,
      cookieName: "guest-cart-session",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: this.maxAgecookie,
      },
    };
    return sessionOptions;
  }

  async getGuestContext() {
    const cookieStore = await cookies();
    const sessionOptions = this.getSessionOptions();

    const guestSession = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions,
    );

    if (!guestSession.guestCartId) {
      return { type: "guest", id: null };
    }

    return { type: "guest", id: guestSession.guestCartId };
  }

  async createGuestSession() {
    const cookieStore = await cookies();
    const sessionOptions = this.getSessionOptions();

    const guestSession = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions,
    );

    guestSession.guestCartId = crypto.randomUUID();
    await guestSession.save();

    return guestSession.guestCartId;
  }

  async destroyGuestSession() {
    const cookieStore = await cookies();
    const sessionOptions = this.getSessionOptions();

    const guestSession = await getIronSession<SessionData>(
      cookieStore,
      sessionOptions,
    );

    guestSession.destroy();

    return { type: "guest", id: null };
  }
}

export const guestSessionService = new GuestSessionService();
