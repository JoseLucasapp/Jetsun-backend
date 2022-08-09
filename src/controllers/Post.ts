import { Request, Response } from 'express';

import { Post } from '../entities/Post';

export class PostController {
  private readonly post = new Post();

  constructor() {}

  async addPost(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json({ data: await this.post.addPost(req.params.userId, req.body) });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async deletePost(req: Request, res: Response) {
    try {
      res.status(200).json({ data: await this.post.deletePost(req.params.id) });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async agree(req: Request, res: Response) {
    try {
      await this.post.agree(req.params.id);
      res.status(200).json({ msg: '+1 agree' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async disagree(req: Request, res: Response) {
    try {
      await this.post.disagree(req.params.id);
      res.status(200).json({ msg: '+1 disagree' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getPosts(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json({ data: await this.post.getPosts(req.params.userId) });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
