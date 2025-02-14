import HttpError from "@/http/error";
import { NextRequest, NextResponse } from "next/server";

export default function withErrorHandler(handler: (req: NextRequest, res?: any) => Promise<NextResponse<any>>) {
  return async (req: NextRequest, res: any) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.log(error)
      if (error instanceof HttpError) {
        return NextResponse.json(error.toJson(), { status: error.statusCode });
      }

      return NextResponse.json({ status: 500, json: { error: "Internal Server Error" } });
    }
  };
}