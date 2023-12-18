/*
  Warnings:

  - You are about to drop the column `id` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `TeamMember` table. All the data in the column will be lost.
  - The required column `memberId` was added to the `Member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `teamId` was added to the `Team` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `teamMemberId` was added to the `TeamMember` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
ALTER TABLE "Team"
RENAME COLUMN "id" TO "teamId";
ALTER TABLE "Member"
RENAME COLUMN "id" TO "memberId";
ALTER TABLE "TeamMember"
RENAME COLUMN "id" TO "teamMemberId";