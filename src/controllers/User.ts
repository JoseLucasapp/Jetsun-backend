import { Request, Response } from 'express';
import { User } from '../entities/User';

export class UserController {
  private readonly user = new User();

  constructor() {}

  async createUser(req: Request, res: Response) {
    try {
      res.status(200).json({ data: await this.user.createUser(req.body) });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json(await this.user.updateUser(req.body, req.params.userId));
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      res.status(200).json(await this.user.deleteUser(req.params.userId));
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const data = await this.user.getUser(req.params.id);
      if (data === 'Not found') return res.status(404).json({ data });
      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json({
          data: await this.user.getAllUsers(req.query.username?.toString()),
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async login(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json({
          data: await this.user.login(req.body.username, req.body.password),
        });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
