import { put } from "@vercel/blob";

import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7
);

export async function PUT(request: Request) {
  const formData = await request.formData();
  const blobFile = formData.get("blobFile") as File;

  if (blobFile) {
    console.log("blob endpoint file:", blobFile);
  }

  return NextResponse.json("uploaded");

  //   try {
  //     const fileName = nanoid();

  //     const blob = await put(fileName, data as Blob, {
  //       access: "public",
  //       contentType: "",
  //     });

  //     console.log(blob.url);

  //     return Response.json(blob.url);
  //   } catch (err) {
  //     console.log("error in try catch");
  //     console.error(err);
  //   }
}
