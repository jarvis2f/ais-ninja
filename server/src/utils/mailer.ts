import {createTransport, Transporter} from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
import {config} from "../config/config";
import SMTPTransport from "nodemailer/lib/smtp-transport";

let transporter: Transporter;

function initTransporter() {
  if (transporter) return;
  transporter = createTransport({
    host: config?.getConfigValue('email.host') as string,
    port: Number(config?.getConfigValue('email.port')),
    ignoreTLS: false,
    secureConnection: false,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: config?.getConfigValue('email.auth.user'),
      pass: config?.getConfigValue('email.auth.pass')
    }
  } as SMTPTransport.Options);
}

export default {
  send: async (to: string, subject: string, html: string) => {
    initTransporter();
    await transporter.sendMail({
      from: config?.getConfigValue('email.from'),
      to,
      subject,
      html
    });
  },
  sendWithTemplate: async (to: string, subject: string, template: string, parameters: {}) => {
    initTransporter();
    const html = fs.readFileSync(template, 'utf8');
    const templateData = handlebars.compile(html);
    const compiledHTML = templateData(parameters);
    await transporter.sendMail({
      from: config?.getConfigValue('email.from'),
      to,
      subject,
      html: compiledHTML
    });
  }
}
