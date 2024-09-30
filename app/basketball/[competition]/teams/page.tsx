import Custom404 from "@/components/404";
import TeamList from "@/components/basketball/teams/TeamList";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";

export default async function Page({ params, searchParams }: any) {
  var teamList;
  var seasonName;
  if (!searchParams.season) {
    // fetch recent season
    const season = await getRecentSeasonByGroup(params.competition);
    if (!season) {
      return <Custom404 />;
    }
    // fetch team list of the recent season
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${season.id}&$limit=1000`
    );
    seasonName = season.name;
  } else {
    // Fetch the team list based on the user's requested season ID
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${searchParams.season}&$limit=1000`
    );
    const season = await asyncFetch(
      `/basketball/season/${searchParams.season}`
    );
    seasonName = season.name;
  }

  return (
    <section>
      <h1 className="text-2xl py-4">{seasonName} 球队</h1>

      <TeamList teams={teamList.data} />
    </section>
  );
}
