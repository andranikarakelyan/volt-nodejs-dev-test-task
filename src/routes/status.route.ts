import {Request, Response} from "express";

export function statusRoute(req: Request, res: Response) {
  return res.json({
    status: 'success',
  });
}