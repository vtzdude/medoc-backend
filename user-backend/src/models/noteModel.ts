import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Note', noteSchema);
