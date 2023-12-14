import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  duplicateMemberCheck: publicProcedure
    .input(
      z.object({
        email: z.string().min(1).email()
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.member.findFirst({
        where: {
          email: input.email
        }
      });
    }),

  createMember: publicProcedure
    .input(
      z.object({ 
        name: z.string().min(1),
        email: z.string().min(1).email()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const member = await ctx.db.member.create({
        data: {
          name: input.name,
          email: input.email
        }
      });
      return { id: member.id };
    }),

  updateMember: publicProcedure
    .input(
      z.object({ 
        id: z.string(),
        name: z.string().min(1),
        email: z.string().min(1).email()
      })
    )
    .mutation(async ({ ctx, input }) => {
        const team = await ctx.db.member.update({
            where: { id: input.id },
            data: {
              name: input.name,
              email: input.email
            }
        });
        return { id: team.id };
    }),

  deleteMember: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
        await ctx.db.member.delete({
            where: { id: input.id }
        });
        return { success: true };
    }),

});
