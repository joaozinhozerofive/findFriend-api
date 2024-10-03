/*
  Warnings:

  - You are about to alter the column `cep` on the `orgs` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "cep" SET DATA TYPE VARCHAR(8);
