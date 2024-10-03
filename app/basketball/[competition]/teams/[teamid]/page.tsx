import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import TeamInformation from "@/components/basketball/teams/TeamInformation";
import TeamImage from "@/components/basketball/teams/TeamImage";
import PlayerCard from "@/components/basketball/players/PlayerCard";
import TeamRankTable from "@/components/basketball/standing/TeamRankTable";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default async function Page({ params, searchParams }: any) {
  const { competition, teamid } = params;
  const page = parseInt(searchParams?.page || "1", 10);
  const DEFAULT_PAGINATION = 20;

  // 1. 获取当前赛季数据
  const season = await getRecentSeasonByGroup(competition);
  if (!season) {
    console.error("未找到赛季，Competition: ", competition);
    return <Custom404 />;
  }

  console.log("获取的赛季信息: ", season);
  console.log("Team ID: ", teamid);

  // 2. 获取球队详细信息
  let teamResponse;
  try {
    const teamUrl = `/basketball/seasonteam?seasonid=${season.id}&teamid=${teamid}`;
    console.log("请求球队信息的 URL: ", teamUrl);

    teamResponse = await asyncFetch(teamUrl);
    console.log("Team Response: ", teamResponse);

    if (!teamResponse || !teamResponse.data || teamResponse.data.length === 0) {
      console.error(`未找到球队数据，Team ID: ${teamid}`);
      return <Custom404 />;
    }
  } catch (error) {
    console.error(`获取球队信息失败，Team ID: ${teamid}, Error:`, error);
    return <Custom404 />;
  }

  const teamInfo = teamResponse.data[0].team;

  // 3. 获取球队的球员列表
  let seasonTeamPlayers;
  let totalPage;
  try {
    const playersUrl = `/basketball/seasonteamplayer?seasonid=${
      season.id
    }&teamid=${teamid}&$limit=${DEFAULT_PAGINATION}&$skip=${
      DEFAULT_PAGINATION * (page - 1)
    }`;
    console.log("请求球员列表的 URL: ", playersUrl);

    const seasonTeamPlayersResponse = await asyncFetch(playersUrl);
    seasonTeamPlayers = seasonTeamPlayersResponse?.data || [];
    totalPage = Math.ceil(seasonTeamPlayersResponse.total / DEFAULT_PAGINATION);
    console.log("Season Team Players: ", seasonTeamPlayers);
  } catch (error) {
    console.error(`获取球队球员数据失败，Team ID: ${teamid}, Error:`, error);
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
    } catch (error) {
      console.error(
        `获取球员赛季数据失败，Player ID: ${player.player.id}, Error:`,
        error
      );
    }
  }

  // 5. 获取所有球队的排名数据并筛选出当前球队
  let teamRank;
  try {
    teamRank = await asyncFetch(`/basketball/teamrank?seasonid=${season.id}`);
    console.log("所有球队排名数据: ", teamRank);

    // 筛选出目标球队排名
    teamRank = teamRank?.filter(
      (team: any) => team.teamid === parseInt(teamid)
    );
    console.log("筛选出的球队排名数据: ", teamRank);
  } catch (error) {
    console.error(`获取球队排名数据失败，Team ID: ${teamid}, Error:`, error);
    return <Custom404 />;
  }

  const handlePageChange = (newPage: number): void => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set("page", newPage.toString());
    router.push(`${pathName}?${currentParams.toString()}`);
  };

  return (
    <div className="container">
      <div className="flex flex-wrap">
        {/* 左侧：返回队伍列表的链接 */}
        <div className="w-full md:w-3/12">
          <div className="bg-gray-100 p-4 rounded shadow">
            <Link href={`/basketball/${competition}/teams`} legacyBehavior>
              <a className="block text-center text-blue-600 font-bold mb-4">
                返回该赛季队伍列表
              </a>
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
          <div className="bg-gray-100 p-4 rounded shadow">
            {teamInfo ? (
              <>
                {/* 显示球队头像，使用标准 img 标签 */}
                <p className="text-gray-600 font-bold">
                  赛季:
                  <Link
                    href={`/basketball/${competition}/teams?seasonId=${season.id}`}
                    legacyBehavior
                  >
                    <a className="text-blue-600 hover:underline">
                      {season.name}
                    </a>
                  </Link>
                </p>
                <div className="text-center">
                  {teamInfo.logosrc && (
                    <img
                      src={teamInfo.logosrc}
                      alt={`${teamInfo.name} Logo`}
                      className="mx-auto mb-4 h-24"
                    />
                  )}
                  <h2 className="text-2xl font-bold">{teamInfo.name}</h2>
                  <p className="text-gray-600" style={{ textAlign: "center" }}>
                    {teamInfo.description}
                  </p>
                </div>

                {/* 队长信息部分 */}
                <div
                  className="bg-white p-4 rounded-lg shadow mt-4"
                  style={{ textAlign: "center" }}
                >
                  <p>
                    <span className="font-bold">队长: </span>
                    {teamInfo.captain}
                  </p>
                  <p>
                    <span className="font-bold">邮箱: </span>
                    <a
                      href={`mailto:${teamInfo.email}`}
                      className="text-blue-600 underline"
                    >
                      {teamInfo.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-bold">电话: </span>
                    {teamInfo.tel}
                  </p>
                  <p>
                    <span className="font-bold">微信: </span>
                    {teamInfo.wechat}
                  </p>
                  <p>
                    <span className="font-bold">球队编号: </span>
                    {teamInfo.id}
                  </p>
                  <p>
                    <span className="font-bold">球队队员总数: </span>
                    {seasonTeamPlayers.length}
                  </p>
                </div>

                {/* 显示球队的赛季表现 (Team Rank Table) */}
                <div className="bg-gray-100 p-4 rounded shadow mt-4">
                  <h2 className="text-lg font-bold mb-2 border-l-4 border-lime-600 ps-2">
                    球队赛季表现
                  </h2>

                  {/* 判断如果没有数据，则显示提示信息 */}
                  {teamRank.length > 0 ? (
                    <table className="min-w-full bg-white border-collapse">
                      <thead>
                        <tr>
                          {/* 删除排名列 */}
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            球队
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            积分
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            胜
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            负
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            弃权
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            得分
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            失分
                          </th>
                          <th className="py-2 px-4 border-b text-white bg-lime-600">
                            净胜分
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {teamRank.map((team) => (
                          <tr key={team.teamid}>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.team?.name}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.point}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.win}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.lose}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.forfeit}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.total_score}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.oppo_score}
                            </td>
                            <td
                              className="py-2 px-4 border-b"
                              style={{ textAlign: "center" }}
                            >
                              {team.score_diff}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>当前没有球队排名数据。</p>
                  )}
                </div>

                {/* 显示球队队员赛季数据 */}
                <div className="bg-gray-100 p-4 rounded shadow mt-4">
                  <h2 className="text-lg font-bold mb-2 border-l-4 border-lime-600 ps-2">
                    球队队员赛季数据
                  </h2>

                  {/* 表格外部增加滚动容器 */}
                  <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                    <table className="min-w-full bg-white border-collapse">
                      <thead>
                        <tr>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            球员
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            得分
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            篮板
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            助攻
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            抢断
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            盖帽
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            投篮%
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            三分%
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            罚球%
                          </th>
                          <th
                            className="py-2 px-4 border-b bg-white sticky top-0 z-10"
                            style={{
                              backgroundColor: "#65a30d",
                              color: "white",
                            }}
                          >
                            犯规
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {seasonTeamPlayers.map((player: any) => {
                          const avg = playerSeasonAverages.find(
                            (p: any) => p.playerid === player.player.id
                          );
                          return (
                            <tr key={player.player.id}>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                <Link
                                  href={`/basketball/${competition}/players/${player.player.id}`}
                                  className="text-blue-600"
                                >
                                  {player.player.name}
                                </Link>
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.points !== undefined
                                  ? avg.points.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.rebound !== undefined
                                  ? avg.rebound.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.assist !== undefined
                                  ? avg.assist.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.steal !== undefined
                                  ? avg.steal.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.block !== undefined
                                  ? avg.block.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.fgp !== undefined
                                  ? `${(avg.fgp * 100).toFixed(1)}%`
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.["3gp"] !== undefined
                                  ? `${(avg["3gp"] * 100).toFixed(1)}%`
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.ftp !== undefined
                                  ? `${(avg.ftp * 100).toFixed(1)}%`
                                  : "N/A"}
                              </td>
                              <td
                                className="py-2 px-4 border-b"
                                style={{ textAlign: "center" }}
                              >
                                {avg?.foul !== undefined
                                  ? avg.foul.toFixed(1)
                                  : "N/A"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <p>未能加载球队详细信息。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
