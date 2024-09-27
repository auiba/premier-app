import { NextRequest, NextResponse } from "next/server";
import { calculateExchange } from "../../../../utils/services";
import prisma from "../../../../db";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function POST(req: NextRequest) {
  const {
    name,
    lastName,
    birth,
    email,
    gender,
    civil,
    dni,
    politicalExposure,
    address,
    floor,
    apartment,
    city,
    postalCode,
    phone,
  } = await req.json();

  try {
    const createdUser = await prisma.customer.create({
      data: {
        name,
        lastName,
        birth,
        email,
        gender,
        civil,
        dni,
        politicalExposure,
        address,
        floor,
        apartment,
        city,
        postalCode,
        phone,
      },
    });

    console.log("created user =>", createdUser);

    return NextResponse.json(createdUser);
  } catch (err) {
    console.error("error calculating exchange", err);
    return NextResponse.error();
  }
}
