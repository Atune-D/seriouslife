import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/app/AppShell";

export const metadata: Metadata = {
  title: "seriouslife - Daily Progress Tracker",
  description: "Track your KPIs, tasks, and daily progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}


