import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <Navbar />
        <div className="bg-gray-100 pt-6 px-6 overflow-y-auto flex-grow">
          {children}
        </div>
        <footer className="bottom-0 w-full bg-gray-100 text-xs font-extralight flex justify-center p-5">
          © 2024 Talenta.co - Advanced Payroll Automation & HR Solution
        </footer>
      </div>
    );
  }