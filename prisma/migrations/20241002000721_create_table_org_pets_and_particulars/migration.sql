-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "animal" VARCHAR(50) NOT NULL,
    "breed" VARCHAR(50),
    "about" VARCHAR(500) NOT NULL,
    "age" VARCHAR(25) NOT NULL,
    "weight" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "particulars" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "pet_id" TEXT NOT NULL,

    CONSTRAINT "particulars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "surname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" TEXT NOT NULL,
    "whatsapp" VARCHAR(20) NOT NULL,
    "cep" TEXT NOT NULL,
    "street" VARCHAR(100),
    "state" TEXT NOT NULL,
    "neighborhood" VARCHAR(100),
    "city" VARCHAR(100) NOT NULL,
    "is_donor" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_cpf_key" ON "orgs"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");
