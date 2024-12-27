"use client";
import { useState } from "react";

export const TrackingUrlUpdater = ({
  ticketId,
  trackingUrl,
}: {
  ticketId: number;
  trackingUrl: string;
}) => {
  const [trackerUrl, setTrackerUrl] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const flashMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  };
  return (
    <form>
      <label
        className="flex flex-col items-start justify-center text-gray-300"
        htmlFor="tracking-url"
      >
        <input
          onChange={(e) => {
            e.preventDefault();
            setTrackerUrl(e.target.value);
          }}
          className="text-white text-lg w-[250px] bg-[#3e3e59] h-10 p-2 rounded m-1"
          placeholder={trackingUrl || ""}
          type="text"
        />
      </label>
      <button
        className="p-1 rounded border-2 border-black mt-2 text-md"
        onClick={async (e) => {
          e.preventDefault();
          const updateUrl = await fetch("/api/transaction", {
            method: "PATCH",
            body: JSON.stringify({
              trackingUrl: trackerUrl,
              ticketId,
            }),
          });

          if (updateUrl.status == 200) {
            flashMessage();
          }
        }}
      >
        Actualizar
      </button>
      <p
        className={`${
          showMessage ? "block" : "invisible"
        } text-green-600 text-md`}
      >
        ✔ URL actualizada.
      </p>
    </form>
  );
};
