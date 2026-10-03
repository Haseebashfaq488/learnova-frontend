import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learnova | Platform Admin",
  description: "Governance, user administration, financial analytics, and platform health.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
