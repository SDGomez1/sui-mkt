import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma-db/client";
import { createAuthMiddleware } from "better-auth/api";
import { guestSessionService } from "./guestSession";
import { cartService } from "../cart/cart";

const prisma = new PrismaClient();
export const auth = betterAuth({
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const newSession = ctx.context.newSession;
      if (newSession) {
        const guestId = await guestSessionService.getGuestContext();
        if (guestId.id) {
          await cartService.mergeGuestCartToUserCart(
            guestId.id,
            newSession.user.id,
          );
        }
      }
    }),
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
