import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import TeamImage from "@/components/basketball/teams/TeamImage";
import PlayerSeasonAverage from "@/components/basketball/players/PlayerSeasonAverage";
import PlayerListOfTeam from "@/components/basketball/players/PlayerListOfTeam";
import PlayerPage from "@/components/basketball/players/PlayerPage";

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = "force-static";

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  return [
    { competition: "men-open", playerid: "189" },
    { competition: "women-open", playerid: "189" },
    { competition: "men-senior", playerid: "189" },
  ];
}

export default async function Page({ params, searchParams }: any) {
  // fetch current season
  const season = await getRecentSeasonByGroup(params.competition);

  if (!season) {
    return <Custom404 />;
  }
  const decodedPlayerId = decodeURIComponent(params.playerid);
  const playerId = decodedPlayerId.split("=")[1];
  const seasonTeamPlayer = await asyncFetch(
    `/basketball/seasonteamplayer?seasonid=${season.id}&playerid=${playerId}`
  );
  const teamInfo = seasonTeamPlayer.data[0].team;
  const seasonTeamPlayers = await asyncFetch(
    `/basketball/seasonteamplayer?seasonid=${season.id}&teamid=${teamInfo.id}&$limit=20`
  );
  const playerseasonaverage = await asyncFetch(
    `/basketball/playerseasonaverage?seasonid=${season.id}&playerid=${playerId}`
  );
  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <div className="bg-gray-100 p-4 rounded shadow">
            {/* Content for the 3-column section: team name and player list*/}
            <div className="flex gap-2 items-center">
              <TeamImage
                imageClass="w-16 h-16 bg-slate-100"
                team={teamInfo}
                textClass="text-center font-medium text-xl font-thin text-zinc-800"
              />
              <div className="text-xl font-bold mb-2">{teamInfo.name}</div>
            </div>
            <PlayerListOfTeam
              seasonTeamPlayers={seasonTeamPlayers.data}
              params={params}
            />
          </div>
        </div>

        <div className="w-full md:w-9/12 pl-4">
          <div className="bg-gray-100 p-4 rounded shadow ">
            {/* Content for the 9-column section: player information and statistic */}
            <PlayerPage seasonTeamPlayer={seasonTeamPlayer.data[0]} />
            <div className="mt-16 ms-3 ">
              <div className="font-semibold text-2xl border-l-4 border-lime-600 ps-2">
                Player Statistic
              </div>
              <div className="my-5">
                <PlayerSeasonAverage
                  playerSeasonAverage={playerseasonaverage.data[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
