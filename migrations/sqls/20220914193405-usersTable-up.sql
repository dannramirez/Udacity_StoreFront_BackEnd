CREATE TABLE IF NOT EXISTS "User" (
    "id" uuid DEFAULT uuid_generate_v1 (),
    "userName" VARCHAR(25) NOT NULL,
    "nombre" VARCHAR(25) NOT NULL,
    "password" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);