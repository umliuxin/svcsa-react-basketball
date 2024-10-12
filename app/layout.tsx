import "./globals.css";
import { Providers } from "./providers";
import GlobalNav from "../components/global-nav";
import SiteBreadcrumb from "@/components/shared/site-breadcrumb";
import GlobalFooter from "../components/shared/global-footer";
import { getRecentSeasons } from "@/utils/get-recent-seasons";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "SVCSA V2",
  description: "SVCSA official website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seasons = await getRecentSeasons();

  return (
    <html lang="en">
      <body>
        <GlobalNav seasons={seasons} />
        <main className="relative container mx-auto max-w-7xl z-10 px-6 mb-12 flex-grow">
          <SiteBreadcrumb />
          <Providers>{children}</Providers>
        </main>
        <GlobalFooter />
      </body>
      <GoogleAnalytics gaId="G-EFDQ4R8NMH" />
    </html>
  );
}
