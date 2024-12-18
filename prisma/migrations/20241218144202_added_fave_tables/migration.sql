-- CreateTable
CREATE TABLE "FaveArtist" (
    "artistId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "FaveAlbum" (
    "albumId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FaveArtist_artistId_key" ON "FaveArtist"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "FaveAlbum_albumId_key" ON "FaveAlbum"("albumId");

-- AddForeignKey
ALTER TABLE "FaveArtist" ADD CONSTRAINT "FaveArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaveAlbum" ADD CONSTRAINT "FaveAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
