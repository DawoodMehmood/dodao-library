import "./globals.css";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library',
  description: 'Library Management System using React in combination with Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
