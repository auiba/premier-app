"use client";

import { useState } from "react";
import { TextInput } from "./Input";

export const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form
      className="text-white items-center justify-center flex flex-col w-[375px] bg-[#343443] p-8 rounded border-[1px] border-gray-600"
      action=""
    >
      <TextInput
        name="name"
        htmlfor="name"
        handleChange={handleChange}
        labelText="Nombre"
        value={formData.name}
      />
    </form>
  );
};
