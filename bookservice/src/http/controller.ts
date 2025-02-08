import { Request, Response } from "express";
import Rest from "./rest.js";

export default class Controller extends Rest {
  constructor(req: Request, res: Response) {
    super(req, res);
  }

  async handle(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async execute(): Promise<void> {
    try {
      const result = await this.handle() || {
        success: true
      };
      this.res.send({ result });
    } catch (error: unknown) {
      console.log(error)
      this.res.status(500).send({ error });
    }
  }
}