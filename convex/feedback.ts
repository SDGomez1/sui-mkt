import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createNewFeedbackEntry = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
  },
});
