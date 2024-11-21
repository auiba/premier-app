"use client";

import { useState } from "react";
import { TransactionsTable } from "./TransactionsTable";
import { CryptosTable } from "./CryptosTable";
import { fakeTransactions } from "../../../utils/backoffice";
import { fakeCryptos } from "../../../utils/backoffice";
import { TextInput } from "../registration/Input";

export function AdminPanel() {
  const [selected, setSelected] = useState("transactions");
  const [adminPhone, setAdminPhone] = useState("+5491155837794");
  // PENDING: Admin phone will actually come from the DB
  // PENDING: Receiving transactions and cryptos from page.tsx so the request is made from server
  // and passing these to the proper components

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPhone(e.target.value);
  };
  console.log(adminPhone);

  return (
    <section className="flex min-h-screen flex-col w-full items-center gap-10 bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <form className="flex flex-col gap-2">
        <TextInput
          htmlfor="adminPhone"
          labelText="Teléfono de admin"
          name="adminPhone"
          value={adminPhone}
          handleChange={handleChange}
        />
        <button
          className="border-[1px] border-white p-1 rounded"
          onClick={(e) => e.preventDefault()}
        >
          Actualizar
        </button>
      </form>
      <ul className="flex items-center justify-center gap-4">
        <li
          className={`${
            selected === "transactions" && "text-gray-400"
          }  text-xl`}
        >
          <button
            disabled={selected === "transactions"}
            onClick={(e) => {
              e.preventDefault();
              setSelected("transactions");
            }}
          >
            Transacciones
          </button>
        </li>
        <li className={`${selected === "cryptos" && "text-gray-400"}  text-xl`}>
          <button
            disabled={selected === "cryptos"}
            onClick={(e) => {
              e.preventDefault();
              setSelected("cryptos");
            }}
          >
            Criptos
          </button>
        </li>
      </ul>
      {selected == "transactions" && (
        <TransactionsTable transactions={fakeTransactions} />
      )}
      {selected == "cryptos" && <CryptosTable cryptos={fakeCryptos} />}
    </section>
  );
}
