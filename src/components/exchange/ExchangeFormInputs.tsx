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
  // const debouncedSearch = useCallback(
  //   debounce(async (value: number) => {
  //     // async API service call here
  //     // from, to , price (amount)
  //     // set parent state to async call result

  //     setSendingAmount(value);
  //   }, 450),
  //   []
  // );

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
    <option key={id} className="p-2 text-black uppercase" value={currency}>
      {currency}
    </option>
  ));

  return (
    <div className="flex flex-col gap-2">
      <span>Envías</span>
      <label htmlFor="send">
        <input
          className="text-black w-[300px] p-2 rounded m-1"
          onChange={async (e) => {
            handleChange(e);
          }}
          id="send"
          type="number"
          name="send"
        />
        <select
          className="p-2 text-black -ml-6 rounded h-12 w-32 uppercase"
          onChange={(e) => {
            setSendingCurrency(e.target.value);
          }}
          name=""
          id=""
        >
          {options}
        </select>
      </label>
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
