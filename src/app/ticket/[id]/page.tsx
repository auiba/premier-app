import { Transaction } from "@prisma/client";
import prisma from "../../../../db";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ticketId = (await params).id;

  const transactionData: Transaction | null =
    await prisma.transaction.findFirst({
      where: { id: Number(ticketId) },
    });

  const formatedDate = transactionData?.date.toISOString().slice(0, 10);

  return (
    <section className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <div className="flex flex-col items-start gap-14  bg-white text-black py-10 rounded px-12">
        <div className="flex gap-20 items-start justify-between uppercase">
          <div className="flex flex-col items-start justify-center font-medium">
            <p>Premier</p>
            <span> Tecnologia</span>
          </div>
          <p>Compra de cripto</p>
        </div>
        <div>
          <ul className="flex flex-col gap-4">
            <li>
              <p>Fecha: {formatedDate}</p>
            </li>
            <li>
              <p>Transacción: {transactionData?.id}</p>
            </li>
            <li>
              <p>Dirección: {transactionData?.bankstring}</p>
            </li>
            <li>
              <p>
                {" "}
                Tipo de cambio: {transactionData?.sendCurrency} a{" "}
                {transactionData?.receiveCurrency}
              </p>
            </li>
            <li>
              <p>
                Importe: {transactionData?.send}
                {transactionData?.sendCurrency}
              </p>
            </li>
            <li>
              <p>
                Cantidad: {transactionData?.receive}
                {transactionData?.receiveCurrency}{" "}
              </p>
            </li>
          </ul>
        </div>
        <div className="flex flex-col text-sm">
          <p>
            Atención al cliente (solo mensaje):{" "}
            <span className="font-semibold">1155837794</span>
          </p>
          <p>Sitio web: www.premier.com.ar</p>
        </div>
        <p className="self-center justify-self-center">GRACIAS</p>
      </div>
    </section>
  );
}
