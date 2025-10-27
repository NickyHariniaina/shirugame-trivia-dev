import transporter from "@/lib/nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
