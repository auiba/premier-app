import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isTokenValid } from "../../../utils/authHelpers";

const adminUser = process.env.ADMIN_LOGIN;
const adminPw = process.env.ADMIN_PASSWORD;

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;
  const tokenObj = token && JSON.parse(token);

  if (tokenObj && isTokenValid(tokenObj)) {
    redirect("/admin/panel");
  }

  async function adminLogin(formData: FormData) {
    "use server";

    const user = formData.get("user");
    const pw = formData.get("password");

    if (user !== adminUser || pw !== adminPw) {
      console.log("wrong data");
      return "wrong information";
    } else {
      console.log("data ok. Setting up session cookie...");
      // set cookies, etc
      cookies().set(
        "admin_session",
        JSON.stringify({ user: user, password: pw }),
        {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 604800,
        }
      );

      redirect("/admin/panel");
    }
  }

  return (
    <section className="flex min-h-screen flex-col w-full items-center gap-10 bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <form
        className="text-white items-center justify-center flex flex-col w-[375px] bg-[#343443] gap-4 p-8 rounded border-[1px] border-gray-600"
        action={adminLogin}
      >
        <label
          className="flex flex-col items-start justify-center text-gray-300"
          htmlFor="user"
        >
          Email:
          <input
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            type="text"
            name="user"
            placeholder="hola@gmail.com"
          />
        </label>
        <label
          className="flex flex-col items-start justify-center text-gray-300"
          htmlFor="password"
        >
          Contraseña
          <input
            className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
            type="password"
            name="password"
            placeholder="********"
          />
        </label>
        <button className="p-2 rounded border-2 border-white" type="submit">
          Entrar
        </button>
      </form>
    </section>
  );
}
