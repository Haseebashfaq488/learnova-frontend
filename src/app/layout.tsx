import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { GlobalThemeWrapper } from '../components/GlobalThemeWrapper';

export const metadata: Metadata = {
  title: 'Learnova — Adaptive Learning Platform',
  description: 'Structured curriculum, topic-level mastery, and contextual AI support working together in one evidence-led syllabus. FAST-NUCES 2026.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <ThemeProvider>
            <GlobalThemeWrapper>
              {children}
            </GlobalThemeWrapper>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
