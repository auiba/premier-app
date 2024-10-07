export default function LoadingSkeleton() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <form className="animate-pulse gap-4 text-white items-center justify-center flex flex-col w-[375px] bg-[#343443] p-8 rounded border-[1px] border-gray-600">
        <div className="animate-pulse  w-[80%] h-16 rounded bg-gray-800"></div>

        <div className="animate-pulse  w-[80%] h-16 rounded bg-gray-800"></div>

        <div className="animate-pulse  w-[80%] h-8 rounded bg-gray-800"></div>

        <div className="animate-pulse w-[80%] h-8 rounded bg-gray-800"></div>

        <div className="animate-pulse w-[80%] h-8 rounded bg-gray-800"></div>
      </form>
    </main>
  );
}
