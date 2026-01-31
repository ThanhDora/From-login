import { Response } from "express";

export function success(
  res: Response,
  message: string,
  data: unknown,
  status = 200,
): void {
  res.status(status).json({ success: true, message, data });
}

export function error(res: Response, message: string, status = 500): void {
  res.status(status).json({ success: false, message, data: null });
}
