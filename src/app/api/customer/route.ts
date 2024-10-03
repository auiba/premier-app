import { NextRequest } from "next/server";
import prisma from "../../../../db";
import { Customer } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  try {
    const createdUser = await prisma.customer.create({
      data: { ...(formData as Customer) },
    });
  } catch (err) {
    console.log("error creating user on db");
    console.error(err);
  }
}
