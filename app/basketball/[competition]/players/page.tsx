import Custom404 from "@/components/404";
import TeamList from "@/components/basketball/teams/TeamList";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import { GROUPNAME_TO_COMPETITIONID } from "@/utils/variables";
import SeasonSelectMenu from "@/components/basketball/teams/TeamSeasonSelectMenu";
import { TeamSelector } from "@/components/basketball/teams/TeamSelector";
import PlayerCard from "@/components/basketball/players/PlayerCard";
import { Pagination } from "@nextui-org/react";
import PlayersList from "@/components/basketball/players/PlayersList";

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

  // fetch team list of the recent season
  const { data: seasonTeams } = await asyncFetch(
    `/basketball/seasonteam?seasonid=${season?.id}&$limit=50`
  );

  return (
    <div className="container">
      <h1 className="text-2xl py-4">{season?.name} 球员</h1>

      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <TeamSelector seasonTeams={seasonTeams} />
        </div>
        <div className="w-full md:w-9/12 pl-4">
          <PlayersList seasonId={season.id} params={params} />
        </div>
      </div>
    </div>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  return [
    { competition: "men-open" },
    { competition: "women-open" },
    { competition: "men-senior" },
  ];
}
