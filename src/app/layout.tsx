import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProfileProvider } from "@/components/ProfileProvider";
import TopNav from "@/components/TopNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Resume Builder",
  description: "Build, preview, and export a resume portfolio without a DB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forest">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProfileProvider>
          <div className="min-h-screen bg-base-200 text-base-content">
            <TopNav />
            <main className="mx-auto w-full max-w-6xl px-6 py-10">
              {children}
            </main>
          </div>
        </ProfileProvider>
      </body>
    </html>
  );
}
