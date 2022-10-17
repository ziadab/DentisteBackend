import { model, Schema, Document } from 'mongoose';
import { Ordonance } from '@/interfaces/ordonances.interface';

const drugsSchema: Schema = new Schema({
  when: {
    type: Number,
    required: true,
  },
  drugName: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  potion: {
    type: String,
    required: true,
  },
});

const ordonanceSchema: Schema = new Schema({
  pationId: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  drugs: [drugsSchema],
});

const ordonanceModel = model<Ordonance & Document>('Ordonance', ordonanceSchema);

export default ordonanceModel;
