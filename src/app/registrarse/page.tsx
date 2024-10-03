import { RegistrationForm } from "@/components/registration/Form";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import prisma from "../../../db";

// #2b2b36 bg
// #343443 elements

export default async function RegistrationPage() {
  const session = await auth();
  const userEmail = session?.user?.email;

  if (userEmail) {
    const userExists = await prisma.customer.findFirst({
      where: { email: userEmail },
    });

    if (userExists) {
      redirect("/exclusive");
    } else {
      return (
        <section className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] lg:pt-12">
          <RegistrationForm sessionEmail={userEmail} />
        </section>
      );
    }
  } else {
    redirect("/");
  }
}
