import express, { Request, Response, NextFunction } from 'express';
import { getIP } from '@utils/misc';

export function logMiddleware(req: Request, res: Response, next: NextFunction) {
  const ip = getIP(req);
  console.log(ip, req.method, req.path);
  next();
};

export function onErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).send({ status: 'err', error: err && err.message });
};
