import { Crypto } from "@prisma/client";
import { CryptoItem } from "./CryptoItem";
import { Modal } from "../Modal";
import { useState, useCallback } from "react";
import { AddCrypto } from "./AddCrypto";

export const CryptosTable = ({ cryptos }: { cryptos: Crypto[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const cryptosList = cryptos.map((crypto, id) => (
    <CryptoItem key={id} cryptoCurrency={crypto} />
  ));
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <button
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
        className="text-md rounded p-2 border-2 border-white mb-4"
      >
        + Agregar cripto
      </button>
      <Modal title="Agregar cripto" isOpen={isModalOpen} onClose={closeModal}>
        {" "}
        <AddCrypto close={closeModal} />
      </Modal>
      {cryptosList}
    </div>
  );
};
