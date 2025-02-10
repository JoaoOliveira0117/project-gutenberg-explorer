import db from "../../config/db.js";
import { Request, Response } from "express";
import Controller from "../../http/controller.js";
import FavoritesService from "../../services/favorites.js";

export default class FavoriteController extends Controller {
  protected service;

  constructor(req: Request, res: Response) {
    super(req, res);
    this.service = FavoritesService.init();
  }
}