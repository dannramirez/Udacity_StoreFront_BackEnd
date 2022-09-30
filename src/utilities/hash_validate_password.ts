import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const {BCRYPY_PASSWORD: pepper, SALT_ROUNDS: saltRounds} = process.env;

const salt = bcrypt.genSaltSync(parseInt(saltRounds as string, 10));

const hashPassword = (password: string) => {
  console.log(salt);
  return bcrypt.hashSync(`${password}${pepper as string}`, salt);
};

const validatePassword = (password: string, password_digest: string) => {
  return bcrypt.compareSync(`${password}${pepper as string}`, password_digest);
};

export {hashPassword, validatePassword};
