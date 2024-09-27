import { signIn } from "../../../auth";

export function SignIn({ text }: { text: string }) {
  return (
    <form
      className="flex flex-col gap-2 m-2"
      action={async (formData) => {
        "use server";

        console.log("USER EMAIL", formData.get("email"));

        await signIn("resend", {
          email: formData.get("email"),
          redirectTo: "/registrarse",
        });
      }}
    >
      <input
        className="p-2 rounded text-black"
        type="email"
        name="email"
        id="email"
        placeholder="ingresar email"
      />
      <button className="border-2 border-white p-1 rounded mt-4" type="submit">
        {text}
      </button>
    </form>
  );
}
