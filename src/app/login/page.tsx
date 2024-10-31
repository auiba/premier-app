import { redirect } from "next/navigation";
import { RedirectFromClient } from "@/components/emails/Redirect";
import logo from "../../../public/logo/retrokalogofull.png";
import Image from "next/image";

const baseUrl = process.env.BASE_URL;
export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const token = searchParams?.tkn;
  const email = searchParams?.eml;

  console.log("PAGE TOKEN", token);
  console.log("PAGE EMAIL", email);

  // Actually using the Auth.js token on the redirect ==>

  // redirect(
  //   `${baseUrl}api/auth/callback/resend?callbackUrl=${baseUrl}crear-proveedor&token=${token}&email=${email}`
  // );

  return (
    <section className="flex flex-col items-center py-10">
      <h2 className="text-black text-3xl font-bold">Hola, </h2>
      <div className="mt-10 text-xl max-w-[400px]">
        Redireccionando, por favor espere...
      </div>
      <RedirectFromClient email={email} token={token} />
    </section>
  );
}
