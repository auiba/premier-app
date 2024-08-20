export const DollarPrice = ({
  compra,
  venta,
}: {
  compra: number;
  venta: number;
}) => {
  return (
    <div className="flex w-[375px] px-4 items-center justify-between  p-2 rounded bg-[#3e3e59] mt-4">
      <span>USD/ARS</span>
      <div className="flex gap-4 items-center justify-center">
        <div className="flex flex-col text-xl items-center justify-center">
          <h3 className="text-lg">Compra</h3>
          <span className="text-[#159c67] font-semibold">{compra}</span>
        </div>
        <div className="flex flex-col text-xl items-center justify-center">
          <h3 className="text-lg">Venta</h3>
          <span className="text-[#159c67] font-semibold">{venta}</span>
        </div>
      </div>
    </div>
  );
};
