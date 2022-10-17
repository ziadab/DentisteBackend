import { NextFunction, Request, Response } from 'express';
import { CreateOfficeDto } from '@/dtos/offices.dto';
import { Office } from '@/interfaces/offices.interface';
import officeService from '@services/offices.service';

class OfficesController {
  public officeService = new officeService();

  public getOffices = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOfficesData: Office[] = await this.officeService.findAllOffice();

      res.status(200).json({ data: findAllOfficesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOfficeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const officeId: string = req.params.id;
      const findOneOfficeData: Office = await this.officeService.findOfficeById(officeId);

      res.status(200).json({ data: findOneOfficeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOffice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const officeData: CreateOfficeDto = req.body;
      const createOfficeData: Office = await this.officeService.createOffice(officeData);

      res.status(201).json({ data: createOfficeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOffice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const officeId: string = req.params.id;
      const officeData: CreateOfficeDto = req.body;
      const updateOfficeData: Office = await this.officeService.updateOffice(officeId, officeData);

      res.status(200).json({ data: updateOfficeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteOffice = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const officeId: string = req.params.id;
      const deleteOfficeData: Office = await this.officeService.deleteOffice(officeId);

      res.status(200).json({ data: deleteOfficeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default OfficesController;
