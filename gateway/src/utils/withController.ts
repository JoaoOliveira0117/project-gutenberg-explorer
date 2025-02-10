import Controller from "../http/controller.js";
import { Request, Response } from "express";

type ControllerConstructor = new (req: Request, res: Response) => Controller;

const withController = (Controller: ControllerConstructor) => {
  return (req: Request, res: Response) => new Controller(req, res).execute();
}

export default withController