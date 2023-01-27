import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
import {Order} from '../models/orders';

const debug = Debug('API:Services:Dashboards');

export class Dashboard {
  async showCurrentFromUser(id: string): Promise<Order | null> {
    try {
      const sql = 'SELECT * FROM "public"."Orders"  WHERE id=($1)';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);
      conectionDB.release(true);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
        return result.rows[0] as Order;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
      throw new Error(`Could not find current order ${id}. Error: ${err as string}`);
    }
  }

  async showCompletedFromUser(id: string): Promise<Order | null> {
    try {
      const sql = 'SELECT * FROM "public"."ProductsOnOrders" WHERE productID=($1) and orderId=($2)';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      conectionDB.release(true);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
        return result.rows[0] as Order;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: OrderProduct.ts ~ OrderProduct ~ Show OrderProduct'));
      throw new Error(`Could not find Completed orders from ${id}. Error: ${err as string}`);
    }
  }
}
