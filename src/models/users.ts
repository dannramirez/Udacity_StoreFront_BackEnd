import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
import {hashPassword, validatePassword} from '../utilities/hash_validate_password';
import {PoolClient} from 'pg';

const debug = Debug('API:Models:User');

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class UsersCRUD {
  async index(): Promise<User[]> {
    let conectionDB: PoolClient | null = null;

    try {
      conectionDB = await dbConection.connect();
      const sql = 'SELECT * FROM "public"."Users"';
      const result = await conectionDB.query(sql);

      debug(chalk.green('🚀 ~ file: 24 user.ts ~ Users ~ Index Users'));

      return result.rows;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Index Users'));
      throw new Error(`Could not get users. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: users.ts: ~ UsersCRUD ~ Release conection'));
      }
    }
  }

  async show(id: string): Promise<User | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'SELECT * FROM "public"."Users" WHERE id=($1)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ Show Users'));
      if (result.rows.length) {
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Show Users'));
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: users.ts: ~ UsersCRUD ~ Release conection'));
      }
    }
  }

  async create(u: User): Promise<User> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql =
        'INSERT INTO "public"."Users" ("username","firstName", "lastName", "password") VALUES ($1, $2, $3, $4) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [
        u.username,
        u.firstName,
        u.lastName,
        hashPassword(u.password),
      ]);
      const user = result.rows[0];

      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ Create Users'));

      return user;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Create Users'));
      throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: users.ts: ~ UsersCRUD ~ Release conection'));
      }
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'SELECT password FROM "public"."Users" WHERE username=($1)';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [username]);
      const encrypted_password = result.rows[0].password;

      if (result.rows.length) {
        if (validatePassword(password, encrypted_password)) {
          const sql = 'SELECT * FROM "public"."Users" WHERE username=($1)';
          const result = await conectionDB.query(sql, [username]);
          const user = result.rows[0];

          debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ authenticate Users'));

          return user;
        }
        return null;
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ authenticate Users'));
      throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: users.ts: ~ UsersCRUD ~ Release conection'));
      }
    }
  }

  async update(u: User): Promise<User> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql =
        'UPDATE "public"."Users" set "username"=$1, "firstName"= $2, "lastName"= $3, "password"= $4 WHERE id = $5 RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [
        u.username,
        u.firstName,
        u.lastName,
        hashPassword(u.password),
        u.id,
      ]);
      const user = result.rows[0];

      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ update Users'));

      return user;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ update Users'));
      throw new Error(`Could not update user ${u.firstName}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: users.ts: ~ UsersCRUD ~ Release conection'));
      }
    }
  }

  async delete(id: string): Promise<User | null> {
    let conectionDB: PoolClient | null = null;

    try {
      const sql = 'DELETE FROM "public"."Users" WHERE id=($1) RETURNING *';
      conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      if (result.rows.length) {
        debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ Delete Users'));
        return result.rows[0];
      }
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Delete Users'));
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    } finally {
      if (conectionDB !== null) {
        conectionDB.release(true);
        debug(chalk.magenta('🚀 ~ file: users.ts: ~ UsersCRUD ~ Release conection'));
      }
    }
  }
}
