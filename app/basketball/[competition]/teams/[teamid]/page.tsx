import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import TeamInformation from "@/components/basketball/teams/TeamInformation";
import ATeamRankTable from "@/components/basketball/teams/ATeamRankTable";
import PlayerSeasonTable from "@/components/basketball/teams/PlayerSeasonTable";
import PlayerCard from "@/components/basketball/players/PlayerCard";
import Link from "next/link";
import { BbTeam } from "@/types/BbTeam";

export default async function Page({ params, searchParams }: any) {
  const { competition, teamid } = params;
  const page = parseInt(searchParams?.page || "1", 10);
  const DEFAULT_PAGINATION = 20;

  // 1. 获取当前赛季数据
  const season = await getRecentSeasonByGroup(competition);
  if (!season) {
    return <Custom404 />;
  }

  // 2. 获取球队详细信息
  let teamResponse;
  let teamInfo: BbTeam;
  try {
    const teamUrl = `/basketball/seasonteam?seasonid=${season.id}&teamid=${teamid}`;
    teamResponse = await asyncFetch(teamUrl);
    if (!teamResponse || !teamResponse.data || teamResponse.data.length === 0) {
      return <Custom404 />;
    }
    teamInfo = teamResponse.data[0].team as BbTeam;
  } catch (error) {
    return <Custom404 />;
  }

  // 3. 获取球队的球员列表
  let seasonTeamPlayers;
  let totalPage;
  try {
    const playersUrl = `/basketball/seasonteamplayer?seasonid=${
      season.id
    }&teamid=${teamid}&$limit=${DEFAULT_PAGINATION}&$skip=${
      DEFAULT_PAGINATION * (page - 1)
    }`;

    const seasonTeamPlayersResponse = await asyncFetch(playersUrl);
    seasonTeamPlayers = seasonTeamPlayersResponse?.data || [];
    totalPage = Math.ceil(seasonTeamPlayersResponse.total / DEFAULT_PAGINATION);
  } catch (error) {
    return <Custom404 />;
  }

  // 4. 逐一请求球员的赛季数据
  const playerSeasonAverages = [];
  for (const player of seasonTeamPlayers) {
    try {
      const playerAverageResponse = await asyncFetch(
        `/basketball/playerseasonaverage?seasonid=${season.id}&playerid=${player.player.id}`
      );
      const playerAverageData = playerAverageResponse?.data?.[0];
      if (playerAverageData) {
        playerSeasonAverages.push({
          playerid: player.player.id,
          ...playerAverageData,
        });
      }
    } catch (error) {}
  }

  // 5. 获取所有球队的排名数据并筛选出当前球队
  let teamRank;
  try {
    teamRank = await asyncFetch(`/basketball/teamrank?seasonid=${season.id}`);
    teamRank = teamRank?.filter(
      (team: any) => team.teamid === parseInt(teamid)
    );
  } catch (error) {
    return <Custom404 />;
  }

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
                {seasonTeamPlayers.map((seasonPlayer: any) => {
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
          <ATeamRankTable teamRank={teamRank} />
          <PlayerSeasonTable
            seasonTeamPlayers={seasonTeamPlayers}
            playerSeasonAverages={playerSeasonAverages}
            competition={competition}
          />
        </div>
      </div>
    </div>
  );
}
