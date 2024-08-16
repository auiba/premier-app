"use client";

import { Dispatch, SetStateAction, useCallback } from "react";

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
  receive?: number;
  setSendingCurrency: Dispatch<SetStateAction<any>>;
  setReceivingCurrency: Dispatch<SetStateAction<any>>;
  setSendingAmount: Dispatch<SetStateAction<any>>;
};

export const SendInput = ({
  buying,
  setSendingCurrency,
  setSendingAmount,
  cryptoCurrencies,
  fiatCurrencies,
}: ExchangeInput) => {
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      // async API service call here
      // set parent state to async call result
    }, 500),
    []
  );

  let currencyOptions;

  if (buying) {
    currencyOptions = fiatCurrencies;
  } else {
    currencyOptions = cryptoCurrencies;
  }

  const handleChange = async () => {};

  const options = currencyOptions.map((currency, id) => (
    <option key={id} className="p-2 text-black" value={currency.name}>
      {currency.name}
    </option>
  ));

  return (
    <div>
      <label htmlFor="send">Envías</label>
      <input
        onChange={(e) => {
          setSendingAmount(e.currentTarget.value);
        }}
        id="send"
        type="number"
        name="send"
      />
      <select
        className="p-2 text-black"
        onChange={(e) => {
          const selectedCurrency = currencyOptions.find(
            (currency) => currency.name == e.target.value
          );
          setSendingCurrency(selectedCurrency);
        }}
        name=""
        id=""
      >
        {options}
      </select>
    </div>
  );
};

// export const ReceiveInput = ({
//   buying,
//   receive,
//   setReceivingCurrency,
//   setSendingAmount,
//   cryptoCurrencies,
//   fiatCurrencies,
// }: ExchangeInput) => {
//   let currencyOptions;

//   if (buying) {
//     currencyOptions = fiatCurrencies;
//   } else {
//     currencyOptions = cryptoCurrencies;
//   }

//   const options = currencyOptions.map((currency, id) => (
//     <option key={id} className="p-2 text-black" value={currency.name}>
//       {currency.name}
//     </option>
//   ));
//   return (
//     <div className="text-white">
//       <label htmlFor="">Recibes:</label>
//       <div className="text-gray-200">{receive}</div>
//       <select
//         className="p-2 text-black"
//         onChange={(e) => {
//           const selectedCurrency = currencyOptions.find(
//             (currency) => currency.name == e.target.value
//           );
//           setReceivingCurrency(selectedCurrency);
//         }}
//         name=""
//         id=""
//       >
//         {options}
//       </select>
//     </div>
//   );
// };
