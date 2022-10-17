import { model, Schema, Document } from 'mongoose';
import { Pations } from '@/interfaces/pations.interface';

const pationsSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cardiovasculaires: {
    type: String,
    required: true,
  },
  hematologiques: {
    type: String,
    required: true,
  },
  endocriniennes: {
    type: String,
    required: true,
  },
  allergies: {
    type: String,
    required: true,
  },
  nerveux: {
    type: String,
    required: true,
  },
  autre: {
    type: String,
  },
});

const pationsModel = model<Pations & Document>('Pation', pationsSchema);

export default pationsModel;
