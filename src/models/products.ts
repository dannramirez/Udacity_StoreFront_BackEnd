import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
import {PoolClient} from 'pg';

const debug = Debug('API:Models:Products');

export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
};

export class ProductCRUD {
  async index(): Promise<Product[]> {
    let conectionDB: PoolClient | null = null;

    try {
      conectionDB = await dbConection.connect();
      const sql = 'SELECT * FROM "public"."Products"';
      const result = await conectionDB.query(sql);

      debug(chalk.green('🚀 ~ file: product.ts ~ Product ~ Index Product'));
      return result.rows as Product[];
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Product ~ Index Product'));
      throw new Error(`Could not get Products. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  async show(id: string): Promise<Product | null> {
    let conectionDB: PoolClient | null = null;
    try {
      const sql = 'SELECT * FROM "public"."Products" WHERE id=($1)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: Product.ts ~ Products ~ Show Products'));
        return result.rows[0] as Product;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: Product.ts ~ Products ~ Show Products'));
      throw new Error(`Could not find order ${id}. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  async create(p: Product): Promise<Product> {
    let conectionDB: PoolClient | null = null;
    try {
      const sql =
        'INSERT INTO "public"."Products" (category, name, price) VALUES ($1, $2, $3) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [p.category, p.name, p.price]);
      const product = result.rows[0] as Product;

      debug(chalk.green('🚀 ~ file: product.ts ~ Products ~ Create Products'));

      return product;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Products ~ Create Products'));
      throw new Error(`Could not add new product ${p.name}. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  async update(p: Product): Promise<Product> {
    let conectionDB: PoolClient | null = null;
    try {
      const sql =
        'UPDATE "public"."Products" set "category"=$1 "name"= $2 "price"= $3 WHERE id = $4 RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [p.category, p.name, p.price, p.id]);
      const product = result.rows[0] as Product;

      debug(chalk.green('🚀 ~ file: product.ts ~ Products ~ update Products'));

      return product;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Products ~ update Products'));
      throw new Error(`Could not update producdt ${p.name}. Error: ${err as string}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: product.ts ~ Product ~ Release conection'));
      }
    }
  }

  async delete(id: string): Promise<Product | null> {
    let conectionDB: PoolClient | null = null;
    try {
      const sql = 'DELETE FROM "public"."Products" WHERE id=($1) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: product.ts ~ Products ~ Delete Products'));
        return result.rows[0] as Product;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Products ~ Delete Products'));
      throw new Error(`Could not delete product ${id}. Error: ${err as string}`);
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
