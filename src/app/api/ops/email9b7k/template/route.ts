const DEFAULT_EMAIL_HTML = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Guia de oracion</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1d1c1d;">
    <div style="max-width:580px;margin:0 auto;padding:20px 20px 48px;">
      <div style="text-align:center;padding:20px 0;">
        <img src="https://suivelas.com/text-logo.svg" alt="Sui" width="120" height="60" style="display:block;margin:0 auto;" />
      </div>

      <h1 style="font-size:28px;font-weight:700;text-align:center;margin:30px 0;">Tu guia ya esta aqui</h1>

      <p style="font-size:16px;line-height:26px;color:#444;">Hola amigo/a,</p>

      <p style="font-size:16px;line-height:26px;color:#444;">
        Tal como te prometimos, a continuacion encontraras el PDF con tu
        <strong>guia para orar y fortalecer tu relacion con Dios.</strong>
      </p>

      <div style="text-align:center;margin:30px 0;">
        <a
          href="https://suivelas.com/guiaOracion?utm_source=email&utm_medium=paid&utm_campaign=guia_oracion_bienvenida&utm_content=boton_descarga&email=example@suivelas.com"
          style="background:#5e6ebf;border-radius:8px;color:#fff;font-size:16px;font-weight:700;text-decoration:none;display:inline-block;padding:12px 24px;"
        >
          Descargar guia de oracion
        </a>
      </div>

      <hr style="border:none;border-top:1px solid #e6ebf1;margin:20px 0;" />

      <p style="font-size:18px;font-weight:600;color:#1d1c1d;">Dentro encontraras un recorrido de 5 dias:</p>

      <p style="font-size:16px;font-weight:700;color:#1d1c1d;margin:16px 0 4px;">Dia 1: Por que oramos?</p>
      <p style="font-size:15px;line-height:22px;color:#555;margin:0 0 16px;">
        Aprenderas la importancia de la oracion y como <strong>establecer un horario y un lugar</strong> para encontrarte con Dios.
      </p>

      <p style="font-size:16px;font-weight:700;color:#1d1c1d;margin:16px 0 4px;">Dia 2: Que es la oracion?</p>
      <p style="font-size:15px;line-height:22px;color:#555;margin:0 0 16px;">
        Un espacio para <strong>soltar tus cargas</strong> y abrir tu corazon delante de Dios.
      </p>

      <p style="font-size:16px;font-weight:700;color:#1d1c1d;margin:16px 0 4px;">Dia 3: La ensenanza de Jesus</p>
      <p style="font-size:15px;line-height:22px;color:#555;margin:0 0 16px;">
        Aprenderas a <strong>hablar con Dios con honestidad</strong>, sin filtros.
      </p>

      <p style="font-size:16px;font-weight:700;color:#1d1c1d;margin:16px 0 4px;">Dia 4: Buscar a Dios con perseverancia</p>
      <p style="font-size:15px;line-height:22px;color:#555;margin:0 0 16px;">
        Descubriras como <strong>permanecer en la oracion</strong>, con un ejemplo practico.
      </p>

      <p style="font-size:16px;font-weight:700;color:#1d1c1d;margin:16px 0 4px;">Dia 5: Llamar o clamar con confianza</p>
      <p style="font-size:15px;line-height:22px;color:#555;margin:0 0 16px;">
        Un dia para <strong>acercarte a Dios con fe</strong> y confianza en su presencia.
      </p>

      <hr style="border:none;border-top:1px solid #e6ebf1;margin:20px 0;" />

      <div style="background:#f9fafb;padding:1px 20px;border-radius:8px;">
        <p style="font-size:15px;font-weight:700;margin:16px 0 8px;">Nota para sacarle provecho a tu guia:</p>
        <ul style="margin:0 0 16px;padding-left:20px;color:#444;">
          <li>Leela en un momento tranquilo del dia.</li>
          <li>Ten tu Biblia cerca.</li>
          <li>Permite que cada pregunta te ayude a hablar con Dios con sinceridad.</li>
        </ul>
      </div>

      <p style="font-size:16px;line-height:26px;color:#444;margin-top:20px;">
        Cuando hayas terminado la guia, <strong>nos encantaria escucharlo.</strong> Nos llena de alegria conocer historias de personas que estan creciendo en su relacion con Dios.
      </p>

      <p style="font-size:16px;line-height:24px;color:#444;">
        Da lo mejor para Dios.<br />
        <strong>Catalina</strong>
      </p>

      <p style="font-size:13px;line-height:20px;color:#666;margin-top:24px;">
        P.D. Si esta guia fue de bendicion para ti, puedes <strong>tomar un screenshot y etiquetarnos</strong> en redes sociales. Ayudamos a las personas a crecer con Dios.
      </p>
    </div>
  </body>
</html>`;

export function GET() {
  return Response.json({ ok: true, html: DEFAULT_EMAIL_HTML });
}
