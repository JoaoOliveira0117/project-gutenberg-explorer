import { NextFunction, Request, Response } from "express";
import Rest from "./rest.js";

export default class Controller extends Rest {
  constructor(req: Request, res: Response, next: NextFunction) {
    super(req, res, next);
  }

  async handle(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async execute(): Promise<void> {
    try {
      const result = await this.handle() || {
        result: {
          success: true
        }
      };
      this.res.send(result);
    } catch (error: unknown) {
      this.next({ error });
    }
  }
}