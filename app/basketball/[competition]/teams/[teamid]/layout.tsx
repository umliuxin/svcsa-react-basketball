export default function DashboardLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { competition: string; teamId?: string; teamName?: string };
}) {
  // TODO: dynamic part for competition
  let title = params.competition.replace("-", " ").toUpperCase();
  if (params.teamName) {
    title += `: ${params.teamName}`;
  }

  return (
    <section>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
