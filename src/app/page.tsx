const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export default async function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[#2b2b36] p-24">
      <a
        className="text-white text-xl p-2 rounded border-2 border-white"
        href="/exchange"
      >
        Comprar/vender crypto →
      </a>
      <a
        className="text-white text-xl p-2 rounded border-2 border-white"
        href="/auth/signin"
      >
        Ingresar →
      </a>
    </main>
  );
}
