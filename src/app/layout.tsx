import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "react-hot-toast";
import { BsBrightnessHigh } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

// TODO: Add head for SEO later
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rock+3D&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster
            toastOptions={{
              success: {
                icon: <BsBrightnessHigh />,
              },
              error: {
                icon: <RiErrorWarningLine />,
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
