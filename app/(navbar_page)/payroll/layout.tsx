export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <div className="bg-white rounded-md border max-sm:p-2">
        {children}
      </div>
    );
  }