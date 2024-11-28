-- CreateTable
CREATE TABLE "AdminPhone" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "AdminPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crypto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "crypto" TEXT NOT NULL,
    "commission" INTEGER NOT NULL,
    "fee" INTEGER NOT NULL,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "send" DOUBLE PRECISION NOT NULL,
    "sendCurrency" TEXT NOT NULL,
    "receive" DOUBLE PRECISION NOT NULL,
    "receiveCurrency" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);
