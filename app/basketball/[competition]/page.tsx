import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import Custom404 from "@/components/404";


export default async function Page({
  params,
  searchParams,
}: {
  params: { competition: string };
  searchParams: { season: string };
}) {
  // fetch current season
  let season = await getRecentSeasonByGroup(params.competition);

  let seasonId = season?.id;

  if (searchParams.season) {
    seasonId = parseInt(searchParams.season, 10);
  }

  if (!seasonId) {
    return <Custom404 />;
  }
  return (
    <article>
      <h1>Season Name</h1>
      <h3>Some Meta</h3>
      <p>season summary</p>
      Links
    </article>
  );
}
