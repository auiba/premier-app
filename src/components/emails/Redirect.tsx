"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// Redirecting user after a couple of seconds so Vera/Adinet dont burn the token
export const RedirectFromClient = ({
  email,
  token,
}: {
  email?: string;
  token?: string;
}) => {
  const [time, setTime] = useState<number>(6);
  const router = useRouter();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1); // Update time every second
      } else {
        return;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  setTimeout(() => {
    router.push(
      `${baseUrl}api/auth/callback/resend?callbackUrl=${baseUrl}registrarse&token=${token}&email=${email}`
    );
  }, 10000);

  return (
    <div className="text-green-400 m-2 text-2xl">
      {time > 0 ? time : "Vamos!"}
    </div>
  );
};
