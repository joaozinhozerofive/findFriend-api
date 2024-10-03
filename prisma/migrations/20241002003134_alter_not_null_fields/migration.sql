/*
  Warnings:

  - You are about to drop the column `cpf` on the `orgs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "orgs_cpf_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "cpf",
ALTER COLUMN "cep" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "age" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL;
