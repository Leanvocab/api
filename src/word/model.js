import mongoose from 'mongoose';
 
const wordSchema = new mongoose.Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
 
const wordModel = mongoose.model('words', wordSchema);
 
export default wordModel;
