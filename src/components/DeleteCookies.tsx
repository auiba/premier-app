import { deleteAllCookies } from "../../utils/authHelpers";
import { redirect } from "next/navigation";

export const DeleteCookiesBtn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await deleteAllCookies().then(() => redirect("/"));
      }}
    >
      <button
        className="p-1 px-6 border-[1px] rounded text-md border-black max-w-[400px]"
        type="submit"
      >
        Salir
      </button>
    </form>
  );
};
