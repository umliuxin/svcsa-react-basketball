import Custom404 from "@/components/404";
import TeamList from "@/components/basketball/teams/TeamList";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import { GROUPNAME_TO_COMPETITIONID } from "@/utils/variables";
import TeamSeasonSelectMenu from "@/components/basketball/teams/TeamSeasonSelectMenu";

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = "";
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

  var seasons = await asyncFetch(
    `/basketball/season?competitionid=${
      GROUPNAME_TO_COMPETITIONID[params.competition]
    }`
  );

  return (
    <section>
      <h1 className="text-center text-2xl mt-8">{seasonName}</h1>
      <br />
      <br />
      <TeamSeasonSelectMenu seasons={seasons.data} />
      <br />
      <br />
      <TeamList teams={teamList.data} />
    </section>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
// export async function generateStaticParams() {
//   return [
//     { competition: "men-open" },
//     { competition: "women-open" },
//     { competition: "men-senior" },
//   ];
// }
