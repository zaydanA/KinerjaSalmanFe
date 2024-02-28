import Navbar from "@/components/navbar";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col h-full w-full">
        <Navbar></Navbar>
        <div className="h-full">
            {children}
        </div>
      </div>
    );
  }