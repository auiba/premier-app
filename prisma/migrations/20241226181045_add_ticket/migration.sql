-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "send" DOUBLE PRECISION NOT NULL,
    "sendCurrency" TEXT NOT NULL,
    "receive" DOUBLE PRECISION NOT NULL,
    "receiveCurrency" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bankstring" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
