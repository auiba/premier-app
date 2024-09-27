import { cookies } from "next/headers";

export const deleteAllCookies = async () => {
  const cookiesList = cookies().getAll();

  cookiesList.forEach((cookie) => {
    const cookieName = cookie.name;
    cookies().delete(cookieName);
  });
};
