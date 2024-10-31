import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SignInEmail } from "@/components/emails/SignInEmail";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(req: Request) {
  const { email, subject, tkn } = await req.json();

  console.log("Trying emails POST route...", email, subject, tkn);

  if (!tkn) {
    return NextResponse.json(
      { message: "Token is missing in the URL." },
      { status: 400 }
    );
  }
  console.log("token on route", tkn);
  try {
    const emailRequest = await resend.emails.send({
      from: "Premierapp <hola@premier.nitsuga.dev>", //
      to: [email],
      subject: subject,
      react: SignInEmail({ email: email, token: tkn }),
      headers: {
        "X-Entity-Ref-ID": "123456789",
      },
      tags: [
        {
          name: "category",
          value: "confirm_email",
        },
      ],
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (err) {
    console.error("error sending email", err);
    return NextResponse.json(
      { message: "Server Error sending email. " },
      { status: 500 }
    );
  }
}
