import Image from "next/image";
import rightarrow from "../../../public/imgs/icons/rightarrow.svg";
import wsp from "../../../public/imgs/icons/whatsapp.svg";

export type Transaction = {
  id: number;
  date: Date;
  email: string;
  send: number;
  sendCurrency: string;
  receive: number;
  receiveCurrency: string;
  phone: string;
};

export const TransactionItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const {
    id,
    date,
    email,
    send,
    sendCurrency,
    receive,
    receiveCurrency,
    phone,
  } = transaction;

  // make date object readable
  const dateString = date.toISOString().replace("T", " ").slice(0, 16);

  return (
    <ul className="flex items-center justify-around p-2 px-4 border-b-2 border-black w-[80%]">
      <li>
        <a
          className="px-2 h-8 border-[1px] border-gray-400 rounded"
          target="_blank"
          href={`/ticket/${id}`}
        >
          <span className="text-sm text-gray-400  ">{id}</span>
        </a>
      </li>
      <li>
        <span className="text-sm text-gray-400">{dateString}</span>
      </li>
      <li>
        <p className="min-w-[200px] max-w-[225px]">{email}</p>
      </li>
      <li className="flex flex-col ">
        <span className="text-gray-400 text-sm">Entrega</span>
        <p className="text-lg">
          {send} {sendCurrency}
        </p>
      </li>

      <Image alt="arrow" height={35} width={35} src={rightarrow}></Image>

      <li className="flex flex-col">
        <span className="text-gray-400 text-sm">Recibe</span>
        <p className="text-lg">
          {receive} {receiveCurrency}
        </p>
      </li>
      <li className="flex gap-2 items-center justify-center">
        <p>{phone.replaceAll(" ", "")}</p>
        <Image src={wsp} width={20} height={20} alt="" />
      </li>
    </ul>
  );
};
