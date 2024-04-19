export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <div className="bg-white rounded-md py-10 px-12 border max-sm:p-2">
        {children}
      </div>
    );
  }