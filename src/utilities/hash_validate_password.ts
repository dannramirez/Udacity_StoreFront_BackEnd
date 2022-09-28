import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const {BCRYPY_PASSWORD: pepper, SALT_ROUNDS: saltRounds} = process.env;

const salt = bcrypt.genSaltSync(parseInt(saltRounds!, 10));

const hashPassword = (password: string) => {
  console.log(salt);
  return bcrypt.hashSync(password + pepper, salt);
};

const validatePassword = (password: string, password_digest: string) => {
  return bcrypt.compareSync(password + pepper, password_digest);
};

export {hashPassword, validatePassword};
