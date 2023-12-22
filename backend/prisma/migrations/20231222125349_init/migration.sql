-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eth_address" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eth_address" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "User_eth_address_key" ON "User"("eth_address");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");
