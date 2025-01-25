import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    status: { type: String, required: true, enum: ['SUCCESS', 'FAILURE'] },
    ip: { type: String, required: false },
    details: { type: Object, required: false },
  },
  { timestamps: true }
);

export default mongoose.model('AuditLog', auditLogSchema);
