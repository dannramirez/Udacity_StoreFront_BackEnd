CREATE TABLE IF NOT EXISTS "Users" (
    "id" uuid DEFAULT uuid_generate_v1 (),
    "username" VARCHAR(25) NOT NULL,
    "firstName" VARCHAR(25) NOT NULL,
    "lastName" VARCHAR(25) NOT NULL,
    "password" TEXT NOT NULL,
    
    PRIMARY KEY ("id"),

    CONSTRAINT unique_username UNIQUE (username)
);