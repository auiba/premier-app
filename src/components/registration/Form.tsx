"use client";

import { useState } from "react";
import { TextInput } from "./Input";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birth: "",
    sex: "",
    civil: "",
  });
  const [step, setStep] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const Step1 = () => (
    <>
      <TextInput
        name="name"
        htmlfor="name"
        handleChange={handleChange}
        labelText="Nombre"
        value={formData.name}
        ph="Rodrigo"
      />
      <TextInput
        name="lastName"
        htmlfor="lastName"
        handleChange={handleChange}
        labelText="Apellido"
        value={formData.lastName}
        ph="Perez"
      />
      <label className="flex flex-col justify-center" htmlFor="age">
        Fecha de nacimiento
        <input
          className="text-white text-xl w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
          onChange={(e) => handleChange(e)}
          type="date"
        />
      </label>
      <label className="flex flex-col justify-center" htmlFor="sex">
        Sexo
        <select
          onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
          className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
          name="sex"
        >
          <option value={""}>Elige una opción</option>
          <option value={"M"}>Masculino</option>
          <option value={"F"}>Femenino</option>
        </select>
      </label>
      <label className="flex flex-col justify-center" htmlFor="civil">
        Estado civil
        <select
          onChange={(e) => setFormData({ ...formData, civil: e.target.value })}
          className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
          name="civil"
        >
          <option value={""}>Elige una opción</option>
          <option value={"casado"}>Casado</option>
          <option value={"soltero"}>Soltero</option>
          <option value={"divorciado"}>Divorciado</option>
          <option value={"viudo"}>Viudo</option>
        </select>
      </label>
    </>
  );

  return (
    <form
      className="text-white items-center 
      gap-4 justify-center flex flex-col w-[375px] bg-[#343443] p-4 pb-8 rounded border-[1px] border-gray-600"
      action=""
    >
      <h2 className="text-lg">Completa la información solicitada</h2>
      {step === 1 && <Step1 />}

      <button
        onClick={(e) => {
          e.preventDefault();
          setStep(step + 1);
        }}
        className="rounded p-2 text-lg"
      >
        Siguiente{" "}
      </button>

      <span>{step}/3</span>
    </form>
  );
};
