import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface PrayerGuideEmailProps {
  userName?: string;
  email: string;
}

export const PrayerGuideEmail = ({
  userName = "amigo/a",
  email,
}: PrayerGuideEmailProps) => (
  <Html>
    <Head />
    <Preview>Tu guía de oración ya está aquí 💜</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Logo Section based on Sui Brand */}
        <Section style={logoContainer}>
          <Img
            src="https://suivelas.com/text-logo.svg"
            alt="Sui"
            width="120"
            height="60"
            style={logoImage}
          />
        </Section>

        <Section style={content}>
          <Heading style={h1}>¡Tu guía ya está aquí!</Heading>

          <Text style={paragraph}>Hola {userName},</Text>

          <Text style={paragraph}>
            Tal como te prometimos, a continuación encontrarás el PDF con tu
            <strong> guía para orar y fortalecer tu relación con Dios.</strong>
          </Text>

          <Section style={buttonContainer}>
            <Link
              style={button}
              href={`https://suivelas.com/catalogo?utm_source=email&utm_medium=paid&utm_campaign=guia_oracion_bienvenida&utm_content=boton_descarga&email=${email}`}
            >
              Descargar Guía de oración
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={subheading}>
            Dentro encontrarás un recorrido de 5 días:
          </Text>

          <Section style={daySection}>
            <Text style={dayTitle}>Día 1: ¿Por qué oramos?</Text>
            <Text style={dayDescription}>
              Aprenderás la importancia de la oración y cómo{" "}
              <strong>establecer un horario y un lugar</strong> para encontrarte
              con Dios.
            </Text>

            <Text style={dayTitle}>Día 2: ¿Qué es la oración?</Text>
            <Text style={dayDescription}>
              Un espacio para <strong>soltar tus cargas</strong> y abrir tu
              corazón delante de Dios.
            </Text>

            <Text style={dayTitle}>Día 3: La enseñanza de Jesús</Text>
            <Text style={dayDescription}>
              Aprenderás a <strong>hablar con Dios con honestidad</strong>, sin
              filtros.
            </Text>

            <Text style={dayTitle}>Día 4: Buscar a Dios con perseverancia</Text>
            <Text style={dayDescription}>
              Descubrirás cómo <strong>permanecer en la oración</strong>, con un
              ejemplo práctico.
            </Text>

            <Text style={dayTitle}>Día 5: Llamar o clamar con confianza</Text>
            <Text style={dayDescription}>
              Un día para <strong>acercarte a Dios con fe</strong> y confianza
              en su presencia.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={noteSection}>
            <Text style={noteTitle}>Nota para sacarle provecho a tu guía:</Text>
            <ul style={list}>
              <li style={listItem}>Léela en un momento tranquilo del día.</li>
              <li style={listItem}>Ten tu Biblia cerca.</li>
              <li style={listItem}>
                Permite que cada pregunta te ayude a hablar con Dios con
                sinceridad.
              </li>
            </ul>
          </Section>

          <Text style={paragraph}>
            Cuando hayas terminado la guía,{" "}
            <strong>nos encantaría escucharlo.</strong> Nos llena de alegría
            conocer historias de personas que están creciendo en su relación con
            Dios.
          </Text>

          <Text style={signature}>
            Da lo mejor para Dios. ✨<br />
            <strong>Catalina</strong>
          </Text>
        </Section>

        <Section style={footer}>
          <Text style={footerText}>
            P.D. Si esta guía fue de bendición para ti, puedes{" "}
            <strong>tomar un screenshot y etiquetarnos</strong> en redes
            sociales. Ayudamos a las personas a crecer con Dios.
          </Text>
     
        </Section>
      </Container>
    </Body>
  </Html>
);

export default PrayerGuideEmail;

// Color Schema & Styles based on the PDF branding
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const logoContainer = {
  textAlign: "center" as const,
  padding: "20px 0",
};

const logoImage = {
  display: "block",
  margin: "0 auto",
};

const content = {
  padding: "0 20px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "28px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "30px 0",
};

const subheading = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1d1c1d",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#444",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const button = {
  backgroundColor: "#5e6ebf",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const daySection = {
  padding: "10px 0",
};

const dayTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#1d1c1d",
  marginBottom: "4px",
};

const dayDescription = {
  fontSize: "15px",
  lineHeight: "22px",
  color: "#555",
  marginTop: "0",
  marginBottom: "16px",
};

const noteSection = {
  backgroundColor: "#f9fafb",
  padding: "1px 20px",
  borderRadius: "8px",
};

const noteTitle = {
  fontSize: "15px",
  fontWeight: "bold",
};

const list = {
  color: "#444",
  fontSize: "15px",
  lineHeight: "24px",
};

const listItem = {
  marginBottom: "8px",
};

const signature = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "30px",
};

const footer = {
  padding: "0 20px",
  marginTop: "40px",
};

const footerText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#000",
};

const unsubscribe = {
  fontSize: "12px",
  color: "#8898aa",
  textDecoration: "underline",
};
