import * as jwt from 'jsonwebtoken';

import Cors from 'cors';
import Document from '../../../models/Document';
import connectDB from '../../../util/mongodb';
import initMiddleware from '../../../lib/init-middleware';
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
    case 'GET':
      try {
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

        const patients = await Patient.find({}).sort({ _id: -1 });
        res.status(200).json(patients);
      } catch (err) {
        res.status(400).json({ err: err.message });
      }
      break;

    case 'POST':
      try {
        const { belongsTo, filename, url, type, date } = req.body;

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
          return res.status(401).json({ message: 'Token inválido' });
        }

        if (!belongsTo) {
          return res.status(200).json({
            success: false,
            error: 'Paciente não encontrado!',
          });
        }

        if (!filename) {
          return res.status(200).json({
            success: false,
            error: 'Nome do arquivo inválido!',
          });
        }

        if (!url) {
          return res.status(200).json({
            success: false,
            error: 'URL do arquivo inválido!',
          });
        }

        if (!type) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o tipo do documento',
          });
        }

        if (!date) {
          return res.status(200).json({
            success: false,
            error: 'Preencha a data do documento',
          });
        }

        try {
          const document = await Document.create({
            belongsTo,
            filename,
            url,
            type,
            date,
          });

          res.status(201).json({ success: true, data: document });
        } catch (error) {
          res.status(400).json({ success: false, data: error.message });
        }
      } catch (err) {
        return res.status(400).json({ err: err.message });
      }
      break;

    default:
  }
}

export default connectDB(handler);
