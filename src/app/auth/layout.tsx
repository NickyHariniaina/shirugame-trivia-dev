import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
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
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
