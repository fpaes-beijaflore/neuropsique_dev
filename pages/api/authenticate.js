import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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

    if (!username || !password) {
      return res.status(200).json({ success: false, error: 'Insira o nome do usuário e a senha' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(200).json({ success: false, error: 'Usuário não cadastrado' });
    }

    const hashed = bcrypt.compareSync(password, user.password);

    if (!hashed) {
      return res.status(200).json({ success: false, error: 'Senha inválida' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 36000,
    });

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
}

export default connectDB(handler);
