import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/app-shell";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export const metadata: Metadata = {
  title: { default: "ECON Study Hub", template: "%s · ECON Study Hub" },
  description: "พื้นที่อ่าน ทำความเข้าใจ จดจำ และทบทวนเนื้อหาเศรษฐศาสตร์",
  icons: { icon: `${basePath}/favicon.svg` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">ข้ามไปยังเนื้อหาหลัก</a>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
