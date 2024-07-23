import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import GlobalNav from "../components/global-nav";
import SiteBreadcrumb from "@/components/shared/site-breadcrumb";
import GlobalFooter from "../components/shared/global-footer";

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
        <main className="relative container mx-auto max-w-7xl z-10 px-6 mb-12 flex-grow">
          <SiteBreadcrumb />
          <Providers>{children}</Providers>
        </main>
        <GlobalFooter />
      </body>
    </html>
  );
}
