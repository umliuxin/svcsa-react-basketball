import Custom404 from "@/components/404";
import SeasonDropDownMenu from "@/components/basketball/teams/TeamDropDowmMenu";
import TeamList from "@/components/basketball/teams/TeamList";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import { GROUPNAME_TO_COMPETITIONID } from "@/utils/variables";

export default async function Page({ params, searchParams }: any) {
  // fetch current season
  const season = await getRecentSeasonByGroup(params.competition);
  // const seasons = await asyncFetch(
  //   `/basketball/season?competitionid=${GROUPNAME_TO_COMPETITIONID[params.competition]}`
  // );
  var teamList;
  if (!searchParams.season) {
    if (!season) {
      return <Custom404 />;
    }
    // fetch team list
    teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${season.id}&$limit=1000`
    );
  } else {
   teamList = await asyncFetch(
      `/basketball/seasonteam?seasonid=${searchParams.season}&$limit=1000`
    );
  }

  return (
    <section>
      {/* <h1>{season.name}</h1> */}
      {/* <SeasonDropDownMenu seasons = {seasons} /> */}
      <TeamList teams={teamList.data} />
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
