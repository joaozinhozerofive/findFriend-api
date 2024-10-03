-- AlterTable
ALTER TABLE "orgs" ALTER COLUMN "is_donor" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pets" ALTER COLUMN "is_available" DROP NOT NULL,
ALTER COLUMN "created_at" DROP NOT NULL;
