import { NextRequest, NextResponse } from "next/server";
import { createUrl, getDollar } from "../../../../utils/services";
import prisma from "../../../../db";
import { Transaction } from "@prisma/client";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function POST(req: NextRequest) {
  const { from, to, price, name, email, bankstring, phone, receive } =
    await req.json();
  console.log("calling url route!", from, to, price, name, email, bankstring);

  if (!from || !to || !price) return NextResponse.error();

  if (from === "ars") {
    console.log("EN ARGS");
    const dollarPrices = await getDollar();

    const dollar: number = dollarPrices.venta;
    const amount = Number(price) / dollar;
    console.log(amount);
    try {
      console.log("try calling service AGAIN...");
      const data = await createUrl(
        "usd",
        to,
        amount,
        name,
        email,
        bankstring,
        phone
      );

      // Create transaction pending
      const transaction = await prisma.transaction.create({
        data: {
          date: new Date(),
          email: email,
          send: parseFloat(price),
          receive: parseFloat(receive),
          sendCurrency: "usd",
          receiveCurrency: to,
          phone: phone,
          bankstring: bankstring,
        },
      });

      console.log("transaction =>", transaction);

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
      from,
      to,
      price,
      name,
      email,
      bankstring,
      phone
    );

    // Create transaction pending

    const transaction = await prisma.transaction.create({
      data: {
        date: new Date(),
        email: email,
        send: parseFloat(price),
        receive: parseFloat(receive),
        sendCurrency: from,
        receiveCurrency: to,
        phone: phone,
        bankstring: bankstring,
      },
    });

    console.log("transaction =>", transaction);

    return NextResponse.json(data);
  } catch (err) {
    console.log("ERROR creating url");
    console.error("error creating url", err);
    return NextResponse.error();
  }
}
