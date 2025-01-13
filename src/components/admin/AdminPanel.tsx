"use client";

import { useState, useEffect } from "react";
import { TransactionsTable } from "./TransactionsTable";
import { CryptosTable } from "./CryptosTable";

import { CryptosProvider } from "@/context/AdminCryptos";

import { TextInput } from "../registration/Input";
import { Transaction, Crypto, AdminPhone } from "@prisma/client";

type PanelProps = {
  transactions: Transaction[];
  cryptos: Crypto[];
  adminPhoneNumber: AdminPhone | null;
};

export function AdminPanel({
  transactions,
  cryptos,
  adminPhoneNumber,
}: PanelProps) {
  const [selected, setSelected] = useState("transactions");
  const [adminPhone, setAdminPhone] = useState("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    if (adminPhoneNumber) {
      setAdminPhone(adminPhoneNumber?.phone);
    }
  }, [adminPhoneNumber]);

  // Show 'phone updated' message
  const flashMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPhone(e.target.value);
  };

  return (
    <CryptosProvider>
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
            onClick={async (e) => {
              e.preventDefault();

              const updatePhone = await fetch("/api/admin/phone", {
                method: "PATCH",
                body: JSON.stringify({ phone: adminPhone }),
              });

              if (updatePhone.status == 200) {
                flashMessage();
              }
            }}
          >
            Actualizar
          </button>
          <p
            className={`${
              showMessage ? "block" : "invisible"
            } text-green-600 text-md`}
          >
            ✔ Teléfono actualizado
          </p>
        </form>
        <ul className="flex items-center justify-center gap-4">
          <li
            className={`${
              selected === "transactions" &&
              "text-gray-400 border-b-2 border-gray-400"
            }  text-xl  p-2`}
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
          <li
            className={`${
              selected === "cryptos" &&
              "text-gray-400 border-b-2 border-gray-400"
            }  p-2 text-xl`}
          >
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
        {selected == "transactions" && transactions.length && (
          <TransactionsTable transactions={transactions} />
        )}
        {selected == "cryptos" && <CryptosTable cryptosList={cryptos} />}
      </section>
    </CryptosProvider>
  );
}
