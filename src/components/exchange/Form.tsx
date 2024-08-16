"use client";

import { useCallback, useEffect, useState } from "react";
import { SendInput } from "./ExchangeFormInputs";

// "Parent" form component

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

export const ExchangeForm = () => {
  const [sendingAmount, setSendingAmount] = useState(0);
  const [sendCurrency, setSendCurrency] = useState<string>("usd");
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [receivingCurrency, setReceivingCurrecy] = useState("");
  const [buying, setBuying] = useState<boolean>(false);

  const debouncedSearch = useCallback(
    debounce(async (value: number) => {
      // async API service call here
      // from, to , price (amount)
      // set parent state to async call result

      const response = await fetch("/api/calculate", {
        method: "POST",
        body: JSON.stringify({
          from: sendCurrency,
          to: "btc",
          price: 1500,
        }),
      });

      console.log(response);
      // setReceiveAmount(response)
    }, 450),

    []
  );

  useEffect(() => {
    debouncedSearch(sendingAmount);
  }, []);

  console.log("currency", sendCurrency);
  console.log("Amount", sendingAmount);

  const fiatOptions = ["ars", "usd"];
  const cryptoOptions = ["btc", "eth"];

  return (
    <form className="text-white flex flex-col" action="">
      <SendInput
        buying={buying}
        cryptoCurrencies={cryptoOptions}
        fiatCurrencies={fiatOptions}
        setReceivingCurrency={setReceivingCurrecy}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          setBuying(false);
        }}
      >
        vender
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setBuying(true);
        }}
      >
        comprar
      </button>
      <span>RECIBES:</span>
      {receiveAmount}
      {/* <ReceiveInput
        receive={receiving}
        buying={buying}
        cryptoCurrencies={cryptoOptions}
        fiatCurrencies={fiatOptions}
        setReceivingCurrency={setReceiving}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
      /> */}
    </form>
  );
};
