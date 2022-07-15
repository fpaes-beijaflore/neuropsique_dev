import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var Document = new Schema({
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
  },
  filename: {
    type: String,
  },
  url: {
    type: String,
  },
  type: {
    type: Number,
  },
  date: {
    type: Date,
  },
});

mongoose.models = {};

var Document = mongoose.model('Document', Document);

export default Document;
