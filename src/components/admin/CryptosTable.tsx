import { Crypto } from "@prisma/client";
import { CryptoItem } from "./CryptoItem";
import { Modal } from "../Modal";
import { useState, useCallback, useEffect } from "react";
import { AddCrypto } from "./AddCrypto";
import { useCryptos } from "@/context/AdminCryptos";

export const CryptosTable = ({ cryptosList }: { cryptosList: Crypto[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cryptos, addToCryptoList, updateCrypto, deleteCrypto, setCryptos } =
    useCryptos();

  useEffect(() => {
    if (cryptos.length) {
      setCryptos(cryptos);
    } else {
      setCryptos(cryptosList);
    }
  }, [cryptos]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch("/api/admin/cryptos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    deleteCrypto(id);
  };

  const handleAdd = async (cryptoData: {
    name: string;
    cripto: string;
    comm: number;
    fee: number;
  }) => {
    const addCrypto = await fetch("/api/admin/cryptos", {
      method: "POST",
      body: JSON.stringify(cryptoData),
    });
    const newCryptoData = await addCrypto.json();
    addToCryptoList(newCryptoData);
  };

  const handleUpdate = (updatedCrypto: Crypto) => {
    updateCrypto(updatedCrypto);
  };

  const cryptosListItems = cryptos?.map((crypto, id) => (
    <CryptoItem
      onEdit={handleUpdate}
      onDelete={handleDelete}
      key={id}
      cryptoCurrency={crypto}
    />
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
        <AddCrypto onAdd={handleAdd} close={closeModal} />
      </Modal>
      {cryptosListItems}
    </div>
  );
};
