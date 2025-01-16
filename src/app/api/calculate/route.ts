import { NextRequest, NextResponse } from "next/server";
import { getDollar } from "../../../../utils/services";
import prisma from "../../../../db";

export async function POST(req: NextRequest) {
  const { from, to, price, direction } = await req.json();

  if (!from || !to || !price) return NextResponse.error();

  const cryptoCurrency = from === "ars" || from === "usd" ? to : from;
  const crypto = await prisma.crypto.findFirst({
    where: {
      crypto: cryptoCurrency.toUpperCase(),
    },
  });

  if (!crypto) {
    return NextResponse.error();
  }

  const { commission, fee } = crypto;
  console.log("Commission and fee:", { commission, fee });

  const toUppercase = to.toUpperCase();
  const fromUpperCase = from.toUpperCase();

  const trimResult = (result: string) =>
    result.length > 10 ? result.slice(0, 11) : result;

  const applyCommissionAndFee = (
    amount: number,
    binancePrice: number,
    isToUsd: boolean
  ) => {
    console.log("Processing amount:", amount);

    if (direction === "receive") {
      // Working backwards: they want to receive this amount, so we calculate what they need to send
      if (isToUsd) {
        // For USD: add fee first, then calculate commission
        const withFee = amount + fee;
        // If they want to receive X, they need to send X/(1-commission%)
        return withFee / (1 - commission / 100);
      } else {
        // For crypto: add fee in crypto terms first, then calculate commission
        const feeInCrypto = fee / binancePrice;
        const withFee = amount + feeInCrypto;
        return withFee / (1 - commission / 100);
      }
    } else {
      // Normal "send" direction: calculate what they'll receive after fees
      if (isToUsd) {
        const afterCommission = amount * (1 - commission / 100);
        return afterCommission - fee;
      } else {
        const afterCommission = amount * (1 - commission / 100);
        return afterCommission;
      }
    }
  };

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

      let baseResult: number;
      const isToUsd = to === "ars";

      if (from === "ars") {
        if (direction === "receive") {
          baseResult = price * binancePrice * dollar;
        } else {
          const usdAmount = Number(price) / dollar;
          baseResult = (1 / binancePrice) * usdAmount;
        }
      } else {
        if (direction === "receive") {
          baseResult = (1 / (binancePrice * dollar)) * price;
        } else {
          baseResult = binancePrice * price * dollar;
        }
      }

      const finalResult = applyCommissionAndFee(
        baseResult,
        binancePrice,
        isToUsd
      );

      return NextResponse.json({
        result: trimResult(finalResult.toString()),
        fees: {
          commission:
            direction === "receive"
              ? finalResult - baseResult - fee
              : (baseResult * commission) / 100,
          fixedFee: fee,
          total:
            direction === "receive"
              ? finalResult - baseResult
              : baseResult - finalResult,
          commissionPercentage: commission,
        },
      });
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

    let baseResult: number;
    const isToUsd = to === "usd";

    if (from === "usd") {
      if (direction === "receive") {
        baseResult = price * binancePrice;
      } else {
        baseResult = (1 / binancePrice) * price;
      }
    } else {
      if (direction === "receive") {
        baseResult = (1 / binancePrice) * price;
      } else {
        baseResult = binancePrice * price;
      }
    }

    const finalResult = applyCommissionAndFee(
      baseResult,
      binancePrice,
      isToUsd
    );

    return NextResponse.json({
      result: trimResult(finalResult.toString()),
      fees: {
        commission:
          direction === "receive"
            ? finalResult - baseResult - fee
            : (baseResult * commission) / 100,
        fixedFee: fee,
        total:
          direction === "receive"
            ? finalResult - baseResult
            : baseResult - finalResult,
        commissionPercentage: commission,
      },
    });
  } catch (error) {
    console.error("Error calculating USD/Crypto exchange:", error);
    return NextResponse.error();
  }
}
