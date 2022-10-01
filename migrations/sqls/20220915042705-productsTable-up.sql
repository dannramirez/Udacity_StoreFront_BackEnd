CREATE TABLE IF NOT EXISTS "Products"(
    "id" uuid DEFAULT uuid_generate_v1(),
    "name" VARCHAR(25) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" VARCHAR(25) NOT NULL,

    PRIMARY KEY("id")
);