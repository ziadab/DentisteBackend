import { NextFunction, Request, Response } from 'express';
import { CreateOfficeDto, Login } from '@/dtos/offices.dto';
import { RequestWithOffice } from '@interfaces/auth.interface';
import { Office } from '@/interfaces/offices.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const officeData: CreateOfficeDto = req.body;
      const signUpUserData: { office: Office; token: string } = await this.authService.signup(officeData);

      res.status(201).json({ ...signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const officeData: Login = req.body;
      const { cookie, token } = await this.authService.login(officeData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithOffice, res: Response, next: NextFunction) => {
    try {
      const officeData: Office = req.office;
      const logOutUserData: Office = await this.authService.logout(officeData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
