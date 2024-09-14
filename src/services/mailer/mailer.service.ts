import dotenv from 'dotenv';
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';

dotenv.config();

class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      // host: process.env.MAIL_HOST,
      // port: Number(process.env.MAIL_PORT) || 587,
      // secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      // tls: {
      //   rejectUnauthorized: process.env.MAIL_REQUIRE_TLS === 'true',
      // },
    });
  }

  async sendMail({
    templatePath,
    context,
    from,
    to,
    subject,
    text,
    html,
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let compiledHtml: string | undefined;

    if (templatePath) {
      try {
        const template = await fs.readFile(templatePath, 'utf-8');
        const compiledTemplate = Handlebars.compile(template);
        compiledHtml = compiledTemplate(context || {});
      } catch (error) {
        console.error(
          `Error reading or compiling email template: ${error}`,
        );
        throw error('Error reading or compiling email template');
      }
    }

    try {
      await this.transporter.sendMail({
        from:
          from ||
          `"${process.env.MAIL_DEFAULT_NAME}" <${process.env.MAIL_DEFAULT_EMAIL}>`,
        to,
        subject,
        text,
        html: html || compiledHtml,
      });
    } catch (error) {
      console.error(`Error sending email: ${error}`);
      throw error;
    }
  }
}

export default MailerService;
