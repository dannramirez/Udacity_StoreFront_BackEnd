CREATE TABLE IF NOT EXISTS "ProductsOnOrders" (
    "product_id" uuid NOT NULL,
    "order_id" uuid NOT NULL,
    "quantity" INTEGER,
    PRIMARY KEY ("product_id", "order_id"),

    CONSTRAINT "fk_product" FOREIGN KEY ("product_id") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "fk_order" FOREIGN KEY ("order_id") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE

);