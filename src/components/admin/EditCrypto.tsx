"use client";

import { useState, useEffect } from "react";
import { Crypto } from "@prisma/client";

export const EditCrypto = ({
  cryptoCurrency,
  close,
  onEdit,
}: {
  cryptoCurrency: Crypto;
  close: Function;
  onEdit: Function;
}) => {
  const [cryptoValues, setCryptoValues] = useState({ comm: 0, fee: 0 });

  useEffect(() => {
    setCryptoValues({
      comm: cryptoCurrency.commission,
      fee: cryptoCurrency.fee,
    });
  }, []);

  return (
    <div>
      <form className="gap-2 flex flex-col items-center justify-center">
        <label
          className="flex flex-col items-start justify-center text-gray-600"
          htmlFor="comm"
        >
          Comisión
          <input
            value={cryptoValues.comm}
            placeholder={cryptoCurrency.commission.toString() || ""}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={(e) => {
              e.preventDefault();
              setCryptoValues({
                fee: cryptoValues.fee,
                comm: Number(e.target.value),
              });
            }}
            id="comm"
            type="number"
          />
        </label>
        <label
          className="flex flex-col items-start justify-center text-gray-600"
          htmlFor="comm"
        >
          Fee
          <input
            value={cryptoValues.fee}
            placeholder={cryptoCurrency.commission.toString() || ""}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={(e) => {
              e.preventDefault();
              setCryptoValues({
                fee: Number(e.target.value),
                comm: cryptoValues.comm,
              });
            }}
            id="comm"
            type="number"
          />
        </label>
        <button
          className="rounded p-1 border-2 border-black"
          onClick={async (e) => {
            e.preventDefault();
            console.log("kek");

            const editCrypto = await fetch("/api/admin/cryptos", {
              method: "PATCH",
              body: JSON.stringify({
                commission: cryptoValues.comm,
                fee: cryptoValues.fee,
                id: cryptoCurrency.id,
              }),
            });

            const editedCrypto = await editCrypto.json();
            await onEdit(editedCrypto);

            close();
          }}
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};
