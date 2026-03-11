import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  admin_login: defineTable({
    username: v.string(),
    password: v.string(),
  }).index("by_username", ["username"]),
});
