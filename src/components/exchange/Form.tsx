"use client";

import { useCallback, useEffect, useState } from "react";
import { SendInput, ReceiveInput } from "./ExchangeFormInputs";

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

export const ExchangeForm = ({
  commission,
  fee,
}: {
  commission: string;
  fee: string;
}) => {
  const [sendingAmount, setSendingAmount] = useState(0);
  const [sendCurrency, setSendCurrency] = useState<string>("usd");
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [receivingCurrency, setReceivingCurrency] = useState("btc");
  const [buying, setBuying] = useState<boolean>(true);

  const flipCurrencies = () => {
    setSendingAmount(0);
    setSendCurrency(receivingCurrency);
    setReceivingCurrency(sendCurrency);
  };

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
    // debouncedSearch(sendingAmount);
  }, [sendingAmount]);

  console.log(commission, fee);
  console.log("receiving currency", receivingCurrency);
  console.log("send", sendCurrency);

  const fiatOptions = ["usd", "ars"];
  const cryptoOptions = ["btc", "eth"];

  return (
    <form
      className="text-white flex flex-col bg-[#343443] p-8 rounded border-[1px] border-gray-600"
      action=""
    >
      <SendInput
        buying={buying}
        sending={sendingAmount}
        cryptoCurrencies={cryptoOptions}
        fiatCurrencies={fiatOptions}
        setReceivingCurrency={setReceivingCurrency}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
      />
      <div className="flex items-center justify-center"></div>
      <div></div>

      <div></div>

      <button
        onClick={(e) => {
          e.preventDefault();
          flipCurrencies();
          setBuying(false);
        }}
      >
        vender
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          flipCurrencies();
          setBuying(true);
        }}
      >
        comprar
      </button>
      <ReceiveInput
        receive={receiveAmount}
        buying={buying}
        cryptoCurrencies={cryptoOptions}
        fiatCurrencies={fiatOptions}
        receivingCurrency={receivingCurrency}
        setReceivingCurrency={setReceivingCurrency}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
      />
    </form>
  );
};
