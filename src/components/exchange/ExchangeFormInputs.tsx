"use client";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import loadingGif from "../../../public/imgs/icons/loading.gif";
import { Crypto } from "@prisma/client";

type ExchangeInput = {
  buying: boolean;
  cryptoCurrencies: Crypto[];
  fiatCurrencies: any[];
  sending?: string;
  receive?: string;
  sendCurrency?: string;
  receivingCurrency?: string;
  setSendingCurrency: Dispatch<SetStateAction<any>>;
  setReceivingCurrency: Dispatch<SetStateAction<any>>;
  setSendingAmount: Dispatch<SetStateAction<any>>;
  setReceiveAmount?: Dispatch<SetStateAction<any>>;
  onFocus?: () => void;
  loading?: boolean;
};

const numberRegex = /^$|^0$|^[1-9]\d*$|^[1-9]\d*\.\d*$|^0\.\d*$|^\.\d*$/;

export const SendInput = ({
  buying,
  sending,
  setSendingCurrency,
  setSendingAmount,
  sendCurrency,
  cryptoCurrencies,
  fiatCurrencies,
  onFocus,
}: ExchangeInput) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (numberRegex.test(value)) {
      setSendingAmount(value);
    }
  };

  const options = buying
    ? fiatCurrencies.map((curr, id) => (
        <option key={id} value={curr.toLowerCase()}>
          {curr.toUpperCase()}
        </option>
      ))
    : cryptoCurrencies.map((currency, id) => (
        <option key={id} value={currency.crypto.toLowerCase()}>
          {currency.name}
        </option>
      ));

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-400">Envías</h2>
      <div className="flex py-2 items-center rounded justify-center w-[325px] border-[1px] h-16 border-gray-600 bg-[#3e3e59]">
        <label htmlFor="send">
          <input
            value={sending}
            placeholder="0"
            onFocus={onFocus}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            className="text-white text-xl w-[200px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={handleChange}
            id="send"
            type="text"
            name="send"
          />
        </label>
        <select
          value={sendCurrency?.toLowerCase()}
          className="p-2 text-white text-xl bg-[#36324a] border-[1px] rounded border-gray-600 h-16 w-32 uppercase -ml-[12px]"
          onChange={(e) => {
            setSendingCurrency(e.target.value.toLowerCase());
            setSendingAmount("");
          }}
          name="send"
          id="send"
        >
          {options}
        </select>
      </div>
    </div>
  );
};

export const ReceiveInput = ({
  buying,
  receive,
  setReceivingCurrency,
  setReceiveAmount,
  cryptoCurrencies,
  fiatCurrencies,
  receivingCurrency,
  onFocus,
  loading,
}: ExchangeInput) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (numberRegex.test(value)) {
      setReceiveAmount?.(value);
    }
  };

  const options = !buying
    ? fiatCurrencies.map((curr, id) => (
        <option key={id} value={curr.toLowerCase()}>
          {curr.toUpperCase()}
        </option>
      ))
    : cryptoCurrencies.map((currency, id) => (
        <option key={id} value={currency.crypto.toLowerCase()}>
          {currency.name}
        </option>
      ));

  return (
    <div className="flex flex-col text-white gap-2">
      <h2 className="text-gray-400">Recibes</h2>
      <div className="flex py-2 items-center rounded justify-center h-16 w-[325px] bg-[#3e3e59] border-[1px] border-gray-600">
        {loading ? (
          <div className="text-white text-xl w-[225px] p-2 rounded m-1 bg-[#3e3e59]">
            <Image unoptimized src={loadingGif} height={30} width={35} alt="" />
          </div>
        ) : (
          <label htmlFor="receive">
            <input
              value={receive}
              placeholder="0"
              onFocus={onFocus}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="text-white text-xl w-[200px] bg-[#3e3e59] h-10 p-2 rounded m-1"
              onChange={handleChange}
              id="receive"
              type="text"
              name="receive"
            />
          </label>
        )}

        <select
          className="p-2 text-white text-xl bg-[#36324a] border-[1px] rounded border-gray-600 h-16 w-[128px] uppercase -ml-[12px]"
          onChange={(e) => {
            setReceivingCurrency(e.target.value.toLowerCase());
            setReceiveAmount?.("");
          }}
          name="receive"
          id="receive"
          value={receivingCurrency?.toLowerCase()}
        >
          {options}
        </select>
      </div>
    </div>
  );
};
