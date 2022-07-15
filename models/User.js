import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    required: [true, 'Insira seu nome de usuário :)'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Insira sua senha :)'],
  },
});

mongoose.models = {};

var User = mongoose.model('User', User);

export default User;
