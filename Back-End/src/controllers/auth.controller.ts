import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as responseUtil from "../utils/response.util";

export function register(req: Request, res: Response): void {
  try {
    const user = authService.register(req.body);
    responseUtil.success(res, "Register successful", user, 201);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    if (message === "Email already exists") {
      responseUtil.error(res, "Email already exists", 409);
      return;
    }
    responseUtil.error(res, "Internal server error", 500);
  }
}

export function login(req: Request, res: Response): void {
  try {
    const user = authService.login(req.body);
    responseUtil.success(res, "Login successful", user, 200);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error";
    if (message === "Invalid credentials") {
      responseUtil.error(res, "Invalid credentials", 401);
      return;
    }
    responseUtil.error(res, "Internal server error", 500);
  }
}
