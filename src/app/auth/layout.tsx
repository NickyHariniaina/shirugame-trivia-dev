import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

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
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
