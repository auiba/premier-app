import { Transaction } from "@prisma/client";
import { TransactionItem } from "./Transaction";

export const TransactionsTable = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  const transactionsList = transactions.map((transct, id) => (
    <TransactionItem key={id} transaction={transct} />
  ));
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {transactionsList}
    </div>
  );
};
