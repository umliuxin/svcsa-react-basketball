import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import TeamInformation from "@/components/basketball/teams/TeamInformation";
import PlayerSeasonTable from "@/components/basketball/teams/PlayerSeasonTable";
import PlayerCard from "@/components/basketball/players/PlayerCard";
import Link from "next/link";
import TeamRankTable from "@/components/basketball/standing/TeamRankTable";

const DEFAULT_PAGINATION = 20;

// TODO: add support for team not in recent season
// TODO: add history season
export default async function Page({ params }: any) {
  const { competition, teamid } = params;

  // 1. 获取当前赛季数据
  const season = await getRecentSeasonByGroup(competition);
  if (!season) {
    return <Custom404 />;
  }

  // Requests
  const teamUrl = `/basketball/seasonteam?seasonid=${season.id}&teamid=${teamid}`;
  const playersUrl = `/basketball/seasonteamplayer?seasonid=${season.id}&teamid=${teamid}&$limit=${DEFAULT_PAGINATION}`;
  const statsUrl = `/basketball/playerseasonaverage?seasonid=${season.id}&teamid=${teamid}`;
  const rankUrl = `/basketball/teamrank?seasonid=${season.id}`;

  const [seasonTeam, players, stats, teamRank] = (await Promise.all([
    asyncFetch(teamUrl),
    asyncFetch(playersUrl),
    asyncFetch(statsUrl),
    asyncFetch(rankUrl),
  ]).then(([seasonTeamData, playersData, statsData, teamRankData]) => {
    const seasonTeam = seasonTeamData.data[0];
    return [
      seasonTeam,
      playersData.data,
      statsData.data,
      teamRankData.filter((teamRank: BbTeamrank) => {
        return teamRank.groupid === seasonTeam.groupid;
      }),
    ];
  })) as [BbSeasonTeam, BbSeasonTeamPlayer[], BbStat[], BbTeamrank[]];

  const teamInfo: BbTeam | undefined = seasonTeam.team;

  if (!teamInfo) {
    return <Custom404 />;
  }

  const rankIndex = teamRank.findIndex((team) => {
    return team.teamid === teamInfo.id;
  });

  return (
    <div className="container">
      <div className="flex flex-wrap items-stretch">
        <div className="w-full md:w-6/12 p-2">
          <TeamInformation team={teamInfo} playerCount={players.length} />
        </div>

        {/* 右侧：展示球队的详细信息 */}
        <div className="w-full md:w-6/12 p-2">
          <TeamRankTable teamRank={teamRank} highlightIndex={rankIndex} />
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="bg-white mt-4 p-4 rounded-large shadow-small">
          {/* 球员列表标题 */}
          <div className="text-lg font-bold mb-2 text-center p-2">
            {teamInfo.name} 球员列表
          </div>

          {/* 球员列表 */}
          <div className="flex flex-wrap">
            {players.map((seasonPlayer: any) => {
              if (!seasonPlayer.player) {
                return null;
              }
              return (
                <div
                  key={seasonPlayer.player.id}
                  className="relative w-3/12 lg:w-2/12 p-2"
                >
                  <PlayerCard player={seasonPlayer.player} params={params} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <PlayerSeasonTable
          playerSeasonAverages={stats}
          competition={competition}
        />
      </div>
    </div>
  );
}
