import Controller from "../http/controller.js";
import { NextFunction, Request, Response } from "express";

type ControllerConstructor = new (req: Request, res: Response, next: NextFunction) => Controller;

const withController = (Controller: ControllerConstructor) => {
  return (req: Request, res: Response, next: NextFunction) => new Controller(req, res, next).execute();
}

export default withController