"use client";

import { useState } from "react";
import { TextInput } from "./Input";
import uploadArrow from "../../../public/imgs/icons/uploadarrow.svg";
import { useRouter } from "next/navigation";

import Image from "next/image";

// #00c26f green

const fileToBlob = async (file: File) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

export const RegistrationForm = ({
  sessionEmail,
}: {
  sessionEmail: string;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birth: "",
    gender: "",
    dni: "",
    civil: "",
    politicalExposure: false,
    address: "",
    floor: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [dniFront, setDniFront] = useState<File | undefined>(undefined);
  const [dniBack, setDniBack] = useState<File | undefined>(undefined);
  const [dniSelfie, setDniSelfie] = useState<File | undefined>(undefined);
  const [serviceImg, setServiceImg] = useState<File | undefined>(undefined);

  const [dniFrontUrl, setDniFrontUrl] = useState<string | undefined>("");
  const [dniBackUrl, setDniBackUrl] = useState<string | undefined>("");
  const [dniSelfieUrl, setDniSelfieUrl] = useState<string | undefined>("");
  const [serviceImgUrl, setServiceImgUrl] = useState<string | undefined>("");

  const [step, setStep] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  return (
    <form
      className="text-white items-center 
      gap-2  flex flex-col w-[375px] bg-[#343443] p-4 pb-8 rounded border-[1px] min-h-[650px] border-gray-600"
      action=""
    >
      <h2 className="text-xl text-white ">
        Completa la información solicitada
      </h2>

      {step === 1 && (
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
          <label
            className="flex flex-col justify-center text-gray-300"
            htmlFor="birth"
          >
            Fecha de nacimiento
            <input
              name="birth"
              className="text-white text-xl w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [e.target.name]: new Date(
                    e.target.value + "T00:00:00Z"
                  ).toISOString(),
                })
              }
              type="date"
            />
          </label>
          <label
            className="flex flex-col justify-center text-gray-300"
            htmlFor="gender"
          >
            Sexo
            <select
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
              name="gender"
              value={formData.gender}
            >
              <option value={""}>Elige una opción</option>
              <option value={"M"}>Masculino</option>
              <option value={"F"}>Femenino</option>
            </select>
          </label>
          <label
            className="flex flex-col justify-center text-gray-300"
            htmlFor="civil"
          >
            Estado civil
            <select
              onChange={(e) =>
                setFormData({ ...formData, civil: e.target.value })
              }
              className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
              name="civil"
              value={formData.civil}
            >
              <option value={""}>Elige una opción</option>
              <option value={"casado"}>Casado</option>
              <option value={"soltero"}>Soltero</option>
              <option value={"divorciado"}>Divorciado</option>
              <option value={"viudo"}>Viudo</option>
            </select>
          </label>
        </>
      )}
      {step === 2 && (
        <>
          <label
            className="flex flex-col justify-center text-gray-300"
            htmlFor="politicalExposure"
          >
            Exposición política
            <select
              onChange={(e) => {
                if (e.target.value == "Y") {
                  setFormData({ ...formData, politicalExposure: true });
                } else {
                  setFormData({ ...formData, politicalExposure: false });
                }
              }}
              className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
              name="politicalExposure"
              value={formData.politicalExposure ? "Y" : "N"}
            >
              <option value={""}>Elige una opción</option>
              <option value={"Y"}>Sí</option>
              <option value={"N"}>No</option>
            </select>
          </label>
          <TextInput
            name="dni"
            htmlfor="dni"
            handleChange={handleChange}
            labelText="DNI"
            value={formData.dni}
            ph="45408559G"
          />
          <h3>
            A continuación deberás enviarnos las siguientes imágenes de carácter
            obligatorio:
          </h3>
          <span>Foto frente DNI</span>
          <label
            className="flex items-center justify-center gap-2 p-2 w-[160px] text-lg text-left rounded border-2 border-orange justify-self-center hover:cursor-pointer "
            htmlFor="dniFront"
          >
            <Image height={35} width={35} src={uploadArrow} alt="" /> Subir foto
          </label>
          <input
            id="dniFront"
            name="dniFront"
            type="file"
            accept=".JPG, .jpg, .jpeg"
            className="h-[1px] mb-2 hover:cursor-pointer opacity-0"
            onChange={async (e) => {
              const files = e.target.files;

              let blobFile;
              if (files) {
                setDniFront(files[0]);
                blobFile = await fileToBlob(files[0]);

                const formData = new FormData();
                formData.append("blobFile", blobFile, files[0].name);

                const blobUpload = await fetch("/api/upload", {
                  method: "PUT",
                  body: formData,
                });

                const dataz = await blobUpload.json();

                setDniFrontUrl(dataz);
              }
            }}
          />
          {dniFront && (
            <span className="ml-2 text-gray-300">{dniFront?.name}</span>
          )}

          <span className="mb-2">Foto dorso DNI</span>
          <label
            className="flex items-center justify-center gap-2 p-2 w-[160px] text-lg text-left rounded border-2 border-orange justify-self-center hover:cursor-pointer "
            htmlFor="dniBack"
          >
            <Image height={35} width={35} src={uploadArrow} alt="" /> Subir foto
          </label>
          <input
            id="dniBack"
            name="dniBack"
            type="file"
            accept=".JPG, .jpg, .jpeg"
            className="h-[1px] mb-2 hover:cursor-pointer opacity-0"
            onChange={async (e) => {
              const files = e.target.files;

              let blobFile;
              if (files) {
                setDniBack(files[0]);
                blobFile = await fileToBlob(files[0]);

                const formData = new FormData();
                formData.append("blobFile", blobFile, files[0].name);

                const blobUpload = await fetch("/api/upload", {
                  method: "PUT",
                  body: formData,
                });

                const dataz = await blobUpload.json();

                setDniBackUrl(dataz);
              }
              // Upload to vercel blob storage, THEN use the retrieved url and assign it to state
              // so it can be sent as user registration to api endpoint
            }}
          />
          {dniBack && (
            <span className="ml-2 text-gray-300">{dniBack?.name}</span>
          )}

          <span>Selfie DNI</span>
          <label
            className="flex items-center justify-center gap-2 p-2 w-[160px] text-lg text-left rounded border-2 border-orange justify-self-center hover:cursor-pointer "
            htmlFor="selfie"
          >
            <Image height={35} width={35} src={uploadArrow} alt="" /> Subir foto
          </label>
          <input
            id="selfie"
            name="selfie"
            type="file"
            accept=".JPG, .jpg, .jpeg"
            className="h-[1px] mb-2 hover:cursor-pointer opacity-0"
            onChange={async (e) => {
              const files = e.target.files;

              let blobFile;
              if (files) {
                setDniSelfie(files[0]);
                blobFile = await fileToBlob(files[0]);

                const formData = new FormData();
                formData.append("blobFile", blobFile, files[0].name);

                const blobUpload = await fetch("/api/upload", {
                  method: "PUT",
                  body: formData,
                });

                const dataz = await blobUpload.json();
                setDniSelfieUrl(dataz);
              }
            }}
          />
          <span className="ml-2 text-gray-300">{dniSelfie?.name}</span>
        </>
      )}
      {step === 3 && (
        <>
          <TextInput
            name="address"
            htmlfor="address"
            labelText="Dirección"
            value={formData.address}
            handleChange={handleChange}
            ph="Dr. Mariano Moreno 1228. Ciudad de Buenos Aires"
          />
          <div className="flex items-center justify-center gap-2">
            <label
              className="flex flex-col items-start justify-center text-gray-300"
              htmlFor="floor"
            >
              Piso
              <input
                className="text-white text-xl w-[125px] bg-[#3e3e59] h-10 p-2 rounded m-1"
                type="number"
                name="floor"
                value={formData.floor}
                onChange={(e) => {
                  setFormData({ ...formData, floor: e.target.value });
                }}
              />
            </label>
            <label
              className="flex flex-col items-start justify-center text-gray-300"
              htmlFor="apartment"
            >
              Departamento
              <input
                className="text-white text-xl w-[125px] bg-[#3e3e59] h-10 p-2 rounded m-1"
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={(e) => {
                  setFormData({ ...formData, apartment: e.target.value });
                }}
              />
            </label>
          </div>
          <TextInput
            name="city"
            htmlfor="city"
            labelText="Ciudad"
            value={formData.city}
            handleChange={handleChange}
            ph="Mar del Plata"
          />
          <TextInput
            name="postalCode"
            htmlfor="postalCode"
            labelText="Código postal"
            value={formData.postalCode}
            handleChange={handleChange}
            ph="1900"
          />
          <label
            className="flex flex-col items-start justify-center text-gray-300"
            htmlFor="phone"
          >
            Teléfono
            <input
              className="text-white text-xl w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
              placeholder="+5491112345678"
            />
          </label>

          <h3>Adjuntar copia de servicio a tu nombre (Obligatorio)</h3>
          <span>Foto de copia del servicio</span>
          <label
            className="flex items-center justify-center gap-2 p-2 w-[160px] text-lg text-left rounded border-2 border-orange justify-self-center hover:cursor-pointer "
            htmlFor="serviceImage"
          >
            <Image height={35} width={35} src={uploadArrow} alt="" /> Subir foto
          </label>
          <input
            id="serviceImage"
            name="serviceImage"
            type="file"
            accept=".JPG, .jpg, .jpeg"
            className="h-[1px] mb-2 hover:cursor-pointer opacity-0"
            onChange={async (e) => {
              // upload to vercel blob storage, THEN use the returned url to store as user data
              const files = e.target.files;

              let blobFile;
              if (files) {
                setServiceImg(files[0]);
                blobFile = await fileToBlob(files[0]);

                const formData = new FormData();
                formData.append("blobFile", blobFile, files[0].name);

                const blobUpload = await fetch("/api/upload", {
                  method: "PUT",
                  body: formData,
                });

                const dataz = await blobUpload.json();

                setServiceImgUrl(dataz);
              }
            }}
          />
          {serviceImg && (
            <span className="ml-2 text-gray-300">{serviceImg?.name}</span>
          )}

          <button
            disabled={loading}
            className="flex w-3/4 items-center font-bold text-lg justify-center text-center rounded p-4 h-12  bg-[#00c26ebe] mt-4"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              const response = await fetch("/api/customer", {
                method: "POST",
                body: JSON.stringify({
                  ...formData,
                  floor: Number(formData.floor),
                  email: sessionEmail,
                  dniPicture: dniFrontUrl,
                  dniBackPicture: dniBackUrl,
                  selfie: dniSelfieUrl,
                  servicePicture: serviceImgUrl,
                }),
              });
              setLoading(false);
              if (response.status == 200) {
                router.push("/exclusive");
              }
            }}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </>
      )}

      <div className="flex gap-8 p-2 justify-self-end">
        {step > 1 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setStep(step - 1);
            }}
            className="rounded p-2 text-lg border-2 border-white"
          >
            {"<-- Anterior"}
          </button>
        )}
        {step < 3 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setStep(step + 1);
            }}
            className="rounded p-2 text-lg border-2 border-green-600"
          >
            {"Siguiente -->"}
          </button>
        )}
      </div>

      <span className="text-gray-300 text-lg">{step}/3</span>
    </form>
  );
};
