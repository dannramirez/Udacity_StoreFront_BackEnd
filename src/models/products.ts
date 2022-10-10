import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';

const debug = Debug('API:Models:Products');

export type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
};

export class ProductCRUD {
  async index(): Promise<Product[]> {
    try {
      const conectionDB = await dbConection.connect();
      const sql = 'SELECT * FROM "public"."Products"';
      const result = await conectionDB.query(sql);

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: product.ts ~ Product ~ Index Product'));

      return result.rows;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Product ~ Index Product'));
      throw new Error(`Could not get Products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product | null> {
    try {
      const sql = 'SELECT * FROM "public"."Products" WHERE id=($1)';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      conectionDB.release(true);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: Product.ts ~ Products ~ Show Products'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: Product.ts ~ Products ~ Show Products'));
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO "public"."Products" (category, name, price) VALUES ($1, $2, $3) RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [p.category, p.name, p.price]);
      const product = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: product.ts ~ Products ~ Create Products'));

      return product;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Products ~ Create Products'));
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  async update(p: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE "public"."Products" set "category"=$1 "name"= $2 "price"= $3 WHERE id = $4 RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [p.category, p.name, p.price, p.id]);
      const product = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: product.ts ~ Products ~ update Products'));

      return product;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Products ~ update Products'));
      throw new Error(`Could not update producdt ${p.name}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Product | null> {
    try {
      const sql = 'DELETE FROM "public"."Products" WHERE id=($1) RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      conectionDB.release(true);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: product.ts ~ Products ~ Delete Products'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: product.ts ~ Products ~ Delete Products'));
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
