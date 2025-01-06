import { VipExchangeForm } from "@/components/exchange/VipExchangeForm";
import {
  getDollar,
  getAllConstants,
  calculateExchange,
} from "../../../utils/services";
import { DollarPrice } from "@/components/exchange/DollarPrice";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import prisma from "../../../db";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export default async function ExchangePage() {
  const session = await auth();
  const userEmail = session?.user?.email;

  console.log("EMAIL", userEmail);

  const customerInfo = await prisma.customer.findFirst({
    where: { email: userEmail as string },
  });

  if (customerInfo?.email !== userEmail || !customerInfo) {
    redirect("/");
  }

  console.log("customer data :", customerInfo);

  const formInfo = await Promise.allSettled([getDollar(), getAllConstants()]);

  const [dollarResult, allConstants] = formInfo;

  const dollarPrice = dollarResult.status == "fulfilled" && dollarResult.value;
  const allConsts = allConstants.status == "fulfilled" && allConstants.value;

  return (
    <main className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <VipExchangeForm
        name={customerInfo?.name}
        email={userEmail}
        cryptos={allConsts}
        {...dollarPrice}
      />
      <DollarPrice compra={dollarPrice.compra} venta={dollarPrice.venta} />
    </main>
  );
}
