import * as jwt from 'jsonwebtoken';

import Cors from 'cors';
import Patient from '../../../models/Patient';
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
        const {
          fullname,
          birthday,
          telephone,
          address,
          email,
          serviceType,
          healthPlanName,
          healthPlanValue,
          status,
        } = req.body;

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

        if (!fullname) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o nome do paciente',
          });
        }

        if (!birthday) {
          return res.status(200).json({
            success: false,
            error: 'Preencha a idade do paciente',
          });
        }

        if (!telephone) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o telefone do paciente',
          });
        }

        if (!address) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o endereço do paciente',
          });
        }

        if (!email) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o email do paciente',
          });
        }
        if (!serviceType) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o tipo de atendimento',
          });
        }
        if (status === null || status === undefined || !status) {
          return res.status(200).json({
            success: false,
            error: 'Selecione o status do paciente',
          });
        }

        if ((serviceType == 1 && !healthPlanName) || (serviceType == 1 && !healthPlanValue)) {
          return res.status(200).json({
            success: false,
            error: 'Preencha os campos Nome do Plano e Valor de Repasse',
          });
        }

        if (healthPlanName && healthPlanValue) {
          try {
            const patient = await Patient.create({
              fullname,
              birthday,
              telephone,
              address,
              email,
              serviceType,
              healthPlanName,
              healthPlanValue,
              status,
            });

            res.status(201).json({ success: true, data: patient });
          } catch (error) {
            res.status(400).json({ success: false, data: error.message });
          }
        } else {
          try {
            const patient = await Patient.create({
              fullname,
              birthday,
              telephone,
              address,
              email,
              serviceType,
              status,
            });

            res.status(201).json({ success: true, data: patient });
          } catch (error) {
            res.status(400).json({ success: false, data: error.message });
          }
        }
      } catch (err) {
        return res.status(400).json({ err: err.message });
      }
      break;

    case 'PUT':
      try {
        const {
          fullname,
          birthday,
          telephone,
          address,
          email,
          serviceType,
          healthPlanName,
          healthPlanValue,
          status,
        } = req.body;

        const { _id } = req.headers;

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

        if (!fullname) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o nome do paciente',
          });
        }

        if (!birthday) {
          return res.status(200).json({
            success: false,
            error: 'Preencha a idade do paciente',
          });
        }

        if (!telephone) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o telefone do paciente',
          });
        }

        if (!address) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o endereço do paciente',
          });
        }

        if (!email) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o email do paciente',
          });
        }
        if (serviceType === null || serviceType === undefined) {
          return res.status(200).json({
            success: false,
            error: 'Preencha o tipo de atendimento',
          });
        }
        if (status === null || status === undefined || !status) {
          return res.status(200).json({
            success: false,
            error: 'Selecione o status do paciente',
          });
        }

        if ((serviceType == 1 && !healthPlanName) || (serviceType == 1 && !healthPlanValue)) {
          return res.status(200).json({
            success: false,
            error: 'Preencha os campos Nome do Plano e Valor de Repasse',
          });
        }

        if (healthPlanName && healthPlanValue) {
          try {
            const patient = await Patient.findOneAndUpdate(
              { _id },
              {
                fullname,
                birthday,
                telephone,
                address,
                email,
                serviceType,
                healthPlanName,
                healthPlanValue,
                status,
              }
            );

            res.status(201).json({ success: true, data: patient });
          } catch (error) {
            res.status(401).json({ success: false, data: error.message });
          }
        } else {
          try {
            const patient = await Patient.findOneAndUpdate(
              { _id },
              {
                fullname,
                birthday,
                telephone,
                address,
                email,
                serviceType,
                status,
              }
            );

            res.status(201).json({ success: true, data: patient });
          } catch (error) {
            res.status(401).json({ success: false, data: error.message });
          }
        }
      } catch (err) {
        return res.status(400).json({ err: err.message });
      }
      break;

    default:
  }
}

export default connectDB(handler);
