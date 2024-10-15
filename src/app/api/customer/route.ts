import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";
import { Customer } from "@prisma/client";

export async function POST(req: NextRequest) {
  const data = await req.json();

  console.log("form data =>", data);

  try {
    const createdUser = await prisma.customer.create({
      data: { ...(data as Customer) },
    });

    return NextResponse.json(createdUser);
  } catch (err) {
    console.log("error creating user on db");
    console.error(err);

    return NextResponse.json("Failed to create user");
  }
}
