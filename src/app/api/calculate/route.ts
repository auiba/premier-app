import { NextRequest, NextResponse } from "next/server";
import { calculateExchange, getDollar } from "../../../../utils/services";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function POST(req: NextRequest) {
  const { from, to, price } = await req.json();
  console.log("calling route!", from, to, price);

  if (!from || !to || !price) return NextResponse.error();

  if (from === "ars") {
    console.log("EN ARGS");
    const dollarPrices = await getDollar(apiUrl!, apiKey!);

    const dollar: number = dollarPrices.venta;
    const amount = Number(price) / dollar;
    console.log(amount);
    try {
      const data = await calculateExchange(apiUrl!, apiKey!, "usd", to, amount);

      return NextResponse.json(data);
    } catch (err) {
      console.error(
        "error calculating exchange from ars to usd to crypto",
        err
      );
    }
  }

  try {
    console.log("try calling service AGAIN...");
    const data = await calculateExchange(apiUrl!, apiKey!, from, to, price);

    return NextResponse.json(data);
  } catch (err) {
    console.error("error calculating exchange", err);
    return NextResponse.error();
  }
}
