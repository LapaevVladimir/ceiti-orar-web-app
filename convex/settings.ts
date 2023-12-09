import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        userId: v.string(),
        type: v.string(),
        selectedId: v.string()
    },
    handler: async (ctx, args) => {
        const setting = await ctx.db.insert("settings",{
            userId: args.userId,
            type: args.type,
            selectedId: args.selectedId
        })

        return setting;
    }
});

export const isUserExisting = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db.query("settings")
            .withIndex("by_userId", (q) =>
                q
                    .eq("userId", args.userId)
            )
            .collect();

        return existingUser.length === 1;
    }
})

export const update = mutation({
    args: {
        userId: v.string(),
        type: v.string(),
        selectedId: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query("settings")
            .withIndex("by_userId", (q) =>
                q
                    .eq("userId", args.userId)
            )
            .collect();

        const existingUser = result.length === 1;

        if (!existingUser) {
            throw new Error("Not existing");
        }else{
            const user = await ctx.db.query("settings")
                .withIndex("by_userId", (q) =>
                    q
                        .eq("userId", args.userId)
                )
                .collect();

            const setting = await ctx.db.patch(user[0]._id, {
                ...args,
            });

            return setting;
        }
    }
});

export const getUserSettings = query({
    args: {
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db.query("settings")
            .withIndex("by_userId", (q) =>
                q
                    .eq("userId", args.userId)
            )
            .collect();

        if (existingUser.length) {
            return {
                type: existingUser[0].type,
                id: existingUser[0].selectedId
            };
        }
        return false;
    }
})