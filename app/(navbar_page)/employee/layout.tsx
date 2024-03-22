import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <div className="bg-white rounded-md border">
        {children}
      </div>
    );
  }