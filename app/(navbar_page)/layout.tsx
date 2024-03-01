import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="flex flex-col h-full w-full overflow-y-auto">
        <Navbar></Navbar>
        <div className="h-[87%] w-full bg-gray-100 pt-6 px-0 md:px-6">
            {children}
          <footer className="bg-gray-100 text-xs font-extralight flex justify-center p-5 relative">© 2024 Talenta.co - Advanced Payroll Automation & HR Solution</footer>
        </div>
      </div>
    );
  }