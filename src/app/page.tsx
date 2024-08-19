import { ExchangeForm } from "@/components/exchange/Form";
import { getConstants } from "../../utils/services";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export default async function Home() {
  const constants = await getConstants(apiUrl!, apiKey!);

  const { commission, fee } = constants;
  // console.log(constants);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExchangeForm {...constants} />
    </main>
  );
}
