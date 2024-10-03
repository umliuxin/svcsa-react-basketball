import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { formatDate } from "@/utils/formatDateTime";
import SeasonMenu from "@/components/basketball/homePage/SeasonMenu";

export default async function Page({
  params,
  searchParams,
}: {
  params: { competition: string };
  searchParams: { season: string };
}) {
  // fetch current season
  let season: BbSeason | undefined;
  if (!searchParams.season) {
    // fetch recent season
    season = await getRecentSeasonByGroup(params.competition);
  } else {
    season = await asyncFetch(`/basketball/season/${searchParams.season}`);
  }

  if (!season) {
    return <Custom404 />;
  }
  const recentSeason = await getRecentSeasonByGroup(params.competition);

  const isRecentSeason = season && season?.id === recentSeason?.id;

  return (
    <article>
      <h1 className="text-2xl py-4">{season?.name}</h1>
      <section>
        <h3>{formatDate(season.starttime)}</h3>
        <h4>{isRecentSeason ? "进行中" : "已结束"}</h4>
      </section>
      <SeasonMenu season={season} isRecentSeason={isRecentSeason} />
    </article>
  );
}
