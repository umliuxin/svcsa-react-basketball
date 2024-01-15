import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import GlobalNav from "./components/global-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SVCSA V2",
  description: "SVCSA official website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GlobalNav />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
