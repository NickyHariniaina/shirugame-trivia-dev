import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "@/utils/extern";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 8, maxPasswordLength: 20 },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    username({
      usernameNormalization(username) {
        return username.toLowerCase().trim().replaceAll(" ", "_");
      },
    }),
  ],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const html = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #007bff;">Verify Your Email</h2>
          <p>Hello ${user.name || "there"},</p>
          <p>Click the button below to verify your email address:</p>
          <p style="margin: 20px 0;">
            <a href="${url}"
               style="background-color: #007bff; color: #fff; text-decoration: none;
                      padding: 10px 20px; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </p>
          <p>If you didn’t create an account, ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;">
          <p style="font-size: 12px; color: #888;">This link expires in 30 minutes.</p>
        </div>
      `;
      await sendEmail(user.email, "Verify your email", html);
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        const html = `
          <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h2 style="color: #007bff;">Confirm Your Email Change</h2>
            <p>Hello ${user.name || "there"},</p>
            <p>You requested to change your email address to <strong>${newEmail}</strong>.</p>
            <p>Click the button below to confirm this change:</p>
            <p style="margin: 20px 0;">
              <a href="${url}"
                 style="background-color: #007bff; color: #fff; text-decoration: none;
                        padding: 10px 20px; border-radius: 5px; display: inline-block;">
                Approve Email Change
              </a>
            </p>
            <p>If you didn’t request this change, ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin-top: 30px;">
            <p style="font-size: 12px; color: #888;">This link expires in 30 minutes.</p>
          </div>
        `;
        await sendEmail(user.email, "Approve Email Change", html);
      },
    },
  },
});
