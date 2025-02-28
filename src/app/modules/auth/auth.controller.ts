import { Request, Response } from 'express';
import { authService } from './auth.service';

export const authController = {
  async getAll(req: Request, res: Response) {
    const data = await authService.getAll();
    res.json(data);
  },
};
