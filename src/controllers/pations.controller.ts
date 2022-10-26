import { CreatePation } from '@/dtos/pations.dto';
import { RequestWithOffice } from '@/interfaces/auth.interface';
import { Pations } from '@/interfaces/pations.interface';
import pationsModel from '@/models/pations.model';
import visitesModel from '@/models/visite.model';
import { NextFunction, Response } from 'express';

class PationsController {
  public getPations = async (req: RequestWithOffice, res: Response, next: NextFunction) => {
    try {
      const findAllPationsData = await pationsModel
        .find({ office_id: req.office._id }, { firstName: 1, lastName: 1, cin: 1, age: 1, phone: 1 })
        .sort({ createdAt: -1 })
        .lean();
      console.log(findAllPationsData);
      res.status(200).json({ data: findAllPationsData });
    } catch (error) {
      next(error);
    }
  };

  public createPation = async (req: RequestWithOffice, res: Response, next: NextFunction) => {
    try {
      const pationData: CreatePation = req.body;
      const createPationData: Pations = await pationsModel.create({ ...pationData, office_id: req.office._id });
      res.status(201).json(createPationData);
    } catch (error) {
      next(error);
    }
  };

  public getPationById = async (req: RequestWithOffice, res: Response, next: NextFunction) => {
    try {
      const pationId = req.params.id;
      const findOnePationData: Pations = await pationsModel.findOne({ _id: pationId, office_id: req.office._id });
      const visites = await visitesModel.find({ pation_id: pationId, office_id: req.office._id });
      res.status(200).json({ data: { ...findOnePationData, visites } });
    } catch (error) {
      next(error);
    }
  };
}

export default PationsController;
