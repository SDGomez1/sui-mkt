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
  order: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    notes: v.string(),
    status: v.optional(v.string()),
    product: v.string(),
  }),
});
