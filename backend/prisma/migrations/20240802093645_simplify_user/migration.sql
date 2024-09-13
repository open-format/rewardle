/*
  Warnings:

  - You are about to drop the `Challenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `email_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `eth_address` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Token_refresh_token_key";

-- DropIndex
DROP INDEX "Token_access_token_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Challenge";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Token";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nickname" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("created_at", "id", "nickname") SELECT "created_at", "id", "nickname" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
