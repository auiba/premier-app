import { cookies } from "next/headers";

const adminUser = process.env.ADMIN_LOGIN;
const adminPw = process.env.ADMIN_PASSWORD;

export const deleteAllCookies = async () => {
  const cookiesList = cookies().getAll();

  cookiesList.forEach((cookie) => {
    const cookieName = cookie.name;
    cookies().delete(cookieName);
  });
};

export const isTokenValid = (tkn: { user: string; password: string }) => {
  const adminUser = process.env.ADMIN_LOGIN;
  const adminPw = process.env.ADMIN_PASSWORD;

  if (tkn.user !== adminUser || tkn.password !== adminPw) {
    return false;
  } else {
    return true;
  }
};
