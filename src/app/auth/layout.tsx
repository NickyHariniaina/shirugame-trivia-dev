import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { BsBrightnessHigh } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        {children}
        <h1 className="text-xl md:text-5xl  m-3">Shirugame</h1>
      </div>
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
  );
};

export default RootLayout;
