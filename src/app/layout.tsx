
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Time",
  description: "Your one-stop shop for joy and happiness!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={inter.className}>
        <AuthProvider>
            {children}
            <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
