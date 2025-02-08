import db from "../../config/db.js";
import { Request, Response } from "express";
import Controller from "../../http/controller.js";

export default class BooksController extends Controller {
  protected service;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.service = db.from('books')
  }
}