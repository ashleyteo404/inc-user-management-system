import { createTRPCRouter } from "~/server/api/trpc";
import { teamRouter } from "~/server/api/routers/team";
import { memberRouter } from "./routers/member";
import { teamMemberRouter } from "./routers/teamMember";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  team: teamRouter,
  member: memberRouter,
  teamMember: teamMemberRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
