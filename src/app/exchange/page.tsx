import { ExchangeForm } from "@/components/exchange/Form";
import { getConstants, getDollar } from "../../../utils/services";
import { DollarPrice } from "@/components/exchange/DollarPrice";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export default async function ExchangePage() {
  const formInfo = await Promise.allSettled([
    getConstants(apiUrl!, apiKey!),
    getDollar(apiUrl!, apiKey!),
  ]);

  const [constantsResult, dollarResult] = formInfo;

  const constants =
    constantsResult.status == "fulfilled" && constantsResult.value;

  // console.log(constants);

  const dollarPrice = dollarResult.status == "fulfilled" && dollarResult.value;

  console.log(dollarPrice);
  return (
    <main className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <ExchangeForm {...constants} {...dollarPrice} />
      <DollarPrice compra={dollarPrice.compra} venta={dollarPrice.venta} />
    </main>
  );
}
