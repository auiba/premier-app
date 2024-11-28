import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";

export async function PATCH(req: NextRequest) {
  const { phone } = await req.json();

  console.log("phone from client", phone);

  const existingPhone = await prisma.adminPhone.findFirst({ where: { id: 1 } });

  try {
    if (existingPhone) {
      const updatePhone = await prisma.adminPhone.update({
        where: { id: 1 },
        data: { phone: phone },
      });

      console.log(updatePhone);

      return NextResponse.json(
        { message: "phone updated successfully" },
        { status: 200 }
      );
    } else {
      const createPhone = await prisma.adminPhone.create({
        data: { phone: phone },
      });

      console.log(createPhone);

      return NextResponse.json(
        { message: "Phone Created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating admin phone", error);

    return NextResponse.json(
      { error: "Internal error updating phone" },
      { status: 500 }
    );
  }
}
