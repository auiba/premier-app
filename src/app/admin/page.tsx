import { fakeTransactions } from "../../../utils/backoffice";
import { TransactionsTable } from "@/components/admin/TransactionsTable";
import { AdminPanel } from "@/components/admin/AdminPanel";

export default async function AdminPage() {
  // Call transactions from db here to pass to transactions table component

  // Call cryptos from db to pass to cryptos table component as well
  console.log(fakeTransactions);
  return (
    <section className="flex min-h-screen flex-col w-full items-center gap-10 bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <AdminPanel />
    </section>
  );
}
