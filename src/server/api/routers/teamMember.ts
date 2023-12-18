import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamMemberRouter = createTRPCRouter({
  getTeamMembers: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.db.teamMember.findMany({
        where: { teamId: input.teamId }
      })
    })
});
