-- DropForeignKey
ALTER TABLE "FaveAlbum" DROP CONSTRAINT "FaveAlbum_albumId_fkey";

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "faveAlbumAlbumId" UUID;

-- CreateTable
CREATE TABLE "Track" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "artistId" UUID,
    "albumId" UUID,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaveTrack" (
    "trackId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Track_artistId_key" ON "Track"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_key" ON "Track"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "FaveTrack_trackId_key" ON "FaveTrack"("trackId");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_faveAlbumAlbumId_fkey" FOREIGN KEY ("faveAlbumAlbumId") REFERENCES "FaveAlbum"("albumId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaveAlbum" ADD CONSTRAINT "FaveAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaveTrack" ADD CONSTRAINT "FaveTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
