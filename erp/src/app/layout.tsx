import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export const metadata: Metadata = {
  title: "BIOS ERP",
  description: "BIOS Medical — Enterprise Resource Planning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-surface-50">
        <Sidebar />
        <TopBar />
        <main className="ml-60 pt-14 min-h-screen">
          <div className="p-6 animate-fade-in">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
