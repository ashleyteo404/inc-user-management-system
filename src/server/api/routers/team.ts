import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  createTeam: publicProcedure
    .input(
      z.object({ 
        name: z.string().min(1) 
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.create({
        data: {
            name: input.name
        }
      })
      return { id: team.id }
    }),

  duplicateTeamCheck: publicProcedure
    .input(
        z.object({
            name: z.string().min(1)
        })
    )
    .query(async ({ ctx, input }) => {
        const duplicate = await ctx.db.team.findFirst({
            where: {
                name: input.name
            }
        })
        return { duplicate }
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
