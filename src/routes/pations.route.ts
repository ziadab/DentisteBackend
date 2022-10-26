import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import pationsController from '@/controllers/pations.controller';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreatePation } from '@/dtos/pations.dto';

class PationsRoute implements Routes {
  public path = '/pations';
  public router = Router();
  public pationsController = new pationsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.pationsController.getPations);
    this.router.get(`${this.path}/:id`, authMiddleware, this.pationsController.getPationById);
    this.router.post(`${this.path}`, [authMiddleware, validationMiddleware(CreatePation, 'body')], this.pationsController.createPation);
    // this.router.get(`${this.path}`, this.usersController.getOffices);
    // this.router.get(`${this.path}/:id`, this.usersController.getOfficeById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateOfficeDto, 'body'), this.usersController.createOffice);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateOfficeDto, 'body', true), this.usersController.updateOffice);
    // this.router.delete(`${this.path}/:id`, this.usersController.deleteOffice);
  }
}

export default PationsRoute;
