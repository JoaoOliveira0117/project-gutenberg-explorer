import { NextFunction, Request, Response } from "express";
import Controller from "../../http/controller.js";
import AuthService from "../../services/auth.js";

export default class AuthController extends Controller {
  protected AuthService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.AuthService = new AuthService();
  }
}