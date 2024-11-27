import { useState, useCallback } from "react";
import { Modal } from "../Modal";
import { EditCrypto } from "./EditCrypto";

export type Crypto = {
  id: number;
  name: string;
  crypto: string;
  commission: number;
  fee: number;
};

export const CryptoItem = ({ cryptoCurrency }: { cryptoCurrency: Crypto }) => {
  const { name, crypto, commission, fee } = cryptoCurrency;
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
        <EditCrypto close={closeModal} crypto={cryptoCurrency} />
      </Modal>

      <button className="h-8 w-8 bg-red-500 rounded">X</button>
    </ul>
  );
};
