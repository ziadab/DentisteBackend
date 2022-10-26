import { Request } from 'express';
import { Office } from '@/interfaces/offices.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
}

export interface RequestWithOffice extends Request {
  office: Office;
}
