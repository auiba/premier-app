import { Transaction } from "@prisma/client";
import prisma from "../../../../db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isTokenValid } from "../../../../utils/authHelpers";
import { TrackingUrlUpdater } from "@/components/ticket/UpdateTracking";
import { TicketButtons } from "@/components/ticket/Buttons";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ticketId = (await params).id;

  const ticketData: Transaction | null = await prisma.ticket.findFirst({
    where: { id: Number(ticketId) },
  });

  const formatedDate = ticketData?.date.toISOString().slice(0, 10);

  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;
  const tokenObj = token && JSON.parse(token);

  if (tokenObj && isTokenValid(tokenObj)) {
    return (
      <section className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
        <div className="flex flex-col items-start gap-8  bg-white text-black py-10 rounded px-12">
          <div className="flex gap-20 items-start justify-between uppercase">
            <div className="flex flex-col items-start justify-center font-medium">
              <p>Premier</p>
              <span> Tecnologia</span>
            </div>
            <p>Compra de cripto</p>
          </div>
          <div>
            {ticketData ? (
              <ul className="flex flex-col gap-4">
                <li>
                  <p>Fecha: {formatedDate}</p>
                </li>
                <li>
                  <p>Transacción: {ticketData?.id}</p>
                </li>
                <li>
                  <p>Dirección: {ticketData?.bankstring}</p>
                </li>
                <li>
                  <p>
                    {" "}
                    Tipo de cambio: {ticketData?.sendCurrency} a{" "}
                    {ticketData?.receiveCurrency}
                  </p>
                </li>
                <li>
                  <p>
                    Importe: {ticketData?.send}
                    {ticketData?.sendCurrency}
                  </p>
                </li>
                <li>
                  <p>
                    Cantidad: {ticketData?.receive}
                    {ticketData?.receiveCurrency}{" "}
                  </p>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
          <TrackingUrlUpdater
            ticketId={ticketData?.id as number}
            trackingUrl={ticketData?.trackingUrl || "Pegar url de seguimiento"}
          />

          <TicketButtons ticketId={Number(ticketId)} />

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
  } else {
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
            {ticketData ? (
              <ul className="flex flex-col gap-4">
                <li>
                  <p>Fecha: {formatedDate}</p>
                </li>
                <li>
                  <p>Transacción: {ticketData?.id}</p>
                </li>
                <li>
                  <p>Dirección: {ticketData?.bankstring}</p>
                </li>
                <li>
                  <p>
                    {" "}
                    Tipo de cambio: {ticketData?.sendCurrency} a{" "}
                    {ticketData?.receiveCurrency}
                  </p>
                </li>
                <li>
                  <p>
                    Importe: {ticketData?.send}
                    {ticketData?.sendCurrency}
                  </p>
                </li>
                <li>
                  <p>
                    Cantidad: {ticketData?.receive}
                    {ticketData?.receiveCurrency}{" "}
                  </p>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
          <div>
            <span className="text-sm">URL de seguimiento:</span>
            <a
              href={
                ticketData?.trackingUrl?.startsWith("http")
                  ? ticketData.trackingUrl
                  : `https://${ticketData?.trackingUrl}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-lg font-medium">
                {ticketData?.trackingUrl || "Esperando URL de seguimiento."}
              </p>
            </a>
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
}