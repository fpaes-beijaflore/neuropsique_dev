import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var Patient = new Schema({
  fullname: {
    type: String,
    required: [true, 'Insira o nome completo do paciente.'],
  },
  birthday: {
    type: Date,
    required: [true, 'Insira a data de nascimento do paciente.'],
  },
  telephone: {
    type: String,
    required: [true, 'Insira o telefone do paciente.'],
  },
  address: {
    type: String,
    required: [true, 'Insira o endereço do paciente.'],
  },
  email: {
    type: String,
    required: [true, 'Insira o email do paciente.'],
  },
  serviceType: {
    type: Number,
    required: [true, 'Insira o tipo de atendimento.'],
  },
  healthPlanName: {
    type: String,
  },
  healthPlanValue: {
    type: Number,
  },
  status: {
    type: Number,
    required: [true, 'Selecione o status do paciente.'],
  },
  documents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Document',
    },
  ],
});

mongoose.models = {};

var Patient = mongoose.model('Patient', Patient);

export default Patient;
