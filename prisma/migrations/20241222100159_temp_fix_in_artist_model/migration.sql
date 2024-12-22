/*
  Warnings:

  - You are about to drop the column `faveAlbumAlbumId` on the `Artist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_faveAlbumAlbumId_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "faveAlbumAlbumId";
