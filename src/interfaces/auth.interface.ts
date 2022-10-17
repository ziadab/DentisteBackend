import { Request } from 'express';
import { Office } from '@/interfaces/offices.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Office;
}
