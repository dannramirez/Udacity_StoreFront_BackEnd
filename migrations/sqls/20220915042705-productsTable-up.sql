CREATE TABLE IF NOT EXISTS "Products"(
    "id" uuid DEFAULT uuid_generate_v1(),
    "name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" VARCHAR(25) NOT NULL,

    PRIMARY KEY("id"),

    CONSTRAINT unique_name UNIQUE (name)
);