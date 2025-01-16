import { ExchangeForm } from "@/components/exchange/Form";
import { getDollar, getAllConstants } from "../../utils/services";
import { DollarPrice } from "@/components/exchange/DollarPrice";
import { Suspense } from "react";
import LoadingSkeleton from "./loading";

export const dynamic = "force-dynamic";

export default async function ExchangePage() {
  const formInfo = await Promise.allSettled([getDollar(), getAllConstants()]);

  const [dollarResult, allConstants] = formInfo;

  const dollarPrice =
    dollarResult.status === "fulfilled" ? dollarResult.value : null;
  const allConsts =
    allConstants.status === "fulfilled" ? allConstants.value : null;

  // Add error checking
  if (!dollarPrice || !allConsts) {
    throw new Error("Failed to load required data");
  }
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <main className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
        <ExchangeForm cryptos={allConsts} {...dollarPrice} />
        <DollarPrice compra={dollarPrice.compra} venta={dollarPrice.venta} />
      </main>
    </Suspense>
  );
}
