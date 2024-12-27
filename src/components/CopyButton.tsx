"use client";
import copyicon from "../../public/imgs/icons/copy-icon.svg";
import Image from "next/image";
import { useState } from "react";

export const CopyTextButton = ({ text }: { text: string }) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const flashMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 600);
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        onClick={async (e) => {
          e.preventDefault();
          await copyText();
          flashMessage();
        }}
      >
        <Image
          alt="copy to clipboard icon"
          width={30}
          height={30}
          src={copyicon}
        />
      </button>
      <p
        className={`${
          showMessage ? "block" : "invisible"
        } text-green-600 text-sm`}
      >
        ✔ Copiado!
      </p>
    </div>
  );
};
