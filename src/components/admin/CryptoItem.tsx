import { useState, useCallback } from "react";
import { Modal } from "../Modal";
import { EditCrypto } from "./EditCrypto";
import { Crypto } from "@prisma/client";

export const CryptoItem = ({
  cryptoCurrency,
  onDelete,
}: {
  cryptoCurrency: Crypto;
  onDelete: Function;
}) => {
  const { name, crypto, commission, fee, id } = cryptoCurrency;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ul className="flex items-center justify-around p-2 px-4 border-b-2 border-black w-[80%]">
      <li>
        <p className="min-w-[200px] max-w-[225px]">{name}</p>
      </li>

      <li>
        <p className="min-w-[200px] max-w-[225px]">{crypto}</p>
      </li>

      <li>
        <span>Com: {commission}%</span>
      </li>
      <li>
        <span>Fee: ${fee}</span>
      </li>

      <button className="p-2 rounded border-2 border-white" onClick={openModal}>
        Editar
      </button>
      <Modal title="Editar detalles" isOpen={isModalOpen} onClose={closeModal}>
        <EditCrypto close={closeModal} cryptoCurrency={cryptoCurrency} />
      </Modal>

      <button
        onClick={async (e) => {
          e.preventDefault();
          onDelete(cryptoCurrency.id);
        }}
        className="h-8 w-8 bg-red-500 rounded"
      >
        X
      </button>
    </ul>
  );
};