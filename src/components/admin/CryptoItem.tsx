type Crypto = {
  id: number;
  name: string;
  crypto: string;
  commission: number;
  fee: number;
};

export const CryptoItem = ({ cryptoCurrency }: { cryptoCurrency: Crypto }) => {
  const { name, crypto, commission, fee } = cryptoCurrency;

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

      <button>Editar</button>
    </ul>
  );
};
