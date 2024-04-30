import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import MatchContents from "@/components/basketball/matches/MatchContents";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";

export default async function Page({ params, searchParams }: any) {
  // fetch current season
  const season = await getRecentSeasonByGroup(params.competition);

  var matchList;
  var teamList;
  if (!searchParams.season) {
    if (!season) {
      return <Custom404 />;
    }

    // fetch match list
    matchList = await asyncFetch(
      `/basketball/match?seasonid=${season.id}&$limit=500`
    );
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${season.id}&$limit=500`
    );
  } else {
   matchList = await asyncFetch(
      `/basketball/match?seasonid=${searchParams.season}&$limit=500`
    );
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${searchParams.season}&$limit=500`
    );
  }

  return (
    <section>
      {/* <h1>{season.name}</h1> */}
      <MatchContents matches={matchList.data} teams={teamList.data}/>
    </section>
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