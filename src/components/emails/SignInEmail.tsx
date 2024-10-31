import { Heading, Text, Container, Button } from "@react-email/components";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const serverBaseUrl = process.env.BASE_URL;

export function SignInEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const headingStyle = { color: "black", fontSize: "20px" };

  const textStyle = {
    fontSize: "18px",
    maxWidth: "450px",
  };
  const btnStyle = {
    color: "white",
    backgroundColor: "black",
    borderRadius: "4px",
    fontSize: "18px",
    padding: "6px",
  };
  return (
    <Container>
      <Heading style={headingStyle}>Ingresa a Premier</Heading>
      <Text style={textStyle}>CLICKEA EL SIGUIENTE LINK PARA INGRESAR</Text>
      <Button
        style={btnStyle}
        href={`${baseUrl || serverBaseUrl}login?tkn=${token}&eml=${email}`}
      >
        Ingresar
      </Button>
      <Text style={{ fontSize: "14px" }}>
        Si no fuiste tú quién pidió este ingreso, por favor ignora este email.
      </Text>
    </Container>
  );
}
