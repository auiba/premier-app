const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#2b2b36] p-24">
      <a
        className="text-white text-xl p-2 rounded border-2 border-white"
        href="/exchange"
      >
        Comprar/vender crypto →
      </a>
    </main>
  );
}
