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

const guideDays = [
  {
    title: "Día 1: ¿Por qué oramos?",
    description:
      "Aprenderás la importancia de la oración y cómo establecer un horario y un lugar para encontrarte con Dios.",
  },
  {
    title: "Día 2: ¿Qué es la oración?",
    description:
      "Un espacio para soltar tus cargas y abrir tu corazón delante de Dios.",
  },
  {
    title: "Día 3: La enseñanza de Jesús",
    description: "Aprenderás a hablar con Dios con honestidad, sin filtros.",
  },
  {
    title: "Día 4: Buscar a Dios con perseverancia",
    description:
      "Descubrirás cómo permanecer en la oración, con un ejemplo práctico.",
  },
  {
    title: "Día 5: Llamar o clamar con confianza",
    description:
      "Un día para acercarte a Dios con fe y confianza en su presencia.",
  },
];

const tips = [
  "Léela en un momento tranquilo del día.",
  "Ten tu Biblia cerca.",
  "Permite que cada pregunta te ayude a hablar con Dios con sinceridad.",
];

export default function PrayerGuideEmail({
  userName = "amigo/a",
  email,
}: PrayerGuideEmailProps) {
  const guideUrl = `https://suivelas.com/guiaOracion?utm_source=email&utm_medium=paid&utm_campaign=guia_oracion_bienvenida&utm_content=boton_descarga&email=${encodeURIComponent(
    email,
  )}`;

  return (
    <Html lang="es">
      <Head />
      <Preview>Tu guía de oración ya está aquí 💌</Preview>

      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.logoContainer}>
            <Img
              src="https://suivelas.com/text-logo.svg"
              alt="Sui"
              width="120"
              height="60"
              style={styles.logoImage}
            />
          </Section>

          <Section style={styles.content}>
            <Heading style={styles.h1}>¡Tu guía ya está aquí!</Heading>

            <Text style={styles.paragraph}>Hola {userName},</Text>

            <Text style={styles.paragraph}>
              Tal como te prometimos, a continuación encontrarás el PDF con tu
              <strong>
                {" "}
                guía para orar y fortalecer tu relación con Dios.
              </strong>
            </Text>

            <Section style={styles.buttonContainer}>
              <Link style={styles.button} href={guideUrl}>
                Descargar Guía de oración
              </Link>
            </Section>

            <Hr style={styles.hr} />

            <Text style={styles.subheading}>
              Dentro encontrarás un recorrido de 5 días:
            </Text>

            <Section style={styles.daySection}>
              {guideDays.map((day) => (
                <React.Fragment key={day.title}>
                  <Text style={styles.dayTitle}>{day.title}</Text>
                  <Text style={styles.dayDescription}>
                    {renderHighlightedText(day.description)}
                  </Text>
                </React.Fragment>
              ))}
            </Section>

            <Hr style={styles.hr} />

            <Section style={styles.noteSection}>
              <Text style={styles.noteTitle}>
                Nota para sacarle provecho a tu guía:
              </Text>
              <ul style={styles.list}>
                {tips.map((tip) => (
                  <li key={tip} style={styles.listItem}>
                    {tip}
                  </li>
                ))}
              </ul>
            </Section>

            <Text style={styles.paragraph}>
              Cuando hayas terminado la guía,{" "}
              <strong>nos encantaría escucharlo.</strong> Nos llena de alegría
              conocer historias de personas que están creciendo en su relación
              con Dios.
            </Text>

            <Text style={styles.signature}>
              Da lo mejor para Dios. ✨
              <br />
              <strong>Catalina</strong>
            </Text>
          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              P.D. Si esta guía fue de bendición para ti, puedes{" "}
              <strong>tomar un screenshot y etiquetarnos</strong> en redes
              sociales. Ayudamos a las personas a crecer con Dios.
            </Text>

            <Link
              style={styles.footerText}
              href="https://suivelas.com/politica_privacidad.pdf"
            >
              Política de privacidad
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function renderHighlightedText(text: string) {
  const highlights = [
    "establecer un horario y un lugar",
    "soltar tus cargas",
    "hablar con Dios con honestidad",
    "permanecer en la oración",
    "acercarte a Dios con fe",
  ];

  const match = highlights.find((item) => text.includes(item));

  if (!match) return text;

  const [before, after] = text.split(match);

  return (
    <>
      {before}
      <strong>{match}</strong>
      {after}
    </>
  );
}

const styles = {
  main: {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  },
  container: {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
    maxWidth: "100%",
  },
  logoContainer: {
    textAlign: "center" as const,
    padding: "20px 0",
  },
  logoImage: {
    display: "block",
    margin: "0 auto",
  },
  content: {
    padding: "0 20px",
  },
  h1: {
    color: "#1d1c1d",
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "30px 0",
  },
  subheading: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#1d1c1d",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#444",
  },
  buttonContainer: {
    textAlign: "center" as const,
    margin: "30px 0",
  },
  button: {
    backgroundColor: "#5e6ebf",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
  },
  hr: {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  },
  daySection: {
    padding: "10px 0",
  },
  dayTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1d1c1d",
    marginBottom: "4px",
  },
  dayDescription: {
    fontSize: "15px",
    lineHeight: "22px",
    color: "#555",
    marginTop: "0",
    marginBottom: "16px",
  },
  noteSection: {
    backgroundColor: "#f9fafb",
    padding: "1px 20px",
    borderRadius: "8px",
  },
  noteTitle: {
    fontSize: "15px",
    fontWeight: "bold",
  },
  list: {
    color: "#444",
    fontSize: "15px",
    lineHeight: "24px",
  },
  listItem: {
    marginBottom: "8px",
  },
  signature: {
    fontSize: "16px",
    lineHeight: "26px",
    marginTop: "30px",
  },
  footer: {
    padding: "0 20px",
    marginTop: "40px",
  },
  footerText: {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#000",
  },
};
