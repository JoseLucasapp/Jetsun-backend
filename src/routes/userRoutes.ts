import express, { NextFunction, Request, Response } from 'express';
import { validateJwt } from '../middlewares/jwt';

import { UserController } from '../controllers/User';

class UserRoutes {
  private readonly user = new UserController();

  constructor(app: express.Router) {
    this.routes(app);
  }

  private routes(app: express.Router): void {
    app.post('/user', (req: Request, res: Response) =>
      this.user.createUser(req, res),
    );

    app.get(
      '/user/:id',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.user.getUser(req, res),
    );

    app.get(
      '/users',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.user.getAllUsers(req, res),
    );

    app.put(
      '/user',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.user.updateUser(req, res),
    );

    app.delete(
      '/user',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.user.deleteUser(req, res),
    );

    app.post('/user/login', (req: Request, res: Response) =>
      this.user.login(req, res),
    );
  }
}

export default UserRoutes;
