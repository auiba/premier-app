import { Transaction } from "@prisma/client";
import prisma from "../../../../db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isTokenValid } from "../../../../utils/authHelpers";
import { TrackingUrlUpdater } from "@/components/ticket/UpdateTracking";
import { TicketButtons } from "@/components/ticket/Buttons";
import { CopyTextButton } from "@/components/CopyButton";
import premierlogo from "../../../../public/imgs/icons/premierlogo.png";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ticketId = (await params).id;

  const ticketData: Transaction | null = await prisma.transaction.findFirst({
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
            <div className="flex flex-row items-center justify-center ">
              <Image alt="logo" width={50} height={50} src={premierlogo} />
              <div className="flex flex-col items-start justify-center font-medium">
                <p className="font-bold text-lg">Premier</p>
                <span className="text-[13px] font-bold"> Tecnologia</span>
              </div>
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
                <li className="flex flex-row items-center justify-center gap-2">
                  <p>Dirección: {ticketData?.bankstring}</p>
                  <CopyTextButton text={ticketData?.bankstring || ""} />
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
                <li className="flex flex-row items-center gap-2">
                  <p>
                    Cantidad: {ticketData?.receive}
                    {ticketData?.receiveCurrency}
                  </p>
                  <CopyTextButton text={`${ticketData.receive}` || ""} />
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>

          {ticketData?.confirmed ? (
            <p className="text-md text-green-700">Transacción ya confirmada.</p>
          ) : (
            <>
              <div className="flex flex-row items-center">
                <TrackingUrlUpdater
                  ticketId={ticketData?.id as number}
                  trackingUrl={
                    ticketData?.trackingUrl || "Esperando url de seguimiento"
                  }
                />
              </div>

              <TicketButtons ticketId={Number(ticketId)} />
            </>
          )}
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
            <div className="flex flex-row items-center justify-center ">
              <Image alt="logo" width={50} height={50} src={premierlogo} />
              <div className="flex flex-col items-start justify-center font-medium">
                <p className="font-bold text-lg">Premier</p>
                <span className="text-[13px] font-bold"> Tecnologia</span>
              </div>
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
          <div className="flex flex-row gap-2 items-center">
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
            <CopyTextButton
              text={
                ticketData?.trackingUrl?.startsWith("http")
                  ? ticketData.trackingUrl
                  : `https://${ticketData?.trackingUrl}`
              }
            />
          </div>
          {ticketData?.confirmed && (
            <p className="text-md text-green-700">Transacción ya confirmada.</p>
          )}
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
