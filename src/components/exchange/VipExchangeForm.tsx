"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { SendInput, ReceiveInput } from "./ExchangeFormInputs";
import { useRouter } from "next/navigation";
import { Crypto } from "@prisma/client";

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

export const VipExchangeForm = ({
  dollarPrice,
  cryptos = [],
  email,
  name,
}: {
  dollarPrice: { compra: number; venta: number };
  cryptos?: Crypto[];
  email: string;
  name: string;
}) => {
  const [buying, setBuying] = useState<boolean>(true);
  const [sendingAmount, setSendingAmount] = useState<string>("");
  const [sendCurrency, setSendCurrency] = useState<string>(
    buying ? "usd" : "btc"
  );
  const [receiveAmount, setReceiveAmount] = useState<string>("");
  const [receivingCurrency, setReceivingCurrency] = useState(
    buying ? "btc" : "usd"
  );
  const [activeInput, setActiveInput] = useState<"send" | "receive">("send");
  const [phone, setPhone] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [cash, setCash] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const selectedCurrency = buying
    ? cryptos?.find(
        (crypto) => crypto.crypto == receivingCurrency.toUpperCase()
      )
    : cryptos?.find((crypto) => crypto.crypto == sendCurrency);

  const calculateExchange = useCallback(
    debounce(
      async (
        from: string,
        to: string,
        amount: string,
        direction: "send" | "receive"
      ) => {
        setLoading(true);

        const response = await fetch("/api/calculate", {
          method: "POST",
          body: JSON.stringify({
            from,
            to,
            price: amount,
            direction,
          }),
        });

        const data = await response.json();
        setLoading(false);

        if (direction === "send") {
          setReceiveAmount(data.result);
        } else {
          setSendingAmount(data.result);
        }
      },
      300
    ),
    []
  );

  useEffect(() => {
    if (activeInput === "send") {
      if (sendingAmount === "" || sendingAmount === "0") {
        setReceiveAmount("");
        return;
      }
      calculateExchange(sendCurrency, receivingCurrency, sendingAmount, "send");
    }
  }, [
    sendingAmount,
    activeInput,
    sendCurrency,
    receivingCurrency,
    calculateExchange,
  ]);

  useEffect(() => {
    if (activeInput === "receive") {
      if (receiveAmount === "" || receiveAmount === "0") {
        setSendingAmount("");
        return;
      }
      calculateExchange(
        sendCurrency,
        receivingCurrency,
        receiveAmount,
        "receive"
      );
    }
  }, [
    receiveAmount,
    activeInput,
    sendCurrency,
    receivingCurrency,
    calculateExchange,
  ]);

  useEffect(() => {
    if (buying) {
      setSendCurrency("usd");
      setReceivingCurrency("btc");
      setSendingAmount("");
      setReceiveAmount("");
    } else {
      setSendCurrency("btc");
      setReceivingCurrency("usd");
      setSendingAmount("");
      setReceiveAmount("");
    }
  }, [buying]);

  const fiatOptions = ["usd", "ars"];
  const cashRef = useRef<HTMLInputElement>(null);

  return (
    <form className="text-white items-center justify-center flex flex-col w-[375px] bg-[#343443] p-8 rounded border-[1px] border-gray-600">
      <SendInput
        buying={buying}
        sending={sendingAmount}
        sendCurrency={sendCurrency}
        cryptoCurrencies={cryptos}
        fiatCurrencies={fiatOptions}
        setReceivingCurrency={setReceivingCurrency}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
        onFocus={() => setActiveInput("send")}
      />

      <div className="flex items-center justify-between w-full py-4">
        <div className="-ml-2">
          <ul className="text-[12px]">
            <li>
              Comisión:{" "}
              {(selectedCurrency && selectedCurrency?.commission) || "5.00"}%
            </li>
            <li>
              Fee de red:{" "}
              {buying ? selectedCurrency && selectedCurrency?.fee : "0"} USD
            </li>
          </ul>
        </div>

        <div className="flex gap-2 bg-[#30303e] p-1 rounded">
          <button
            className={`${
              buying ? "text-gray-400" : "text-[#0ca66a] bg-[#3e3f57]"
            } rounded p-1 font-medium`}
            onClick={(e) => {
              e.preventDefault();
              setBuying(false);
            }}
          >
            Vender
          </button>
          <button
            className={`${
              buying ? "text-[#0ca66a] bg-[#3e3f57]" : "text-gray-400"
            } rounded p-1 font-medium`}
            onClick={(e) => {
              e.preventDefault();
              setBuying(true);
              setCash(false);
            }}
          >
            Comprar
          </button>
        </div>
      </div>

      <ReceiveInput
        receive={receiveAmount}
        buying={buying}
        cryptoCurrencies={cryptos}
        fiatCurrencies={fiatOptions}
        sendCurrency={sendCurrency}
        receivingCurrency={receivingCurrency}
        setReceivingCurrency={setReceivingCurrency}
        setSendingAmount={setSendingAmount}
        setReceiveAmount={setReceiveAmount}
        setSendingCurrency={setSendCurrency}
        onFocus={() => setActiveInput("receive")}
        loading={loading}
      />

      <label className="flex flex-col mt-4" htmlFor="phone">
        Número de WhatsApp *
        <input
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+5496319426789"
          className="w-[325px] rounded h-10 p-2 bg-[#3e3e59]"
          id="phone"
          name="phone"
          type="text"
          value={phone! !== "" ? phone : ""}
        />
      </label>

      <label
        className={`${cash ? "opacity-10" : ""} flex flex-col mt-4`}
        htmlFor="account"
      >
        {buying ? "Mi billetera de crypto" : "CBU/CVU/Alias para transferencia"}
        <input
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          disabled={cash}
          placeholder="0000079600000000000017"
          className="w-[325px] rounded h-10 p-2 bg-[#3e3e59]"
          id="account"
          name="account"
          type="text"
          value={account !== "" ? account : ""}
          onChange={(e) => setAccount(e.target.value)}
        />
      </label>

      {!buying && (
        <label
          className="flex items-center justify-center self-start gap-2 my-4"
          htmlFor="cash"
        >
          <input
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            ref={cashRef}
            className="h-8 w-8 rounded"
            type="checkbox"
            name="cash"
            id="cash"
            onChange={(e) => setCash(e.target.checked)}
          />
          Efectivo
        </label>
      )}

      <button
        className="flex w-full items-center text-lg justify-center text-center rounded p-4 h-12 font-medium bg-[#00c26f] mt-4"
        onClick={async (e) => {
          e.preventDefault();
          const response = await fetch("/api/createurl", {
            method: "POST",
            body: JSON.stringify({
              from: sendCurrency,
              to: receivingCurrency,
              price: sendingAmount,
              receive: receiveAmount,
              name,
              email,
              bankstring: account,
              phone,
            }),
          });

          const data = await response.json();
          router.push(data);
        }}
      >
        {buying ? "Comprar" : "Vender"}
      </button>
    </form>
  );
};
