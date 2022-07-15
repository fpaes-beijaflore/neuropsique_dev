import * as jwt from 'jsonwebtoken';

import Cors from 'cors';
import Document from '../../../../models/Document';
import connectDB from '../../../../util/mongodb';
import initMiddleware from '../../../../lib/init-middleware';
import { promisify } from 'util';

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

  const { method } = req;
  const authHeader = req.headers.authorization;

  switch (method) {
    case 'DELETE':
      try {
        const { _id } = req.query;

        if (!authHeader) {
          return res.status(200).json({
            success: false,
            error: 'Token não informado, faça login novamente!',
          });
        }

        const [, token] = authHeader.split(' ');

        try {
          const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

          req.userId = decoded.id;
        } catch (err) {
          return res
            .status(200)
            .json({ success: false, error: 'Token inválido, faça login novamente!' });
        }

        const document = await Document.findOneAndDelete({ _id });

        res.status(200).json({
          success: true,
          message: `O documento ${document.filename} foi excluido com sucesso!`,
        });
      } catch (err) {
        res.status(400).json({ err: err.message });
      }
      break;

    default:
      return null;
  }
}

export default connectDB(handler);
