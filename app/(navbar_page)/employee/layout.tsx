import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="bg-white rounded-md border max-sm:p-2">
        {children}
      </div>
    );
  }