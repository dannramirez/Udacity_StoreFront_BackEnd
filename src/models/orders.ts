import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';

const debug = Debug('API:Models:Orders');

export type Order = {
  id: string;
  user_id: string;
  orderStatus: string;
};

export class OrdersCRUD {
  async index(): Promise<Order[]> {
    try {
      const conectionDB = await dbConection.connect();
      const sql = 'SELECT * FROM "public"."Orders"';
      const result = await conectionDB.query(sql);

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Index Orders'));

      return result.rows;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Index Orders'));
      throw new Error(`Could not get Orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order | null> {
    try {
      const sql = 'SELECT * FROM "public"."Orders" WHERE id=($1)';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);
      conectionDB.release(true);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    console.log(o);
    try {
      const sql =
        'INSERT INTO "public"."Orders" ("orderStatus", "user_id") VALUES ($1, $2) RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [o.orderStatus, o.user_id]);
      const order = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Create Orders'));

      return order;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Create Orders'));
      throw new Error(`Could not add new order from user ${o.user_id}. Error: ${err}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      const sql =
        'UPDATE "public"."Orders" set "orderStatus"=$1, "user_id"= $2 WHERE id = $3 RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [o.orderStatus, o.user_id, o.id]);
      const order = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ update Orders'));

      return order;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ update Orders'));
      throw new Error(`Could not update order ${o.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Order | null> {
    try {
      const sql = 'DELETE FROM "public"."Orders" WHERE id=($1) RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);
      conectionDB.release(true);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: user.ts ~ Orders ~ Delete Orders'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Delete Orders'));
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
