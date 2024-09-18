"use client";

import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";

// They receive display values from parent form
// onChange they update the state of parent, which in turn
// updates display value of the other input

// FROM ==> USD, ARS
// TO ==> BTC, ETH

// Delayed search after 500ms from last keypress
function debounce<T extends (...args: any[]) => Promise<void>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      try {
        await func.apply(context, args);
      } catch (error) {
        console.error("Debounced function error:", error);
      }
    }, wait);
  };
}

type ExchangeInput = {
  buying: boolean;
  cryptoCurrencies: any[];
  fiatCurrencies: any[];
  sending?: number;
  receive?: number;
  sendCurrency?: string;
  receivingCurrency?: string;
  setSendingCurrency: Dispatch<SetStateAction<any>>;
  setReceivingCurrency: Dispatch<SetStateAction<any>>;
  setSendingAmount: Dispatch<SetStateAction<any>>;
  resetAmount: Function;
};

export const SendInput = ({
  buying,
  resetAmount,
  sending,
  setSendingCurrency,
  setSendingAmount,
  sendCurrency,
  cryptoCurrencies,
  fiatCurrencies,
}: ExchangeInput) => {
  let currencyOptions;

  if (buying) {
    currencyOptions = fiatCurrencies;
  } else {
    currencyOptions = cryptoCurrencies;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSendingAmount(value);
  };

  const options = currencyOptions.map((currency, id) => (
    <option
      key={id}
      className="p-2 text-white uppercase bg-[#3e3e59]"
      value={currency}
    >
      {currency}
    </option>
  ));

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-gray-400">Envías</h2>
      <div className="flex py-2 items-center rounded justify-center w-[325px] border-[1px] h-16 border-gray-600  bg-[#3e3e59]">
        <label htmlFor="send">
          <input
            min={0}
            step={"any"}
            value={sending! > 0 ? sending : ""}
            placeholder="0"
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            // value={sending}
            className="text-white text-xl w-[200px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            onChange={async (e) => {
              e.preventDefault();
              handleChange(e);
            }}
            id="send"
            type="number"
            name="send"
          />
        </label>
        <select
          value={sendCurrency}
          className="p-2 text-white text-xl bg-[#36324a] border-[1px] rounded border-gray-600  h-16 w-32 uppercase -ml-[12px]"
          onChange={(e) => {
            e.preventDefault();
            resetAmount();
            setSendingCurrency(e.target.value);
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
  resetAmount,
  buying,
  receive,
  setReceivingCurrency,
  setSendingAmount,
  cryptoCurrencies,
  fiatCurrencies,
  receivingCurrency,
}: ExchangeInput) => {
  let currencyOptions;

  if (buying) {
    currencyOptions = cryptoCurrencies;
  } else {
    currencyOptions = fiatCurrencies;
  }

  const options = currencyOptions.map((currency, id) => (
    <option
      key={id}
      className="p-2 text-white uppercase bg-[#3e3e59]"
      value={currency}
    >
      {currency}
    </option>
  ));
  return (
    <div className="flex flex-col text-white gap-2">
      <h2 className="text-gray-400">Recibes</h2>
      <div className="flex py-2 items-center rounded justify-center h-16 w-[325px] bg-[#3e3e59] border-[1px] border-gray-600">
        <div className="text-white text-xl w-[225px] p-2 rounded m-1 bg-[#3e3e59]">
          {receive}
        </div>
        <select
          className="p-2 text-white text-xl bg-[#36324a]  border-[1px] rounded border-gray-600  h-16 w-32 uppercase -ml-[12px]"
          onChange={(e) => {
            e.preventDefault();
            resetAmount();
            setReceivingCurrency(e.target.value);
          }}
          name="receive"
          id="receive"
        >
          {options}
        </select>
      </div>
    </div>
  );
};
