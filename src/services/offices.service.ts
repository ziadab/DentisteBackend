import { hash } from 'bcrypt';
import { CreateOfficeDto } from '@dtos/offices.dto';
import { HttpException } from '@exceptions/HttpException';
import { Office } from '@/interfaces/offices.interface';
import officeModel from '@/models/offices.model';
import { isEmpty } from '@utils/util';

class OfficeService {
  public offices = officeModel;

  public async findAllOffice(): Promise<Office[]> {
    const offices: Office[] = await this.offices.find();
    return offices;
  }

  public async findOfficeById(officeId: string): Promise<Office> {
    if (isEmpty(officeId)) throw new HttpException(400, 'OfficeId is empty');

    const findOffice: Office = await this.offices.findOne({ _id: officeId });
    if (!findOffice) throw new HttpException(409, "Office doesn't exist");

    return findOffice;
  }

  public async createOffice(officeData: CreateOfficeDto): Promise<Office> {
    if (isEmpty(officeData)) throw new HttpException(400, 'officeData is empty');

    const findOffice: Office = await this.offices.findOne({ email: officeData.email });
    if (findOffice) throw new HttpException(409, `This email ${officeData.email} already exists`);

    const hashedPassword = await hash(officeData.password, 10);
    const createOfficeData: Office = await this.offices.create({ ...officeData, password: hashedPassword });

    return createOfficeData;
  }

  public async updateOffice(officeId: string, officeData: CreateOfficeDto): Promise<Office> {
    if (isEmpty(officeData)) throw new HttpException(400, 'officeData is empty');

    if (officeData.email) {
      const findOffice: Office = await this.offices.findOne({ email: officeData.email });
      if (findOffice && findOffice._id != officeId) throw new HttpException(409, `This email ${officeData.email} already exists`);
    }

    if (officeData.password) {
      const hashedPassword = await hash(officeData.password, 10);
      officeData = { ...officeData, password: hashedPassword };
    }

    const updateOfficeById: Office = await this.offices.findByIdAndUpdate(officeId, { officeData });
    if (!updateOfficeById) throw new HttpException(409, "Office doesn't exist");

    return updateOfficeById;
  }

  public async deleteOffice(officeId: string): Promise<Office> {
    const deleteOfficeById: Office = await this.offices.findByIdAndDelete(officeId);
    if (!deleteOfficeById) throw new HttpException(409, "Office doesn't exist");

    return deleteOfficeById;
  }
}

export default OfficeService;
