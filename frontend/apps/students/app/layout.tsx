import type { Metadata } from "next";
import "./globals.css";
import { EnrollmentProvider } from "../lib/enrollment-context";
import { CoursePreviewModal } from "../components/course-preview-modal";
import { EnrollmentToast } from "../components/enrollment-toast";

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
        <EnrollmentProvider>
          {children}
          <CoursePreviewModal />
          <EnrollmentToast />
        </EnrollmentProvider>
      </body>
    </html>
  );
}

