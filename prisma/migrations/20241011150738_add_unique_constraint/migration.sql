/*
  Warnings:

  - Added the required column `updatedAt` to the `Machine` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Machine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "machineId" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Machine" ("createdAt", "id", "machineId", "publicKey") SELECT "createdAt", "id", "machineId", "publicKey" FROM "Machine";
DROP TABLE "Machine";
ALTER TABLE "new_Machine" RENAME TO "Machine";
CREATE UNIQUE INDEX "Machine_machineId_key" ON "Machine"("machineId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
