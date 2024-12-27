"use client";

import { useState } from "react";
import { Modal } from "../Modal";
import { useRouter } from "next/navigation";

export const TicketButtons = ({ ticketId }: { ticketId: number }) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openCancel, setOpenCancel] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center justify-center self-center">
      <button
        className="p-2 border-2 border-black rounded w-[200px] text-green-700 font-medium"
        onClick={(e) => {
          e.preventDefault;
          setOpenConfirm(true);
        }}
      >
        Confirmar transacción
      </button>
      <Modal
        title="Confirmar transacción"
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <button
          className="border-2 border-black rounded p-1"
          onClick={async (e) => {
            e.preventDefault();
            const createTransaction = await fetch("/api/transaction", {
              method: "POST",
              body: JSON.stringify({ ticketId }),
            });

            setOpenConfirm(false);
          }}
        >
          Confirmar
        </button>
        <button
          className="border-2 border-black rounded p-1"
          onClick={async (e) => {
            e.preventDefault();

            setOpenConfirm(false);
          }}
        >
          Cancelar
        </button>
      </Modal>

      <button
        className="p-2 border-2 border-black rounded w-[200px] font-medium text-red-800"
        onClick={(e) => {
          e.preventDefault;
          setOpenCancel(true);
        }}
      >
        Cancelar transacción
      </button>
      <Modal
        title="Cancelar transacción?"
        isOpen={openCancel}
        onClose={() => setOpenCancel(false)}
      >
        <button
          className="border-2 border-black rounded p-1"
          onClick={async (e) => {
            e.preventDefault();
            const createTransaction = await fetch("/api/transaction", {
              method: "DELETE",
              body: JSON.stringify({ ticketId }),
            });

            setOpenCancel(false);
            router.push("/admin/panel");
          }}
        >
          Sí, cancelar
        </button>
        <button
          className="border-2 border-black rounded p-1"
          onClick={async (e) => {
            e.preventDefault();

            setOpenCancel(false);
          }}
        >
          No cancelar
        </button>
      </Modal>
    </div>
  );
};
