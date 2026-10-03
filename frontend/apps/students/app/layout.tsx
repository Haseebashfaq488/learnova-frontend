import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learnova | Student Portal",
  description: "Accelerate your learning journey with interactive courses and AI guidance.",
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
