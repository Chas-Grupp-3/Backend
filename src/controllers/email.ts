const BASE_URL = "https://api.resend.com";
import { Resend } from "resend";

const sendEmail = async (subject: string, html: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY as string);
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["dennis.granheimer@live.se"],
    subject: subject,
    html: html,
    replyTo: "onboarding@resend.dev",
  });

  console.log(data, error);
};

export default sendEmail;
