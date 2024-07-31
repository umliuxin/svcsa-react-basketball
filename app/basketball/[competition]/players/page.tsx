import Custom404 from '@/components/404';
import TeamList from '@/components/basketball/teams/TeamList';
import { asyncFetch } from '@/utils/fetch';
import { getRecentSeasonByGroup } from '@/utils/get-recent-seasons';
import { GROUPNAME_TO_COMPETITIONID } from '@/utils/variables';
import SeasonSelectMenu from '@/components/basketball/teams/TeamSelectMenu';
import { TeamSelector } from '@/components/basketball/teams/TeamSelector';
import PlayerCard from '@/components/basketball/players/PlayerCard';

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = 'force-static';
export default async function Page({ params, searchParams }: any) {
  // fetch current season
  const season = await getRecentSeasonByGroup(params.competition);

  if (!season) {
    return <Custom404 />;
  }

  const { data: seasonPlayers } = await asyncFetch(
    `/basketball/seasonteamplayer?seasonid=${season.id}&$limit=50`
  );

  // fetch team list of the recent season
  const { data: seasonTeams } = await asyncFetch(
    `/basketball/seasonteam?seasonid=${season.id}&$limit=50`
  );

  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <TeamSelector seasonTeams={seasonTeams} />
        </div>
        <div className="w-full md:w-9/12 pl-4">
          <div className="bg-gray-100 p-4 rounded shadow flex flex-wrap">
            {seasonPlayers.map((seasonPlayer: BbSeasonTeamPlayer) => {
              if(!seasonPlayer.player) {
                return;
              }
              return (
                <div key={seasonPlayer.player.id} className="relative w-3/12 p-2">
                  <PlayerCard player={seasonPlayer.player} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  return [
    { competition: 'men-open' },
    { competition: 'women-open' },
    { competition: 'men-senior' },
  ];
}
