import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata = {
  title: "Interactive Calendar",
  description: "Wall calendar component",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
