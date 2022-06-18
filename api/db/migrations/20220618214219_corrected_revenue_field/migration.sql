/*
  Warnings:

  - You are about to drop the column `customer_id` on the `Revenue` table. All the data in the column will be lost.
  - You are about to drop the column `seasson_id` on the `Revenue` table. All the data in the column will be lost.
  - Added the required column `customer` to the `Revenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `revenue` to the `Revenue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seasson` to the `Revenue` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Revenue" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "seasson" TEXT NOT NULL,
    "revenue" DECIMAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Revenue" ("created_at", "id", "title") SELECT "created_at", "id", "title" FROM "Revenue";
DROP TABLE "Revenue";
ALTER TABLE "new_Revenue" RENAME TO "Revenue";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
