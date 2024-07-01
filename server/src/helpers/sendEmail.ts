import nodemailer from "nodemailer";
import Logger from "../lib/logger";
import envConfig from "../config/env.config";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string
) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 456,
    secure: true,
    auth: {
      user: envConfig.USER_EMAIL,
      pass: envConfig.USER_PASS,
    },
  });

  const methodOptions = {
    from: {
      name: "Team Management",
      address: envConfig.USER_EMAIL as string,
    },
    to,
    subject,
    text,
    html,
  };

  // await emailQueue.add(emailQueuename, methodOptions);

  try {
    const res = await transport.sendMail(methodOptions);
    Logger.info(res);
  } catch (err) {
    Logger.error(err);
  }
};
