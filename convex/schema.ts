import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  feedback: defineTable({
    mostLiked: v.string(),
    expectations: v.string(),
    improvement: v.string(),
    includes: v.string(),
    moreContent: v.boolean(),
    email: v.optional(v.string()),
  }),
});
