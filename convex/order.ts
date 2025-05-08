import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    notes: v.optional(v.string()),
    status: v.optional(v.string()),
    product: v.string(),
  },
  handler: async (ctx, args) => {
    const entry = await ctx.db.insert("order", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      address: args.address,
      notes: args.notes as string,
      status: args.status,
      product: args.product,
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
