/*main Controller Express*/
// import {Request, Response} from 'express';
import dbConection from '../utilities/dbConection';
import chalk from 'chalk';
import Debug from 'debug';
import {hashPassword, validatePassword} from '../utilities/hash_validate_password';

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
    try {
      const conectionDB = await dbConection.connect();
      const sql = 'SELECT * FROM "public"."Users"';
      const result = await conectionDB.query(sql);

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: 24 user.ts ~ Users ~ Index Users'));

      return result.rows;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Index Users'));
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM "public"."Users" WHERE id=($1)';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ Show Users'));

      return result.rows[0];
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Show Users'));
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO "public"."Users" ("username","firstName", "lastName", "password") VALUES ($1, $2, $3, $4) RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [
        u.username,
        u.firstName,
        u.lastName,
        hashPassword(u.password),
      ]);
      const user = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ Create Users'));

      return user;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Create Users'));
      throw new Error(`Could not add new user ${u.firstName}. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const sql = 'SELECT password FROM "public"."Users" WHERE username=($1)';
      const conectionDB = await dbConection.connect();
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
      conectionDB.release(true);
      return null;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ authenticate Users'));
      throw new Error(`Could not authenticate user ${username}. Error: ${err}`);
    }
  }

  async update(u: User): Promise<User> {
    try {
      const sql =
        'UPDATE "public"."Users" set "username"=$1 "firstName"= $2, "lastName"= $3, "password"= $4 WHERE id = $5 RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [
        u.username,
        u.firstName,
        u.lastName,
        u.password,
        u.id,
      ]);
      const user = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ update Users'));

      return user;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ update Users'));
      throw new Error(`Could not update user ${u.firstName}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM "public"."Users" WHERE id=($1) RETURNING *';
      const conectionDB = await dbConection.connect();
      const result = await conectionDB.query(sql, [id]);
      const user = result.rows[0];

      conectionDB.release(true);
      debug(chalk.green('🚀 ~ file: user.ts ~ Users ~ Delete Users'));

      return user;
    } catch (err) {
      debug(chalk.red('🚀 ~ file: user.ts ~ Users ~ Delete Users'));
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
