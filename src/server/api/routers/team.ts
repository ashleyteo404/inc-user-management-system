import { Prisma } from "@prisma/client";
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
        name: z.string().min(1) ,
        description: z.string().nullable()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const team = await ctx.db.team.create({
          data: {
            name: input.name,
            description: input.description
          }
        });
        return { id: team.id };  
      } catch (error) {
        throw new Error("Failed to create team :(");
      }
    }),

  updateTeam: publicProcedure
    .input(
      z.object({ 
        id: z.string(),
        name: z.string().min(1) 
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const team = await ctx.db.team.update({
          where: { id: input.id },
          data: {
            name: input.name
          }
        });
        return { id: team.id };
      } catch (error) {
        throw new Error("Failed to update team :(");
      }
    }),

  deleteTeam: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.team.delete({
          where: { id: input.id }
        });
        return { success: true };
      } catch (error) {
        throw new Error("Failed to delete team :(");
      }
    }),

});
