import Custom404 from "@/components/404";
import TeamList from "@/components/basketball/teams/TeamList";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import { getGroupName } from "@/utils/get-group-name";

export default async function Page({
  params,
  searchParams,
}: {
  params: { competition: string };
  searchParams: { season: string };
}) {
  let teamList: BbSeasonTeam[];
  let season: BbSeason | undefined;
  if (!searchParams.season) {
    // fetch recent season
    season = await getRecentSeasonByGroup(params.competition);
    if (!season) {
      return <Custom404 />;
    }
    // fetch team list of the recent season
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${season.id}&$limit=100`
    ).then((res) => res.data);
  } else {
    // Fetch the team list based on the user's requested season ID
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${searchParams.season}&$limit=100`
    ).then((res) => res.data);
    season = await asyncFetch(
      `/basketball/season/${searchParams.season}`
    );
  }
  if (season?.groupnumber && season.groupnumber > 1) {
    const teamListByGroup: BbSeasonTeam[][] = new Array(season.groupnumber)
      .fill(0)
      .map(() => []);
    teamList.forEach((team: BbSeasonTeam) => {
      const { groupid } = team;
      teamListByGroup[groupid].push(team);
    });
    return (
      <section>
        <h1 className="text-2xl py-4">{season?.name} 球队</h1>
        {teamListByGroup.map((teams: BbSeasonTeam[], idx) => {
          return (
            <div key={idx} className="mb-5">
              <h2 className="text-xl py-4 text-center">{getGroupName(idx)}</h2>
              <TeamList teams={teams} />
            </div>
          );
        })}
      </section>
    );
  }
  return (
    <section>
      <h1 className="text-2xl py-4">{season?.name} 球队</h1>

      <TeamList teams={teamList} />
    </section>
  );
}
