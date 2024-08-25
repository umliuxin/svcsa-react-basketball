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

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = "force-static";
export default async function Page({ params, searchParams }: any) {
  // fetch current season
  const season = await getRecentSeasonByGroup(params.competition);

  if (!season) {
    return <Custom404 />;
  }

  const seasonId = parseInt(searchParams?.seasonid, 10) || season?.id;

  // fetch team list of the recent season
  const { data: seasonTeams } = await asyncFetch(
    `/basketball/seasonteam?seasonid=${seasonId}&$limit=50`
  );

  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <TeamSelector seasonTeams={seasonTeams} />
        </div>
        <div className="w-full md:w-9/12 pl-4">
          <PlayersList seasonId={seasonId} params={params}/>
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
