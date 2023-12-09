import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    settings: defineTable({
        userId: v.string(),
        type: v.string(),
        selectedId: v.string(),
        theme: v.string()
    })
        .index("by_userId", ["userId"])
});