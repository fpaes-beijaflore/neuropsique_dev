import mongoose from 'mongoose';

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections.readyState === 1) {
    console.log(mongoose.connections.readyState);
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
  return handler(req, res);
};

export default connectDB;