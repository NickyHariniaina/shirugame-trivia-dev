import transporter from "@/lib/nodemailer";
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
