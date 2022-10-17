import { model, Schema, Document } from 'mongoose';
import { Visites } from '@/interfaces/visites.interface';

const theethSchema: Schema = new Schema({
  toothNumber: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const visitesSchema: Schema = new Schema({
  pationId: {
    type: String,
    required: true,
  },
  observation: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  theeths: [theethSchema],
});

const visitesModel = model<Visites & Document>('Visites', visitesSchema);

export default visitesModel;
