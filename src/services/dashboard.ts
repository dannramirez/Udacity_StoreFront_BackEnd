import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
import {Order} from '../models/orders';
import {Product} from '../models/products';
import {PoolClient} from 'pg';

const debug = Debug('API:Services:Dashboards');

export class Dashboard {
  async showCurrentFromUser(id: string): Promise<Order | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'SELECT * FROM "public"."Orders"  WHERE id=($1)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
        return result.rows[0] as Order;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
      throw new Error(`Could not find current order ${id}. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  async showCompletedFromUser(id: string): Promise<Order | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'SELECT * FROM "public"."ProductsOnOrders" WHERE productID=($1) and orderId=($2)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: orders.ts ~ Orders ~ Show Orders'));
        return result.rows[0] as Order;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: OrderProduct.ts ~ OrderProduct ~ Show OrderProduct'));
      throw new Error(`Could not find Completed orders from ${id}. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  /**
   * Todo: Make SQL script for topList and byCategory Methods in model
   */

  async topList(): Promise<Product | null> {
    let conectionDB: PoolClient | null = null;
    try {
      const sql = 'SELECT * FROM "public"."Products"';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: Product.ts ~ Products ~ topList Products'));
        return result.rows[0] as Product;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: Product.ts ~ Products ~ topList Products'));
      throw new Error(`Could not find products. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  async byCategory(category: string): Promise<Product | null> {
    let conectionDB: PoolClient | null = null;
    try {
      const sql = 'SELECT * FROM "public"."Products" WHERE id=($1)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [category]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: Product.ts ~ Products ~ byCategory Products'));
        return result.rows[0] as Product;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: Product.ts ~ Products ~ byCategory Products'));
      throw new Error(`Could not find products belongs to category. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }
}
