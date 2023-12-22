-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eth_address" TEXT NOT NULL,
    "nickname" TEXT,
    "email_address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email_address", "eth_address", "id", "nickname") SELECT "createdAt", "email_address", "eth_address", "id", "nickname" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_eth_address_key" ON "User"("eth_address");
CREATE UNIQUE INDEX "User_email_address_key" ON "User"("email_address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
