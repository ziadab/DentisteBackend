import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { CreateOfficeDto, Login } from '@/dtos/offices.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken } from '@interfaces/auth.interface';
import { Office } from '@/interfaces/offices.interface';
import officeModel from '@/models/offices.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public offices = officeModel;

  public async signup(officeData: CreateOfficeDto): Promise<{ office: Office; token: string }> {
    if (isEmpty(officeData)) throw new HttpException(400, 'officeData is empty');

    const findOffice: Office = await this.offices.findOne({ email: officeData.email });
    if (findOffice) throw new HttpException(409, `This email ${officeData.email} already exists`);

    const hashedPassword = await hash(officeData.password, 10);
    const createUserData: Office = await this.offices.create({ ...officeData, password: hashedPassword });

    const tokenData = this.createToken(createUserData);

    return { office: createUserData, token: tokenData };
  }

  public async login(officeData: Login): Promise<{ cookie: string; token: string }> {
    if (isEmpty(officeData)) throw new HttpException(400, 'officeData is empty');

    const findOffice: Office = await this.offices.findOne({ email: officeData.email });
    if (!findOffice) throw new HttpException(409, `This email ${officeData.email} was not found`);

    const isPasswordMatching: boolean = await compare(officeData.password, findOffice.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const token = this.createToken(findOffice);
    const cookie = this.createCookie(token);

    return { cookie, token };
  }

  public async logout(officeData: Office): Promise<Office> {
    if (isEmpty(officeData)) throw new HttpException(400, 'officeData is empty');

    const findOffice: Office = await this.offices.findOne({ email: officeData.email, password: officeData.password });
    if (!findOffice) throw new HttpException(409, `This email ${officeData.email} was not found`);

    return findOffice;
  }

  public createToken(office: Office): string {
    const dataStoredInToken: DataStoredInToken = { _id: office._id };
    const secretKey: string = SECRET_KEY;

    return sign({ ...dataStoredInToken, time: new Date() }, secretKey);
  }

  public createCookie(tokenData: string): string {
    return `Authorization=${tokenData}`;
  }
}

export default AuthService;
