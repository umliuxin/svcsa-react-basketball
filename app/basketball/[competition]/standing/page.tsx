import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import { asyncFetch } from "@/utils/fetch";
import TeamRankTable from "@/components/basketball/standing/TeamRankTable";
import Custom404 from "@/components/404";
import { getGroupName } from "@/utils/get-group-name";

export default async function Page({
  params,
  searchParams,
}: {
  params: { competition: string };
  searchParams: {seasonid: string};
}) {

  let teamRanks: BbTeamrankm[];
  let season: BbSeason | undefined;
  if (!searchParams.seasonid) {
    // fetch recent season
    season = await getRecentSeasonByGroup(params.competition);
    if (!season) {
      return <Custom404 />;
    }
    console.log("aaa", `/basketball/teamrank?seasonid=${season.id}`);
    // fetch team list of the recent season
    teamRanks = await asyncFetch(
      `/basketball/teamrank?seasonid=${season.id}`
    );
  } else {
    console.log(
      "bbb",
      `/basketball/teamrank?seasonid=${searchParams.seasonid}`
    );
    // Fetch the team list based on the user's requested season ID
    teamRanks = await asyncFetch(
      `/basketball/teamrank?seasonid=${searchParams.seasonid}`
    );
    season = await asyncFetch(
      `/basketball/season/${searchParams.seasonid}`
    ).then((res) => res.data);
  }

  console.log("xlxlxl", teamRanks);

  if (!season) {
    return <Custom404 />;
  }
  if (season?.groupnumber && season.groupnumber > 1) {
    const teamRankByGroup: BbTeamrank[][] = new Array(season.groupnumber)
      .fill(0)
      .map(() => []);
    teamRanks.forEach((teamrank: BbTeamrank) => {
      const { groupid } = teamrank;
      teamRankByGroup[groupid].push(teamrank);
    });
    return (
      <section>
        <h1 className="text-2xl py-4">{season?.name} 球队</h1>
        {teamRankByGroup.map((teams: BbTeamrank[], idx) => {
          return (
            <div key={idx} className="mb-5">
              <h2 className="text-xl py-4 text-center">{getGroupName(idx)}</h2>
              <TeamRankTable teamRank={teams} />
            </div>
          );
        })}
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl py-4">{season.name}</h1>
      <TeamRankTable teamRank={teamRank} />
    </section>
  );
}

