import { model, Schema, Document } from 'mongoose';
import { Office } from '@/interfaces/offices.interface';

const officeSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    officeName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const officeModel = model<Office & Document>('Offices', officeSchema);

export default officeModel;
