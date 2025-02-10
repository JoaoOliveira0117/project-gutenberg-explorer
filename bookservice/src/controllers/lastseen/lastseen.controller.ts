import { NextFunction, Request, Response } from "express";
import Controller from "../../http/controller.js";
import LastSeenService from "../../services/lastSeen.js";

export default class LastSeenController extends Controller {
  protected service;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.service = LastSeenService.init();
  }
}