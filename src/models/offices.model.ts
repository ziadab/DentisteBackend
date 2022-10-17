import { model, Schema, Document } from 'mongoose';
import { Office } from '@/interfaces/offices.interface';

const officeSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
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
});

const officeModel = model<Office & Document>('Offices', officeSchema);

export default officeModel;
