import { SignIn } from "@/components/registration/SignInButton";

export default function SignInPage() {
  return (
    <section className="flex bg-[#3e3e59] flex-col items-center justify-center h-full mt-20 pb-10 p-4">
      <div className="text-3xl">
        <h2 className="text-left text-2xl">Ingresar</h2>
      </div>

      <SignIn text="Enviar" />
    </section>
  );
}
