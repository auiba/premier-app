import { NextRequest, NextResponse } from "next/server";
import { getDollar } from "../../../../utils/services";

export async function POST(req: NextRequest) {
  const { from, to, price, direction } = await req.json();

  if (!from || !to || !price) return NextResponse.error();

  const toUppercase = to.toUpperCase();
  const fromUpperCase = from.toUpperCase();

  const trimResult = (result: string) =>
    result.length > 10 ? result.slice(0, 11) : result;

  // Handle ARS conversions
  if (from === "ars" || to === "ars") {
    const dollarPrices = await getDollar();
    const dollar = from === "ars" ? dollarPrices.venta : dollarPrices.compra;

    try {
      const cryptoCurrency = from === "ars" ? toUppercase : fromUpperCase;
      const binanceReq = await fetch(
        `https://api.binance.us/api/v3/ticker/price?symbol=${cryptoCurrency}USDT`
      );
      const binancePrice = await binanceReq
        .json()
        .then((data) => parseFloat(data.price));

      let result: string;
      if (from === "ars") {
        if (direction === "receive") {
          result = (price * binancePrice * dollar).toString();
        } else {
          const usdAmount = Number(price) / dollar;
          result = ((1 / binancePrice) * usdAmount).toString();
        }
      } else {
        if (direction === "receive") {
          result = ((1 / (binancePrice * dollar)) * price).toString();
        } else {
          result = (binancePrice * price * dollar).toString();
        }
      }

      return NextResponse.json({ result: trimResult(result) });
    } catch (err) {
      console.error("Error calculating ARS exchange:", err);
      return NextResponse.error();
    }
  }

  // Handle USD/Crypto conversions
  try {
    const binanceReq = await fetch(
      `https://api.binance.us/api/v3/ticker/price?symbol=${
        from === "usd" ? toUppercase : fromUpperCase
      }USDT`
    );
    const binancePrice = await binanceReq
      .json()
      .then((data) => parseFloat(data.price));

    let result: string;
    if (from === "usd") {
      if (direction === "receive") {
        result = (price * binancePrice).toString();
      } else {
        result = ((1 / binancePrice) * price).toString();
      }
    } else {
      if (direction === "receive") {
        result = ((1 / binancePrice) * price).toString();
      } else {
        result = (binancePrice * price).toString();
      }
    }

    return NextResponse.json({ result: trimResult(result) });
  } catch (error) {
    console.error("Error calculating USD/Crypto exchange:", error);
    return NextResponse.error();
  }
}
