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

export async function getConstants(apiURL: string, apiSignature: string) {
  const body = new FormData();
  body.set("getconstants", "true");
  const response = await makeRequest(apiURL, apiSignature, body);

  return response;
}

export async function getAllConstants(apiURL: string, apiSignature: string) {
  const body = new FormData();
  body.set("getallconstants", "true");
  const response = await makeRequest(apiURL, apiSignature, body);

  return response;
}

export async function getDollar(apiURL: string, apiSignature: string) {
  const body = new FormData();
  body.set("getdollar", "true");
  const response = await makeRequest(apiURL, apiSignature, body);

  return response;
}

export async function createUrl(
  apiURL: string,
  apiSignature: string,
  from: string,
  to: string,
  price: number,
  name: string,
  email: string,
  bankstring: string,
  whatsapp: string
) {
  const textPrice = price.toString();
  const body = new FormData();
  body.set("createurl", "true");
  body.set("from", from);
  body.set("to", to);
  body.set("price", textPrice);
  body.set("name", name);
  body.set("email", email);
  body.set("bankstring", bankstring);
  body.set("whatsapp", whatsapp);

  const response = await makeRequest(apiURL, apiSignature, body);

  return response;
}
