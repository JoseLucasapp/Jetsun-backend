import express from 'express';
import UserRoutes from '../routes/userRoutes';

class Routes {
  constructor(app: express.Router) {
    new UserRoutes(app);
  }
}

export default Routes;
