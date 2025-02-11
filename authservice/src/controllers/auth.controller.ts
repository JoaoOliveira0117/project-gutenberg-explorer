import { NextFunction, Request, Response } from "express";
import Controller from "../http/controller.js";
import UserService from "../services/user.js";

export default class AuthController extends Controller {
  protected UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.UserService = UserService.init();
  }
}