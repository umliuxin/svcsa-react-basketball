import getRecentSeasons from "../../../utils/get-recent-seasons";
import { asyncFetch } from "@/app/utils/fetch";
import TeamRankTable from "@/app/components/basketball/standing/TeamRankTable";

export function generateStaticParams() {
  return [
    { competition: "men-open" },
    { competition: "women-open" },
    { competition: "men-senior" },
  ];
}

export const dynamicParams = false // true | false,

export default async function Page({ params }: { params: { competition: string } }) {
  // fetch current season
  const [ season ] = await getRecentSeasons(params.competition);
  // fetch team rank
  const teamRank = await asyncFetch(`/basketball/teamrank?seasonid=${season.id}`);
  return (
    <section>
      <h1>{season.name}</h1>
      <TeamRankTable teamRank={teamRank} />
    </section>
  );
}
