"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { BsBrightnessHigh } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
// TODO: Add head for SEO later
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html className="w-full h-full" lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-row justify-center items-center h-screen gap-3">
            {children}
          </div>
          <Toaster
            toastOptions={{
              success: {
                icon: <BsBrightnessHigh />
              },
              error: {
                icon : <RiErrorWarningLine />
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
