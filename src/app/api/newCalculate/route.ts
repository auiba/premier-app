import { NextRequest, NextResponse } from "next/server";
import { createUrl, getDollar } from "../../../../utils/services";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function POST(req: NextRequest) {
  const { args } = await req.json();

  try {
    const dollarPrices = await getDollar(apiUrl!, apiKey!);

    const dollar: number = dollarPrices.venta;

    const argentinos: number = Number(args);
    const change = argentinos / dollar;

    return NextResponse.json(change);
  } catch (err) {
    console.log("ERROR creating url");
    console.error("error creating url", err);
    return NextResponse.error();
  }
}
