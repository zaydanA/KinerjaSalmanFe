import Navbar from "@/components/shared/navbar/navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="flex flex-col h-screen w-full">
        <Navbar></Navbar>
        <div className="h-full w-full bg-gray-100">
            {children}
        </div>
      </div>
    );
  }