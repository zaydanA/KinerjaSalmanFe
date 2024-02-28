import Navbar from "@/components/shared/navbar/navbar";
import { useRouter } from "next/router";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter()
    return (
      <div className="flex flex-col h-full w-full">
        <Navbar router={router}></Navbar>
        <div className="h-full">
            {children}
        </div>
      </div>
    );
  }