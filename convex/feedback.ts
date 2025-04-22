import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createNewFeedbackEntry = mutation({
  args: {
    mostLiked: v.string(),
    expectations: v.string(),
    improvement: v.string(),
    includes: v.string(),
    moreContent: v.boolean(),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const entry = await ctx.db.insert("feedback", {
      mostLiked: args.mostLiked,
      expectations: args.expectations,
      improvement: args.improvement,
      includes: args.includes,
      moreContent: args.moreContent,
      email: args.email,
    });
    if (entry) {
      return {
        success: "true",
      };
    }
        return {
        success: "false",
      };
  },
});
