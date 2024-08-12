export default function DashboardLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { competition: string };
}) {
  // TODO: dynamic part for competition
  return (
    <section>
      {/* <h1>{params.competition}</h1> */}
      {children}
    </section>
  );
}

