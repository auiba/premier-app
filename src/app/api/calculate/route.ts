import { NextRequest, NextResponse } from "next/server";
import { calculateExchange } from "../../../../utils/services";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function POST(req: NextRequest) {
  const { from, to, price } = await req.json();
  console.log("calling route!", from, to, price);

  if (!from || !to || !price) return NextResponse.error();

  try {
    console.log("try calling service AGAIN...");
    const data = await calculateExchange(apiUrl!, apiKey!, from, to, price);

    return NextResponse.json(data);
  } catch (err) {
    console.log("ERROR NOOB");
    console.error("error calculating exchange", err);
    return NextResponse.error();
  }
}
