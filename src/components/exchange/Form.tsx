"use client";

import { useEffect, useState } from "react";
import { SendInput } from "./ExchangeFormInputs";

// "Parent" form component

export const ExchangeForm = () => {
  const [sendingAmount, setSendingAmount] = useState(0);
  const [sendCurrency, setSendCurrency] = useState<string>("");
  const [receiving, setReceiving] = useState(0);
  const [buying, setBuying] = useState<boolean>(true);

  console.log("currency", sendCurrency);
  console.log("Amount", sendingAmount);

  const fiatOptions = ["ars", "usd"];
  const cryptoOptions = ["btc", "eth"];

  return (
    <form className="text-white" action="">
      <SendInput
        buying={buying}
        cryptoCurrencies={cryptoOptions}
        fiatCurrencies={fiatOptions}
        setReceivingCurrency={setReceiving}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
      />
      <span>stuff</span>
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
