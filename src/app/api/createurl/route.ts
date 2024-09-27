import { NextRequest, NextResponse } from "next/server";
import { createUrl, getDollar } from "../../../../utils/services";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function POST(req: NextRequest) {
  const { from, to, price, name, email, bankstring, phone } = await req.json();
  console.log("calling url route!", from, to, price, name, email, bankstring);

  if (!from || !to || !price) return NextResponse.error();

  if (from === "ars") {
    console.log("EN ARGS");
    const dollarPrices = await getDollar(apiUrl!, apiKey!);

    const dollar: number = dollarPrices.venta;
    const amount = Number(price) / dollar;
    console.log(amount);
    try {
      console.log("try calling service AGAIN...");
      const data = await createUrl(
        apiUrl!,
        apiKey!,
        "usd",
        to,
        amount,
        name,
        email,
        bankstring,
        phone
      );

      return NextResponse.json(data);
    } catch (err) {
      console.log("ERROR creating url");
      console.error("error creating url", err);
      return NextResponse.error();
    }
  }

  try {
    console.log("try calling service AGAIN...");
    const data = await createUrl(
      apiUrl!,
      apiKey!,
      from,
      to,
      price,
      name,
      email,
      bankstring,
      phone
    );

    return NextResponse.json(data);
  } catch (err) {
    console.log("ERROR creating url");
    console.error("error creating url", err);
    return NextResponse.error();
  }
}
