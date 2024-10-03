"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { SendInput, ReceiveInput } from "./ExchangeFormInputs";
import { useRouter } from "next/navigation";
import { Crypto } from "../../../utils/types";

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
  dollarPrice,
  cryptos,
}: {
  dollarPrice: { compra: number; venta: number };
  cryptos?: Crypto[];
}) => {
  const [sendingAmount, setSendingAmount] = useState<string>("");
  const [sendCurrency, setSendCurrency] = useState<string>("usd");
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [receivingCurrency, setReceivingCurrency] = useState("btc");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [account, setAccount] = useState<string>("");
  const [buying, setBuying] = useState<boolean>(true);
  const [cash, setCash] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  console.log(`from: ${sendCurrency}`, `to: ${receivingCurrency}`);

  const filteredCryptos = cryptos?.filter(
    (crypto) => crypto.name !== "bitco" && crypto.name !== ""
  );

  const selectedCurrency = buying
    ? filteredCryptos?.find((crypto) => crypto.name == receivingCurrency)
    : filteredCryptos?.find((crypto) => crypto.name == sendCurrency);

  const flipCurrencies = () => {
    setSendingAmount("");
    setReceiveAmount(0);
    setSendCurrency(receivingCurrency);
    setReceivingCurrency(sendCurrency);
  };

  const resetAmount = () => {
    setSendingAmount("");
    setReceiveAmount(0);
  };

  const debouncedSearch = useCallback(
    debounce(
      async (
        sendCurrency: string,
        receivingCurrency: string,
        value: string
      ) => {
        // async API service call here
        // from, to , price (amount)
        // set parent state to async call result

        setLoading(true);

        const response = await fetch("/api/calculate", {
          method: "POST",
          body: JSON.stringify({
            from: sendCurrency,
            to: receivingCurrency,
            price: value,
          }),
        });

        const data = await response.json();

        setLoading(false);
        // console.log(data.result);
        setReceiveAmount(data.result);
      },
      100
    ),

    []
  );

  useEffect(() => {
    if (sendingAmount == "0" || sendingAmount == "") return;
    setLoading(true);
    debouncedSearch(sendCurrency, receivingCurrency, sendingAmount as string);
    setLoading(false);
  }, [sendingAmount]);

  const fiatOptions = ["usd", "ars"];
  const cryptoOptions = filteredCryptos?.map((crypto, id) => crypto.name);

  const cashRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="text-white items-center justify-center flex flex-col w-[375px] bg-[#343443] p-8 rounded border-[1px] border-gray-600"
      action=""
      onSubmit={(e) => e.preventDefault()}
    >
      <SendInput
        buying={buying}
        resetAmount={resetAmount}
        sending={sendingAmount as string}
        cryptoCurrencies={cryptoOptions as string[]}
        fiatCurrencies={fiatOptions}
        setReceivingCurrency={setReceivingCurrency}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
      />
      <div className="flex items-center justify-between w-full py-4">
        <div className="-ml-2">
          <ul className="text-[12px]">
            <li>Comisión: {selectedCurrency?.comm}%</li>
            {buying ? (
              <li>Fee de red: {selectedCurrency?.fee} USD</li>
            ) : (
              <li>Fee de red: 0</li>
            )}
          </ul>
        </div>

        <div className="flex gap-2 bg-[#30303e] p-1 rounded">
          <button
            className={`${
              buying ? "text-gray-400" : "text-[#0ca66a] bg-[#3e3f57]"
            } rounded p-1 font-medium`}
            onClick={(e) => {
              e.preventDefault();
              flipCurrencies();
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
              flipCurrencies();
              setCash(false);
              setBuying(true);
            }}
          >
            Comprar
          </button>
        </div>
      </div>
      <ReceiveInput
        receive={receiveAmount}
        buying={buying}
        cryptoCurrencies={cryptoOptions as string[]}
        fiatCurrencies={fiatOptions}
        resetAmount={resetAmount}
        receivingCurrency={receivingCurrency}
        setReceivingCurrency={setReceivingCurrency}
        setSendingAmount={setSendingAmount}
        setSendingCurrency={setSendCurrency}
        loading={loading}
      />
      <label className="flex flex-col mt-4" htmlFor="name">
        Nombre y apellido *
        <input
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} // Prevent form submit on Enter
          placeholder="Pablo Perez"
          className="w-[325px] rounded h-10 p-2 bg-[#3e3e59]"
          id="name"
          name="name"
          type="text"
          value={name !== "" ? name : ""}
        />
      </label>
      <label className="flex flex-col mt-4" htmlFor="email">
        Correo Electrónico *
        <input
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pablo@gmail.com"
          className="w-[325px] rounded h-10 p-2 bg-[#3e3e59]"
          id="email"
          name="email"
          type="email"
          value={email !== "" ? email : ""}
        />
      </label>
      <label className="flex flex-col mt-4" htmlFor="phone">
        Número de WhatsApp *
        <input
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+5496319426789"
          className="w-[325px] rounded h-10 p-2 bg-[#3e3e59]"
          id="phone"
          name="phone"
          type="number"
          value={phone! !== "" ? phone : ""}
        />
      </label>

      <label
        className={`${cash ? "opacity-10" : ""}  flex flex-col mt-4`}
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
          onChange={(e) => {
            setAccount(e.target.value);
          }}
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
            onChange={(e) => {
              setCash(e.target.checked);
            }}
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
              name: name,
              email: email,
              bankstring: account,
              phone: phone,
            }),
          });

          const data = await response
            .json()
            .then((urlData) => router.push(urlData.url));
        }}
      >
        {buying ? "Comprar" : "Vender"}
      </button>
    </form>
  );
};
