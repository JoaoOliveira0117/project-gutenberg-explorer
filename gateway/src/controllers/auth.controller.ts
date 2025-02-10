import { Request, Response } from "express";
import Controller from "../http/controller.js";
import UserService from "../services/user.js";

export default class AuthController extends Controller {
  protected UserService;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.UserService = UserService.init();
  }
}