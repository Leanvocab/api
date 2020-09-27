import mongoose from 'mongoose';

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
};

export { connectDb };
