import { Prisma } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  createMember: publicProcedure
    .input(
      z.object({ 
        name: z.string().min(1),
        email: z.string().min(1).email()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const member = await ctx.db.member.create({
          data: {
            name: input.name,
            email: input.email
          }
        });
        return { id: member.id };  
      } catch (error) {
        // P2002 is the error code a unique constraint violation
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          throw new Error("Email already in use :(");
        } else {
          throw new Error("Failed to add member :(");
        }
      }
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
      try {
        const member = await ctx.db.member.update({
          where: { id: input.id },
          data: {
            name: input.name,
            email: input.email
          }
        });
        return { id: member.id };
      } catch (error) {
        // P2002 is the error code a unique constraint violation
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          throw new Error("Email already in use :(");
        } else {
          throw new Error("Failed to update member :(");
        }
      }
    }),

  deleteMember: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.member.delete({
          where: { id: input.id }
        });
        return { success: true };
      } catch (error) {
        throw new Error("Failed to delete member :(");
      }
    }),

});
