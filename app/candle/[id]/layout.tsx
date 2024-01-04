export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pt-32 px-12">{children}</div>;
}
