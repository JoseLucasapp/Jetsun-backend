import express, { NextFunction, Request, Response } from 'express';
import { validateJwt } from '../middlewares/jwt';

import { FellowsController } from '../controllers/Fellows';

class FellowRoutes {
  private readonly fellows = new FellowsController();

  constructor(app: express.Router) {
    this.routes(app);
  }

  private routes(app: express.Router): void {
    app.put(
      '/fellows',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.fellows.updateUserFellows(req, res),
    );

    app.get(
      '/fellows',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.fellows.getFellows(req, res),
    );

    app.delete(
      '/fellows/:username',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.fellows.removeFellow(req, res),
    );
  }
}

export default FellowRoutes;
