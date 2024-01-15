import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SVCSA-Basketball",
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <h1> I am basketball layout</h1>

      {children}
    </section>
  );
}
