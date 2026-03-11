import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const verify = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("admin_login")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();

    if (!record) {
      return false;
    }

    return record.password === args.password;
  },
});
