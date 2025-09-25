import "@/app/globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      {children}
      <h1 className="text-xl md:text-5xl  m-3">Shirugame</h1>
    </div>
  );
};

export default RootLayout;
