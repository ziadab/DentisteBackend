import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateOfficeDto } from '@/dtos/offices.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class UsersRoute implements Routes {
  public path = '/offices';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getOffices);
    this.router.get(`${this.path}/:id`, this.usersController.getOfficeById);
    this.router.post(`${this.path}`, validationMiddleware(CreateOfficeDto, 'body'), this.usersController.createOffice);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateOfficeDto, 'body', true), this.usersController.updateOffice);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteOffice);
  }
}

export default UsersRoute;
