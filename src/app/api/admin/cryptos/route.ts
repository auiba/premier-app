import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";

export async function POST(req: NextRequest) {
  const { name, crypto, commission, fee } = await req.json();

  console.log(name, crypto, commission, fee);

  if (name == "" || crypto == "") {
    return NextResponse.json(
      { message: "Missing name or crypto" },
      { status: 400 }
    );
  }

  try {
    const newCrypto = await prisma.crypto.create({
      data: { name, crypto, commission, fee },
    });

    console.log("added crypto =>", newCrypto);

    return NextResponse.json(newCrypto, { status: 200 });
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

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  console.log("delete crypto id", id);

  if (!id) {
    console.error(`Error deleting crypto, id not found.`);
    return NextResponse.json({ message: "crypto not found" }, { status: 404 });
  }

  try {
    const deleteCrypto = await prisma.crypto.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: `Deleted ${deleteCrypto.name} succesfully.` },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error when trying to delete crypto with id ${id}.`, error);
    return NextResponse.json(
      { message: "Error trying to delete crypto" },
      { status: 500 }
    );
  }
}
