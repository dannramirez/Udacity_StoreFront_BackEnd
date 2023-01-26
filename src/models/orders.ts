import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
import {PoolClient} from 'pg';

const debug = Debug('API:Models:Orders');

export type Order = {
  id: string;
  user_id: string;
  orderStatus: string;
};

export type OrderProduct = {
  product_id: string;
  order_id: string;
  quantity: number;
};

export class OrdersCRUD {
  async index(): Promise<Order[]> {
    let conectionDB: PoolClient | null = null;

    try {
      conectionDB = await dbConection.connect();
      const sql = 'SELECT * FROM "public"."Orders"';
      const result = await conectionDB.query(sql);

      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Index Orders'));

      return result.rows;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Index Orders'));
      throw new Error(`Could not get Orders. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async show(id: string): Promise<Order | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'SELECT * FROM "public"."Orders" WHERE id=($1)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async create(o: Order): Promise<Order> {
    let conectionDB: PoolClient | null = null;

    console.log(o);
    try {
      const sql =
        'INSERT INTO "public"."Orders" ("orderStatus", "user_id") VALUES ($1, $2) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [o.orderStatus, o.user_id]);
      const order = result.rows[0];

      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Create Orders'));

      return order;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Create Orders'));
      throw new Error(`Could not add new order from user ${o.user_id}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async update(o: Order): Promise<Order> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql =
        'UPDATE "public"."Orders" set "orderStatus"=$1, "user_id"= $2 WHERE id = $3 RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [o.orderStatus, o.user_id, o.id]);
      const order = result.rows[0];

      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ update Orders'));

      return order;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ update Orders'));
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'DELETE FROM "public"."Orders" WHERE id=($1) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: user.ts ~ Orders ~ Delete Orders'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Delete Orders'));
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async addProduct(op: OrderProduct): Promise<OrderProduct> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql =
        'INSERT INTO "public"."ProductsOnOrders" (product_id, order_id , quantity) VALUES ($1, $2, $3) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [op.product_id, op.order_id, op.quantity]);
      const orderProducts = result.rows[0];
      debug(chalk.green('🚀 ~ file: OrderProduct.ts ~ OrderProduct ~ Create OrderProduct'));

      return orderProducts;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: OrderProduct.ts ~ OrderProduct ~ Create OrderProduct'));
      throw new Error(
        `Could not add new OrderProduct ${op.product_id} ${op.order_id}. Error: ${err}`
      );
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async updateQtyProduct(op: OrderProduct): Promise<OrderProduct> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql =
        'UPDATE "public"."ProductsOnOrders" set "quantity"= $1 WHERE "product_id"= $2 and "order_id"=$3 RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [op.quantity, op.product_id, op.order_id]);
      const orderProducts = result.rows[0];

      debug(chalk.green('🚀 ~ file: OrderProduct.ts ~ OrderProduct ~ update updateQtyProduct'));

      return orderProducts;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: OrderProduct.ts ~ OrderProduct ~ update updateQtyProduct'));
      throw new Error(
        `Could not update OrderProduct  ${op.product_id} ${op.order_id}. Error: ${err}`
      );
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async removeProduct(op: OrderProduct): Promise<OrderProduct | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql =
        'DELETE FROM "public"."ProductsOnOrders" WHERE product_id=($1) and order_id=($2) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [op.product_id, op.order_id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: OrderProduct.ts ~ Orders ~ Delete OrderProduct'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: OrderProduct.ts ~ Orders ~ Delete OrderProduct'));
      throw new Error(
        `Could not delete OrderProduct  ${op.product_id} ${op.order_id}. Error: ${err}`
      );
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }

  async updateStatus(o: Order): Promise<Order> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'UPDATE "public"."Orders" set "orderStatus"=$1 WHERE id = $2 RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [o.orderStatus, o.id]);
      const order = result.rows[0];

      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ update Orders'));

      return order;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ update Orders'));
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: orders.ts ~ OrdersCRUD ~ Release conection'));
      }
    }
  }