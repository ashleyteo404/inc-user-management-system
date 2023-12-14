import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  duplicateTeamCheck: publicProcedure
    .input(
        z.object({
            name: z.string().min(1)
        })
    )
    .query(async ({ ctx, input }) => {
        return await ctx.db.team.findFirst({
            where: {
                name: input.name
            }
        });
    }),

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
      });
      return { id: team.id };
    }),

  updateTeam: publicProcedure
    .input(
      z.object({ 
        id: z.string(),
        name: z.string().min(1) 
      })
    )
    .mutation(async ({ ctx, input }) => {
        const team = await ctx.db.team.update({
            where: { id: input.id },
            data: {
                name: input.name
            }
        });
        return { id: team.id };
    }),

  deleteTeam: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.db.team.delete({
            where: { id: input.id }
        });
        return { success: true };
    }),
    
});
