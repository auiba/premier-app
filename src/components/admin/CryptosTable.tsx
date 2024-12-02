import { Crypto } from "@prisma/client";
import { CryptoItem } from "./CryptoItem";
import { Modal } from "../Modal";
import { useState, useCallback, useEffect } from "react";
import { AddCrypto } from "./AddCrypto";

export const CryptosTable = ({ cryptos }: { cryptos: Crypto[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cryptosList, setCryptosList] = useState<Crypto[]>();

  useEffect(() => {
    setCryptosList(cryptos);
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
    setCryptosList((prev) => prev?.filter((crypto) => crypto.id !== id));
  };

  const handleAdd = async (cryptoData: {
    name: string;
    cripto: string;
    comm: number;
    fee: number;
  }) => {
    console.log("cryptodata =>", cryptoData);
    const addCrypto = await fetch("/api/admin/cryptos", {
      method: "POST",
      body: JSON.stringify(cryptoData),
    });
    const newCryptoData = await addCrypto.json();
    setCryptosList([...cryptosList!, newCryptoData]);
  };

  const cryptosListItems = cryptosList?.map((crypto, id) => (
    <CryptoItem onDelete={handleDelete} key={id} cryptoCurrency={crypto} />
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
