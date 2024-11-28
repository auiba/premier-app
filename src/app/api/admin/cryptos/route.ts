import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";

export async function POST(req: NextRequest) {
  const { name, crypto, commission, fee } = await req.json();

  try {
    const newCrypto = await prisma.crypto.create({
      data: { name, crypto, commission, fee },
    });
    console.log("added crypto =>", newCrypto);

    return NextResponse.json({ message: "Crypto created ok" }, { status: 200 });
  } catch (error) {
    console.error("Error creating new crypto", error);

    return NextResponse.json(
      { message: "Error creating crypto" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { commission, fee, id } = await req.json();

  try {
    const updatedCrypto = await prisma.crypto.update({
      where: { id: id },
      data: { commission, fee },
    });

    console.log("updated crypto", updatedCrypto);
    return NextResponse.json(
      { message: "Crypto updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating crypto", error);

    return NextResponse.json(
      { message: "Error updating crypto" },
      { status: 500 }
    );
  }
}
