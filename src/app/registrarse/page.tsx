import { RegistrationForm } from "@/components/registration/Form";

// #2b2b36 bg
// #343443 elements

export default async function RegistrationPage() {
  return (
    <section className="flex min-h-screen flex-col w-full items-center justify-between  bg-[#2b2b36] p-24 pt-4 lg:pt-12">
      <RegistrationForm />
    </section>
  );
}
