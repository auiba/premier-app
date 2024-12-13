import prisma from "../db";

async function makeRequest(
  apiURL: string,
  apiSignature: string,
  body: BodyInit
) {
  const headers = new Headers();
  headers.set("signature", apiSignature || "");
  const response = await fetch(`${apiURL}`, {
    method: "POST",
    body,
    headers,
    cache: "no-store",
  });

  const data = await response.json();
  if (data.error && data.error === "no_data") return undefined;
  return data;
}

export async function calculateExchange(
  apiURL: string,
  apiSignature: string,
  from: string,
  to: string,
  price: number
) {
  const textPrice = price.toString();
  const body = new FormData();
  body.set("calc", "true");
  body.set("from", from);
  body.set("to", to);
  body.set("price", textPrice);

  const response = await makeRequest(apiURL, apiSignature, body);

  return response;
}

export async function getAllConstants() {
  const cryptosFromDb = await prisma.crypto.findMany({});

  return cryptosFromDb;
}

export async function getDollar() {
  const response = await fetch("https://dolarapi.com/v1/dolares/blue");

  const data = await response.json();

  return data;
}

// Crea la url para el mensaje de whatsapp
export async function createUrl(
  from: string,
  to: string,
  price: number,
  name: string,
  email: string,
  bankstring: string,
  whatsapp: string
) {
  const textPrice = price.toString();

  const message = `Hola, soy ${name} y quiero cambiar ${textPrice} ${from} a ${to}.`;
  const encodedMessage = encodeURIComponent(message);

  const wspBaseUrl = "https://wa.me/";

  const msgUrl = `${wspBaseUrl}${whatsapp}?text=${encodedMessage}.`;

  return msgUrl;
}
