import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <ToastContainer
          autoClose={3000}
        />
        <Navbar />
        <div className="bg-gray-100 py-6 px-6 overflow-y-auto flex-grow">
          {children}
        </div>
        <footer className="w-full bg-gray-100 text-xs font-extralight flex justify-center p-5">
          © 2024 Talenta.co - Advanced Payroll Automation & HR Solution
        </footer>
      </div>
    );
  }