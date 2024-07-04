import { Inter } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/common-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portus",
  description: "Shopping cart app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
