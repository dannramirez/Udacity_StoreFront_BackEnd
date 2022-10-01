CREATE TABLE IF NOT EXISTS "Orders"(
    "id" uuid DEFAULT uuid_generate_v1(),
    "user_id" uuid,
    "orderStatus" VARCHAR(25) NOT NULL,

    PRIMARY KEY ("id"),
    
    CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE

);