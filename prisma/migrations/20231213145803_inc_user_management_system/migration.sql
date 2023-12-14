/*
  Warnings:

  - You are about to drop the column `name` on the `TeamMember` table. All the data in the column will be lost.

*/
-- AlterSequence
ALTER SEQUENCE "Post_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "name";
