import { fakeTransactions } from "../../../../utils/backoffice";
import { AdminPanel } from "@/components/admin/AdminPanel";
import prisma from "../../../../db";
import { AdminPhone, Crypto, Transaction } from "@prisma/client";

export default async function AdminPage() {
  // Grab all data necessary for the admin panel concurrently
  const [transactions, cryptos, adminPhone] = await Promise.allSettled([
    prisma.transaction.findMany(),
    prisma.crypto.findMany(),
    prisma.adminPhone.findFirst(),
  ]).then((results) =>
    results.map((result) =>
      result.status === "fulfilled" ? result.value : null
    )
  );

  return (
    <section className="flex min-h-screen flex-col w-full items-center gap-10 bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <AdminPanel
        transactions={transactions as Transaction[]}
        cryptos={cryptos as Crypto[]}
        adminPhoneNumber={adminPhone as AdminPhone}
      />
    </section>
  );
}
