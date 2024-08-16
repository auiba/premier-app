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

  console.log(response);
  return response;
}
