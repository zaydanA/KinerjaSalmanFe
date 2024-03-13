import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="bg-white rounded-md py-6 px-8 border">
        {children}
      </div>
    );
  }