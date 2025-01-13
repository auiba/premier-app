import { createContext, useState, useContext, ReactNode } from "react";
import { Crypto } from "@prisma/client";

type CryptosContextType = {
  cryptos: Crypto[];
  addToCryptoList: (crypto: Crypto) => void;
  updateCrypto: (updatedCrypto: Partial<Crypto>) => void;
  deleteCrypto: (id: number) => void;
  setCryptos: (cryptos: Crypto[]) => void;
};

// Create context with a default value
const CryptosContext = createContext<CryptosContextType>({
  cryptos: [],
  addToCryptoList: () => {},
  updateCrypto: () => {},
  deleteCrypto: () => {},
  setCryptos: () => {},
});

export function CryptosProvider({ children }: { children: ReactNode }) {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  const addToCryptoList = (newCrypto: Crypto) => {
    setCryptos((prev) => [...prev, newCrypto]);
  };

  const updateCrypto = (updatedCrypto: Partial<Crypto>) => {
    setCryptos((prev) =>
      prev.map((crypto) =>
        crypto.id === updatedCrypto.id
          ? { ...crypto, ...updatedCrypto }
          : crypto
      )
    );
  };

  const deleteCrypto = (id: number) => {
    setCryptos((prev) => prev.filter((crypto) => crypto.id !== id));
  };

  const value = {
    cryptos,
    addToCryptoList,
    updateCrypto,
    deleteCrypto,
    setCryptos,
  };

  return (
    <CryptosContext.Provider value={value}>{children}</CryptosContext.Provider>
  );
}

export function useCryptos() {
  const context = useContext(CryptosContext);
  if (context === undefined) {
    throw new Error("useCryptos must be used within a CryptosProvider");
  }
  return context;
}

export { CryptosContext };
