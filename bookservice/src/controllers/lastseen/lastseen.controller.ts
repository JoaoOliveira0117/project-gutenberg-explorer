import db from "../../config/db.js";
import { Request, Response } from "express";
import Controller from "../../http/controller.js";

export default class LastSeenController extends Controller {
  protected service;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.service = db.from('user_last_seen_books')
  }
}