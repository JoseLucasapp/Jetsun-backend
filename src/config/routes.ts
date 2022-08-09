import express from 'express';
import UserRoutes from '../routes/userRoutes';
import FellowRoutes from '../routes/fellowsRoutes';
import PostRoutes from '../routes/postRoutes';

class Routes {
  constructor(app: express.Router) {
    new UserRoutes(app);
    new FellowRoutes(app);
    new PostRoutes(app);
  }
}

export default Routes;
