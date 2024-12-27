"use client";

import { useState, useEffect } from "react";
import { TextInput } from "../registration/Input";

export const AddCrypto = ({
  close,
  onAdd,
}: {
  close: Function;
  onAdd: Function;
}) => {
  const [cryptoValues, setCryptoValues] = useState({
    name: "",
    cripto: "",
    comm: 0,
    fee: 0,
  });

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCryptoValues({ ...cryptoValues, name: e.target.value });
  };

  const handleCripto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCryptoValues({ ...cryptoValues, cripto: e.target.value });
  };

  return (
    <div>
      <form className="flex flex-col items-center justify-center gap-2">
        <label
          className="flex flex-col items-start justify-center text-gray-600"
          htmlFor={"name"}
        >
          Nombre
          <input
            value={cryptoValues.name}
            placeholder={"Bitcoin"}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={(e) => handleName(e)}
            id="crypto-name"
            type="text"
            name="name"
          />
        </label>
        <label
          className="flex flex-col items-start justify-center text-gray-600"
          htmlFor={"cripto"}
        >
          Cripto
          <input
            value={cryptoValues.cripto}
            placeholder={"BTC"}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={(e) => handleCripto(e)}
            id="crypto-cripto"
            type="text"
            name="cripto"
          />
        </label>
        <label
          className="flex flex-col items-start justify-center text-gray-600"
          htmlFor="comm"
        >
          Comisión
          <input
            value={cryptoValues.comm}
            placeholder={"5%"}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={(e) => {
              e.preventDefault();
              setCryptoValues({
                ...cryptoValues,
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
            placeholder={"$4"}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={(e) => {
              e.preventDefault();
              setCryptoValues({
                ...cryptoValues,
                fee: Number(e.target.value),
              });
            }}
            id="comm"
            type="number"
          />
        </label>
        <button
          className="p-1 rounded border-2 border-black"
          onClick={async (e) => {
            e.preventDefault();

            // Send POST request here
            await onAdd({
              name: cryptoValues.name,
              crypto: cryptoValues.cripto,
              commission: cryptoValues.comm,
              fee: cryptoValues.fee,
            });

            close();
          }}
        >
          Agregar
        </button>
      </form>
    </div>
  );
};
