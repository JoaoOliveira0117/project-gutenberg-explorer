import { NextFunction, Request, Response } from "express";
import Controller from "../../http/controller.js";
import BooksService from "../../services/books.js";

export default class BooksController extends Controller {
  protected service;

  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
    this.service = BooksService.init();
  }
}