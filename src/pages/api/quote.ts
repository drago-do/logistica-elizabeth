import type { APIRoute } from "astro";
import { Resend } from "resend";
import { PRICES, type Origin } from "../../data/prices";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error("RESEND_API_KEY is not defined in import.meta.env or process.env");
    return new Response(
      JSON.stringify({ error: "Configuración incompleta: falta API Key de Resend" }),
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  try {
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Cuerpo de solicitud inválido o vacío" }),
        { status: 400 }
      );
    }
    const { email, origin, destination, pallets } = body;

    if (!email || !origin || !destination || !pallets) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400 }
      );
    }

    // Calcular precio
    const originData = PRICES[origin as Origin];
    if (!originData) {
      return new Response(
        JSON.stringify({ error: "Origen no válido" }),
        { status: 400 }
      );
    }

    const price = originData.rates[pallets as keyof typeof originData.rates];
    if (!price) {
      return new Response(
        JSON.stringify({ error: "Cantidad de pallets no válida" }),
        { status: 400 }
      );
    }

    const formattedPrice = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(price);

    // Enviar correo
    const { data, error } = await resend.emails.send({
      from: "Logística Elizabeth <cotizaciones@notificacion.dragodo.cloud>", // Ajustar según dominio verificado
      to: [email],
      subject: `Tu Cotización: ${origin} a ${destination}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #001a3d; text-align: center;">Tu Cotización Estimada</h2>
          <p style="text-align: center; color: #6b7280;">Gracias por interesarte en nuestros servicios de consolidación de carga.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Origen:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${origin}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Destino:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${destination}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #4b5563;"><strong>Pallets:</strong></td>
                <td style="padding: 8px 0; text-align: right;">${pallets}</td>
              </tr>
              <tr style="border-top: 1px solid #d1d5db;">
                <td style="padding: 16px 0; color: #001a3d; font-size: 1.2rem;"><strong>Total Estimado:</strong></td>
                <td style="padding: 16px 0; text-align: right; color: #001a3d; font-size: 1.5rem; font-weight: bold;">${formattedPrice}</td>
              </tr>
            </table>
          </div>
          
          <p style="font-size: 0.875rem; color: #9ca3af; text-align: center;">* Esta cotización es informativa y sujeta a cambios tras la verificación física de la mercancía.</p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://consol.notificacion.dragodo.cloud/" style="background-color: #001a3d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Ver mi Dashboard</a>
          </div>
          
          <hr style="margin: 40px 0; border: 0; border-top: 1px solid #e5e7eb;" />
          <p style="font-size: 0.75rem; color: #9ca3af; text-align: center;">© 2026 Logística Elizabeth. Todos los derechos reservados.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error de Resend:", error);
      return new Response(
        JSON.stringify({ error: "Error al enviar el correo" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, price: formattedPrice, data }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error en API:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};
