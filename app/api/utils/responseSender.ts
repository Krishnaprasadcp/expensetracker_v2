import { NextResponse } from "next/server";

export function ResponseSender(
  responseMessage: string,
  statusCode: number,
  data?: any
) {
  return NextResponse.json(
    data ? { message: responseMessage, data } : { message: responseMessage },
    { status: statusCode }
  );
}
