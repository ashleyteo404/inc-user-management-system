import { Prisma } from "@prisma/client";
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
    .query(async ({ ctx, input }) => {
      const teamMembers = await ctx.db.teamMember.findMany({
        where: { teamId: input.teamId },
      });
  
      // Extract memberIds from teamMembers
      const memberIds = teamMembers.map((teamMember) => teamMember.memberId);
  
      // Fetch members using the extracted memberIds
      const members = await ctx.db.member.findMany({
        where: { memberId: { in: memberIds } },
      });
  
      return members;
    }),

  addTeamMember: publicProcedure
    .input(
      z.object({
        teamId: z.string(),
        email: z.string().email()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const memberId = await ctx.db.member.findFirst({
          where: {
            email: input.email
          },
          select: {
            memberId: true // Include only the memberId in the result
          }
        })
        if(!memberId) throw new Error("Member does not exist");
        else {
          const teamMember = await ctx.db.teamMember.create({
            data: {
              teamId: input.teamId,
              memberId: memberId.memberId
            }
          });
          return { id: teamMember.teamMemberId };  
        }
      } catch (error) {
        // P2002 is the error code a unique constraint violation
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          throw new Error("Member is already in team :(");
        } else {
          throw new Error("Failed to add member to team :(");
        }
      }
    }),
  
  removeTeamMember: publicProcedure
    .input(
      z.object({
        teamMemberId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const removedTeamMember = await ctx.db.teamMember.delete({
          where: { 
            teamMemberId: input.teamMemberId
          }
        });
        if (!removedTeamMember) {
          throw new Error("Team member not found :(");
        }
        return { success: true };
      } catch (error) {
        throw new Error("Failed to remove member from team :(");
      }
    }),
});
