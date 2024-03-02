import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVCSA-Basketball",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // TODO: fetch recent seasons
  return <section>{children}</section>;
}
