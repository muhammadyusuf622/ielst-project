/*
  Warnings:

  - The `role` column on the `Admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."UserRoles" AS ENUM ('Admin', 'User');

-- AlterTable
ALTER TABLE "public"."Admin" DROP COLUMN "role",
ADD COLUMN     "role" "public"."UserRoles" NOT NULL DEFAULT 'Admin';

-- DropEnum
DROP TYPE "public"."Roles";
