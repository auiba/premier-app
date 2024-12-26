import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";
import { Transaction } from "@prisma/client";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function PATCH(req: NextRequest) {
  const { trackingUrl, ticketId } = await req.json();

  console.log("tracking url =>", trackingUrl);
}
