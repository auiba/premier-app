export default function VerifyPage() {
  return (
    <section className="flex flex-col items-center justify-center h-full mt-10 p-2">
      <div className="text-left items-start flex flex-col mt-4 text-xl max-w-[400px]">
        <p>
          Revisa tu correo para completar el registro o acceder a nuestra app.
        </p>
        <span>{"(Si no lo encontras, revisa spam)."}</span>
      </div>
    </section>
  );
}
