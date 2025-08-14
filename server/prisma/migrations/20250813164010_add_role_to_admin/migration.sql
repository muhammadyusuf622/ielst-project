/*
  Warnings:

  - Added the required column `role` to the `Admin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('Admin');

-- AlterTable
ALTER TABLE "public"."Admin" ADD COLUMN     "role" VARCHAR(10) NOT NULL;
