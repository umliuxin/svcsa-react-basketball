import { asyncFetch } from "@/utils/fetch";
import Custom404 from "@/components/404";
import MatchContents from "@/components/basketball/matches/MatchContents";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import "./match.css";

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


  return (
    <section>
      <h1 className="text-2xl py-4">{season?.name}</h1>
      <MatchContents seasonId={season?.id} />
    </section>
  );
}
