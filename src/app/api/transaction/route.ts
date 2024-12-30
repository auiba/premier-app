import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../db";
import { Transaction } from "@prisma/client";

export async function PATCH(req: NextRequest) {
  const { trackingUrl, ticketId } = await req.json();

  const transaction = await prisma.transaction.findFirst({
    where: { id: ticketId },
  });

  console.log("update route transaction", transaction);

  console.log(ticketId);

  if (!transaction?.trackingUrl) {
    try {
      const updateTicket = await prisma.transaction.update({
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
  } else if (transaction?.trackingUrl && trackingUrl === undefined) {
    try {
      const updateTicket = await prisma.transaction.update({
        where: { id: ticketId },
        data: {
          confirmed: true,
        },
      });

      return NextResponse.json(updateTicket, { status: 200 });
    } catch (error) {
      console.error("error confirming transaction", error);

      return NextResponse.json({
        status: 500,
        message: "error confirming transaction",
      });
    }
  } else {
    return NextResponse.json({
      status: 400,
      message: "Invalid update scenario",
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
