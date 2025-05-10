-- CreateTable
CREATE TABLE "Donasi" (
    "id" SERIAL NOT NULL,
    "nama_donatur" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "nominal" DECIMAL(15,2) NOT NULL,
    "deskripsi" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donasi_pkey" PRIMARY KEY ("id")
);
