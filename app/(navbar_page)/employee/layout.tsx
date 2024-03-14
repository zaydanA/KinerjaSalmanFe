import Navbar from "@/components/shares/navbar/Navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    // const router = useRouter()
    return (
      <div className="bg-white rounded-md py-10 px-12 border">
        {children}
      </div>
    );
  }