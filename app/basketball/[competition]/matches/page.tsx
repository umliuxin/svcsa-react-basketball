import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import MatchContents from "@/components/basketball/matches/MatchContents";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import "../../../match.css"

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = 'force-static';
export default async function Page({ params, searchParams }: any) {
  // fetch current season
  let season = await getRecentSeasonByGroup(params.competition);

  var matchList;
  var teamList;
  if (!searchParams.season) {
    if (!season) {
      return <Custom404 />;
    }

    // fetch match list
    // 500 is not a number that makes sense
    // Add pagination for match list
    matchList = await asyncFetch(
      `/basketball/match?seasonid=${season.id}&$limit=20`
    );
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${season.id}&$limit=20`
    );
  } else {
    matchList = await asyncFetch(
      `/basketball/match?seasonid=${searchParams.season}&$limit=20`
    );
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${searchParams.season}&$limit=20`
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