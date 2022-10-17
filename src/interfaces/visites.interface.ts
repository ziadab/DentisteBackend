import { Teeths } from './teeths.interface';

export interface Visites {
  _id: string;
  pationId: string;
  observation: string;
  date: Date;
  teeths: Teeths[];
}
