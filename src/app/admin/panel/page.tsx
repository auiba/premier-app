import { AdminPanel } from "@/components/admin/AdminPanel";
import prisma from "../../../../db";

export default async function AdminPage() {
  // Grab all data necessary for the admin panel concurrently
  const [transactionsResult, cryptosResult, adminPhoneResult] =
    await Promise.allSettled([
      prisma.transaction.findMany(),
      prisma.crypto.findMany(),
      prisma.adminPhone.findFirst(),
    ]);

  // Handle each result individually with safe defaults
  const transactions =
    transactionsResult.status === "fulfilled" ? transactionsResult.value : [];
  const cryptos =
    cryptosResult.status === "fulfilled" ? cryptosResult.value : [];
  const adminPhone =
    adminPhoneResult.status === "fulfilled" ? adminPhoneResult.value : null;

  return (
    <section className="flex min-h-screen flex-col w-full items-center gap-10 bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <AdminPanel
        transactions={transactions}
        cryptos={cryptos}
        adminPhoneNumber={adminPhone}
      />
    </section>
  );
}
