import { VipExchangeForm } from "@/components/exchange/VipExchangeForm";
import {
  getConstants,
  getDollar,
  getAllConstants,
  calculateExchange,
} from "../../../utils/services";
import { DollarPrice } from "@/components/exchange/DollarPrice";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export default async function ExchangePage() {
  const formInfo = await Promise.allSettled([
    getConstants(apiUrl!, apiKey!),
    getDollar(apiUrl!, apiKey!),
    getAllConstants(apiUrl!, apiKey!),
  ]);

  const [constantsResult, dollarResult, allConstants] = formInfo;

  const constants =
    constantsResult.status == "fulfilled" && constantsResult.value;

  const dollarPrice = dollarResult.status == "fulfilled" && dollarResult.value;
  const allConsts = allConstants.status == "fulfilled" && allConstants.value;

  console.log("constants", constants);
  console.log("all constants", allConsts);
  console.log("dollarprice", dollarPrice);
  return (
    <main className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <VipExchangeForm cryptos={allConsts} {...dollarPrice} />
      <DollarPrice compra={dollarPrice.compra} venta={dollarPrice.venta} />
    </main>
  );
}
