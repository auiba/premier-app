"use client";

import { useState, useEffect } from "react";
import { Crypto } from "./CryptoItem";

export const EditCrypto = ({
  crypto,
  close,
}: {
  crypto: Crypto;
  close: Function;
}) => {
  const [cryptoValues, setCryptoValues] = useState({ comm: 0, fee: 0 });

  useEffect(() => {
    setCryptoValues({ comm: crypto.commission, fee: crypto.fee });
  }, []);

  return (
    <div>
      <form>
        <label
          className="flex flex-col items-start justify-center text-gray-600"
          htmlFor="comm"
        >
          Comisión
          <input
            value={crypto.commission}
            placeholder={crypto.commission.toString()}
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
            value={crypto.commission}
            placeholder={crypto.commission.toString()}
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
          onClick={(e) => {
            e.preventDefault();
            console.log("kek");
            // Send PATCH request here

            close();
          }}
        >
          Listo
        </button>
      </form>
    </div>
  );
};
