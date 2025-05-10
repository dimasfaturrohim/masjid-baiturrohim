-- CreateTable
CREATE TABLE "Kajian" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "waktu" TEXT NOT NULL,
    "deskripsi" TEXT,
    "content" TEXT,
    "imageUrl" TEXT,
    "linkYoutube" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kajian_pkey" PRIMARY KEY ("id")
);
