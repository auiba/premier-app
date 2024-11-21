import { Crypto } from "@prisma/client";
import { CryptoItem } from "./CryptoItem";

export const CryptosTable = ({ cryptos }: { cryptos: Crypto[] }) => {
  const cryptosList = cryptos.map((crypto, id) => (
    <CryptoItem key={id} cryptoCurrency={crypto} />
  ));
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      {cryptosList}
    </div>
  );
};
