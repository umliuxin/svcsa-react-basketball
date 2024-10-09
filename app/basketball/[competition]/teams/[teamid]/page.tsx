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
      <div className="flex flex-wrap">
        {/* 左侧：返回队伍列表的链接 */}
        <div className="w-full md:w-3/12">
          <div className="bg-gray-100 p-4 rounded shadow">
            <Link
              href={`/basketball/${competition}/teams`}
              className="block text-center text-blue-600 font-bold mb-4"
            >
              返回该赛季队伍列表
            </Link>

            {/* 球员列表标题 */}
            <div className="text-lg font-bold mb-2 text-center border border-gray-400 p-2 rounded-md">
              {teamInfo.name} 球员列表
            </div>

            {/* 球员列表 */}
            <div
              className="bg-gray-100 p-4 rounded shadow mt-4"
              style={{ maxHeight: "700px", overflowY: "scroll" }}
            >
              <div className="flex flex-col justify-start">
                {players.map((seasonPlayer: any) => {
                  if (!seasonPlayer.player) {
                    return null;
                  }
                  return (
                    <div
                      key={seasonPlayer.player.id}
                      className="relative w-full p-2 bg-white shadow-lg rounded-lg m-2"
                    >
                      <Link
                        href={`/basketball/${competition}/players/${seasonPlayer.player.id}`}
                      >
                        <PlayerCard
                          player={seasonPlayer.player}
                          params={params}
                        />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：展示球队的详细信息 */}
        <div className="w-full md:w-9/12 pl-4">
          <TeamInformation
            team={teamInfo} //
            seasonName={season.name}
            showDetails={true}
          />
          <TeamRankTable teamRank={teamRank} highlightIndex={rankIndex} />
          <PlayerSeasonTable
            playerSeasonAverages={stats}
            competition={competition}
          />
        </div>
      </div>
    </div>
  );
}
