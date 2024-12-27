import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";
import { Transaction } from "@prisma/client";

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_SIGNATURE;

export async function PATCH(req: NextRequest) {
  const { trackingUrl, ticketId } = await req.json();

  console.log("tracking url =>", trackingUrl);

  try {
    const updateTicket = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        trackingUrl: trackingUrl,
      },
    });

    return NextResponse.json(updateTicket, { status: 200 });
  } catch (error) {
    console.error("error updating tracking url", error);

    return NextResponse.json({
      status: 500,
      message: "error updating tracking url",
    });
  }
}

export async function POST(req: NextRequest) {
  const { ticketId } = await req.json();

  const transactionData = await prisma.ticket.findFirst({
    where: { id: ticketId },
  });

  console.log("transaction data =>", transactionData);

  if (!transactionData) {
    return NextResponse.json({ status: 404, message: "Ticket not found" });
  }

  try {
    const createdTransaction = await prisma.transaction.create({
      data: transactionData,
    });

    console.log("transaction created", createdTransaction);

    // const deletedTicket = await prisma.ticket.delete({
    //   where: { id: ticketId },
    // });

    // console.log("Ticket deleted", deletedTicket);

    return NextResponse.json({ status: 200, message: "Transaction created." });
  } catch (error) {
    console.error("error creating transaction", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to create transaction.",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const { ticketId } = await req.json();

  try {
    const deletedTicket = await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json({
      status: 200,
      message: `Ticket ${ticketId} deleted successfully.`,
    });
  } catch (error) {
    console.error("error trying to delete ticket", error);

    return NextResponse.json({
      status: 500,
      message: "Failed to delete ticket.",
    });
  }
}
