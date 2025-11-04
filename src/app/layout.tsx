import { FirebaseProvider } from "@/components/FirebaseProvider";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

export const metadata = {
  title: "Happy Time",
  description: "Smart retail & e-commerce platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FirebaseProvider>
          <AuthProvider>{children}</AuthProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
