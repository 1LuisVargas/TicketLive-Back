import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendPurchaseEmail(email: string, orderId: string) {
    try {
      await this.transporter.sendMail({
        from: `"TicketLive" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Compra realizada 🧾",
        html: `<h1>Tu compra <b>#${orderId}</b> fue exitosa</h1>`,
      });
      return { ok: true };
    } catch (error) {
      this.logger.error("sendPurchaseEmail failed:", error);
      throw error;
    }
  }

  async sendRegisterEmail(email: string, name: string) {
    try {
      await this.transporter.sendMail({
        from: `"TicketLive" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Bienvenido 🎉",
        html: `
          <body style="color: aliceblue; background-color: rgb(70,70,70);">
            <h1 align="center">Hola ${name}, Bienvenido a TicketLive 🎉</h1>
            <h2 align="center">La mejor tienda de entradas a eventos online</h2>
            <p align="center">
              <img src="https://pngimg.com/d/welcome_PNG33.png" width="300"/>
            </p>
          </body>
        `,
      });
      return { ok: true };
    } catch (error) {
      this.logger.error("sendRegisterEmail failed:", error);
      throw error;
    }
  }

  async sendEmail(email: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: `"TicketLive" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Test email",
        html: text,
      });
      return { ok: true };
    } catch (error) {
      this.logger.error("sendEmail failed:", error);
      throw error;
    }
  }

  async sendResetPasswordEmail(email: string, name: string, resetLink: string) {
    try {
      await this.transporter.sendMail({
        from: `"TicketLive" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "Restablecer contraseña 🔐",
        html: `
          <body style="background-color: rgb(70,70,70); color: aliceblue; padding: 20px;">
            <h2 align="center">Hola ${name}</h2>
            <p align="center">Recibimos una solicitud para restablecer tu contraseña.</p>
            <p align="center">Haz clic en el siguiente botón para continuar:</p>
            <p align="center">
              <a href="${resetLink}" style="background-color: #ff5a5f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Restablecer contraseña
              </a>
            </p>
            <p align="center" style="font-size: 12px; margin-top: 20px;">
              Este enlace expira en 15 minutos.<br/>
              Si no solicitaste este cambio, puedes ignorar este correo.
            </p>
          </body>
        `,
      });
      return { ok: true };
    } catch (error) {
      this.logger.error("sendResetPasswordEmail failed:", error);
      throw error;
    }
  }
}