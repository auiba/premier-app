import { NextRequest, NextResponse } from "next/server";
import { getDollar } from "../../../../utils/services";

export async function POST(req: NextRequest) {
  const { from, to, price } = await req.json();
  console.log("calling route!", from, to, price);

  if (!from || !to || !price) return NextResponse.error();

  const toUppercase = to.toUpperCase();
  const fromUpperCase = from.toUpperCase();

  if (from === "ars") {
    console.log("EN ARGS");
    const dollarPrices = await getDollar();

    const dollar: number = dollarPrices.venta;
    const amount = Number(price) / dollar;
    console.log(amount);
    try {
      const binanceReq = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${toUppercase}USDT`
      );
      const binanceData = await binanceReq.json().then((data) => data.price);
      const currencyPrice = 1 / parseFloat(binanceData);

      console.log("calculate result =>", currencyPrice * amount);
      const stringResult = (currencyPrice * amount).toString();

      // Maintain readable number
      const data =
        stringResult.length > 10 ? stringResult.slice(0, 11) : stringResult;

      return NextResponse.json({ result: data });
    } catch (err) {
      console.error(
        "error calculating exchange from ars to usd to crypto",
        err
      );
      return NextResponse.error();
    }
  }

  if (to === "ars") {
    console.log("EN ARGS");
    const dollarPrices = await getDollar();

    const dollar: number = dollarPrices.compra;

    try {
      const binanceReq = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${fromUpperCase}USDT`
      );
      const binanceData = await binanceReq.json().then((data) => data.price);

      console.log("calculate result =>", binanceData * price);
      const stringResult = (binanceData * price * dollar).toString();

      // Maintain readable number
      const data =
        stringResult.length > 10 ? stringResult.slice(0, 11) : stringResult;

      return NextResponse.json({ result: data });
    } catch (err) {
      console.error(
        "error calculating exchange from ars to usd to crypto",
        err
      );
    }
  }

  if (from === "usd") {
    try {
      const binanceReq = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${toUppercase}USDT`
      );
      // console.log("binance data", binanceData);
      console.log("Binance API status:", binanceReq.status);
      console.log("Binance API response:", await binanceReq.text());
      // const currencyPrice = 1 / parseFloat(binanceData);
      const binanceData = await binanceReq.json().then((data) => data.price);

      // const stringResult = (currencyPrice * price).toString();
      // console.log("string result", stringResult);
      // // Maintain readable number
      // const trimmedString: string =
      //   stringResult.length > 10 ? stringResult.slice(0, 11) : stringResult;

      // console.log("returning binance result...", trimmedString);

      return NextResponse.json({ result: binanceData });
    } catch (error) {
      console.error("error calculating from USD to a crypto", error);
      return NextResponse.error();
    }
  }

  if (to === "usd") {
    try {
      const binanceReq = await fetch(
        `https://api.binance.com/api/v3/ticker/price?symbol=${fromUpperCase}USDT`
      );
      const binanceData = await binanceReq.json().then((data) => data.price);

      const stringResult = (binanceData * price).toString();

      // Maintain readable number
      const trimmedString =
        stringResult.length > 10 ? stringResult.slice(0, 11) : stringResult;

      console.log("returning binance result...", trimmedString);

      return NextResponse.json({ result: trimmedString });
    } catch (error) {
      console.error("error calculating from USD to a crypto", error);
      return NextResponse.error();
    }
  }
}
