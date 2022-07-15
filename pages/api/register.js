import * as bcrypt from 'bcrypt';

import Cors from 'cors';
import User from '../../models/User';
import connectDB from '../../util/mongodb';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

async function handler(req, res) {
  await cors(req, res);
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(401).send('Insira o nome do usuário');
    }

    if (!password) {
      return res.status(401).send('Insira uma senha');
    }

    bcrypt.hash(password, 8, (err, hash) => {
      if (err) throw err;

      User.create({
        username,
        password: hash,
      });
      return res.status(200).send('Usuário cadastrado!');
    });
  } catch (error) {
    return error;
  }
}

export default connectDB(handler);
