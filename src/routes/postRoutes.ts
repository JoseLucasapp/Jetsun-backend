import express, { NextFunction, Request, Response } from 'express';
import { validateJwt } from '../middlewares/jwt';

import { PostController } from '../controllers/Post';

class PostRoutes {
  private readonly post = new PostController();

  constructor(app: express.Router) {
    this.routes(app);
  }

  private routes(app: express.Router): void {
    app.post(
      '/post',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.post.addPost(req, res),
    );

    app.get(
      '/post',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.post.getPosts(req, res),
    );

    app.put(
      '/post/agree/:id',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.post.agree(req, res),
    );

    app.put(
      '/post/disagree/:id',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.post.disagree(req, res),
    );

    app.delete(
      '/post/:id',
      (req: Request, res: Response, next: NextFunction) => {
        validateJwt(req, res, next);
      },
      (req: Request, res: Response) => this.post.deletePost(req, res),
    );
  }
}

export default PostRoutes;
