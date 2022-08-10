import { Fellows } from '../entities/Fellows';
import { Request, Response } from 'express';

export class FellowsController {
  private readonly fellows = new Fellows();

  constructor() {}

  async getFellows(req: Request, res: Response) {
    try {
      res
        .status(200)
        .json({ data: await this.fellows.getFellows(req.params.userId) });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async updateUserFellows(req: Request, res: Response) {
    try {
      res.status(200).json({
        data: await this.fellows.updateUserFellows(req.params.userId, req.body),
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async removeFellow(req: Request, res: Response) {
    try {
      res.status(200).json({
        data: await this.fellows.removeFellow(
          req.params.userId,
          req.params.username,
        ),
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
