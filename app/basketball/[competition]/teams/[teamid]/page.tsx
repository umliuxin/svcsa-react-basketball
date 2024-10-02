// // import Custom404 from "@/components/404";
// // import { asyncFetch } from "@/utils/fetch";
// // import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
// // import TeamInformation from "@/components/basketball/teams/TeamInformation";
// // import TeamImage from "@/components/basketball/teams/TeamImage";
// // import PlayerCard from "@/components/basketball/players/PlayerCard";
// // import { Pagination } from "@nextui-org/react";
// // import Link from "next/link"; // Use the correct Link import
// // import { useRouter } from "next/navigation"; // Use router for page navigation (client component)
// // import { useState, useEffect } from "react";

// // export default async function Page({ params, searchParams }: any) {
// //   const { competition, teamid } = params;
// //   const page = parseInt(searchParams?.page || "1", 10);
// //   const DEFAULT_PAGINATION = 20;

// //   // 1. 获取当前赛季数据
// //   const season = await getRecentSeasonByGroup(competition);
// //   if (!season) {
// //     console.error("未找到赛季，Competition: ", competition);
// //     return <Custom404 />;
// //   }

// //   console.log("获取的赛季信息: ", season);
// //   console.log("Team ID: ", teamid);

// //   // 2. 获取球队详细信息
// //   let teamResponse;
// //   try {
// //     const teamUrl = `/basketball/seasonteam?seasonid=${season.id}&teamid=${teamid}`;
// //     console.log("请求球队信息的 URL: ", teamUrl);

// //     teamResponse = await asyncFetch(teamUrl);
// //     console.log("Team Response: ", teamResponse);

// //     // 验证返回的响应是否有效
// //     if (!teamResponse || !teamResponse.data || teamResponse.data.length === 0) {
// //       console.error(`未找到球队数据，Team ID: ${teamid}`);
// //       return <Custom404 />;
// //     }
// //   } catch (error) {
// //     console.error(`获取球队信息失败，Team ID: ${teamid}, Error:`, error);
// //     return <Custom404 />;
// //   }

// //   const teamInfo = teamResponse.data[0].team; // 确保从正确的字段提取数据

// //   // 3. 获取球队的球员列表
// //   let seasonTeamPlayers;
// //   let totalPage;
// //   try {
// //     const playersUrl = `/basketball/seasonteamplayer?seasonid=${
// //       season.id
// //     }&teamid=${teamid}&$limit=${DEFAULT_PAGINATION}&$skip=${
// //       DEFAULT_PAGINATION * (page - 1)
// //     }`;
// //     console.log("请求球员列表的 URL: ", playersUrl);

// //     const seasonTeamPlayersResponse = await asyncFetch(playersUrl);
// //     seasonTeamPlayers = seasonTeamPlayersResponse?.data || [];
// //     totalPage = Math.ceil(seasonTeamPlayersResponse.total / DEFAULT_PAGINATION);
// //     console.log("Season Team Players: ", seasonTeamPlayers);
// //   } catch (error) {
// //     console.error(`获取球队球员数据失败，Team ID: ${teamid}, Error:`, error);
// //     return <Custom404 />;
// //   }

// //   // 4. 获取球队赛季数据
// //   let teamSeasonData;
// //   try {
// //     const teamRankUrl = `/basketball/teamrank?teamid=${teamid}`;
// //     console.log("请求球队赛季数据的 URL: ", teamRankUrl);

// //     const teamRankResponse = await asyncFetch(teamRankUrl);
// //     teamSeasonData = teamRankResponse?.data || [];
// //     console.log("Team Season Data: ", teamSeasonData);
// //   } catch (error) {
// //     console.error(`获取球队赛季数据失败，Team ID: ${teamid}, Error:`, error);
// //     return <Custom404 />;
// //   }

// //   const handlePageChange = (newPage: number): void => {
// //     const currentParams = new URLSearchParams(searchParams?.toString());
// //     currentParams.set("page", newPage.toString());
// //     router.push(`${pathName}?${currentParams.toString()}`);
// //   };

// //   return (
// //     <div className="container">
// //       <div className="flex flex-wrap">
// //         {/* 左侧：返回队伍列表的链接 */}
// //         <div className="w-full md:w-3/12">
// //           <div className="bg-gray-100 p-4 rounded shadow">
// //             <Link href={`/basketball/${competition}/teams`} legacyBehavior>
// //               <a className="block text-center text-blue-600 font-bold mb-4">
// //                 返回队伍列表
// //               </a>
// //             </Link>

// //             {/* 球员列表 */}
// //             <div
// //               className="bg-gray-100 p-4 rounded shadow mt-4"
// //               style={{ maxHeight: "500px", overflowY: "scroll" }}
// //             >
// //               <div className="flex flex-col justify-start">
// //                 {seasonTeamPlayers.map((seasonPlayer: any) => {
// //                   if (!seasonPlayer.player) {
// //                     return null;
// //                   }
// //                   return (
// //                     <div
// //                       key={seasonPlayer.player.id}
// //                       className="relative w-full p-2 bg-white shadow-lg rounded-lg m-2"
// //                     >
// //                       <Link
// //                         href={`/basketball/${competition}/players/${seasonPlayer.player.id}`}
// //                         legacyBehavior
// //                       >
// //                         <a className="block">
// //                           <PlayerCard
// //                             player={seasonPlayer.player}
// //                             params={params}
// //                           />
// //                         </a>
// //                       </Link>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* 右侧：展示球队的详细信息 */}
// //         <div className="w-full md:w-9/12 pl-4">
// //           <div className="bg-gray-100 p-4 rounded shadow">
// //             {teamInfo ? (
// //               <>
// //                 {/* 显示球队头像 */}
// //                 <div className="text-center">
// //                   {teamInfo.logosrc && (
// //                     <img
// //                       src={teamInfo.logosrc}
// //                       alt={`${teamInfo.name} Logo`}
// //                       className="mx-auto mb-4 h-24"
// //                     />
// //                   )}
// //                   <h2 className="text-2xl font-bold">{teamInfo.name}</h2>
// //                   <p className="text-gray-600">{teamInfo.description}</p>
// //                 </div>

// //                 {/* 显示赛季名称 */}
// //                 <div className="text-center mt-4">
// //                   <h3 className="text-xl font-bold text-green-600">
// //                     当前赛季: {season.name}
// //                   </h3>
// //                 </div>

// //                 {/* 队长信息部分 */}
// //                 <div className="bg-white p-4 rounded-lg shadow mt-4">
// //                   <div className="flex items-center space-x-1">
// //                     <span>队长:</span>
// //                     <span>{teamInfo.captain}</span>
// //                   </div>
// //                   <p>
// //                     邮箱:{" "}
// //                     <a
// //                       href={`mailto:${teamInfo.email}`}
// //                       className="text-blue-600 underline"
// //                     >
// //                       {teamInfo.email}
// //                     </a>
// //                   </p>
// //                   <p>电话: {teamInfo.tel}</p>
// //                   <p>微信: {teamInfo.wechat}</p>
// //                 </div>

// //                 {/* 显示球队赛季数据 */}
// //                 <div className="bg-gray-100 p-4 rounded shadow mt-4">
// //                   <h2 className="text-lg font-bold mb-2">球队赛季数据</h2>
// //                   {teamSeasonData.length > 0 ? (
// //                     teamSeasonData.map((seasonData: any) => (
// //                       <div
// //                         key={seasonData.id}
// //                         className="p-2 mb-2 bg-white rounded shadow-md"
// //                       >
// //                         <p>胜场: {seasonData.win}</p>
// //                         <p>负场: {seasonData.lose}</p>
// //                         <p>总得分: {seasonData.total_score}</p>
// //                         <p>对手得分: {seasonData.oppo_score}</p>
// //                         <p>得分差: {seasonData.score_diff}</p>
// //                       </div>
// //                     ))
// //                   ) : (
// //                     <p>暂无球队赛季数据。</p>
// //                   )}
// //                 </div>
// //               </>
// //             ) : (
// //               <p>未能加载球队详细信息。</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// import Custom404 from "@/components/404";
// import { asyncFetch } from "@/utils/fetch";
// import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
// import TeamInformation from "@/components/basketball/teams/TeamInformation";
// import TeamImage from "@/components/basketball/teams/TeamImage";
// import PlayerCard from "@/components/basketball/players/PlayerCard";
// import { Pagination } from "@nextui-org/react";
// import Link from "next/link"; // Use the correct Link import
// import { useRouter } from "next/navigation"; // Use router for page navigation (client component)
// import { useState, useEffect } from "react";

// export default async function Page({ params, searchParams }: any) {
//   const { competition, teamid } = params;
//   const page = parseInt(searchParams?.page || "1", 10);
//   const DEFAULT_PAGINATION = 20;

//   // 1. 获取当前赛季数据
//   const season = await getRecentSeasonByGroup(competition);
//   if (!season) {
//     console.error("未找到赛季，Competition: ", competition);
//     return <Custom404 />;
//   }

//   console.log("获取的赛季信息: ", season);
//   console.log("Team ID: ", teamid);

//   // 2. 获取球队详细信息
//   let teamResponse;
//   try {
//     const teamUrl = `/basketball/seasonteam?seasonid=${season.id}&teamid=${teamid}`;
//     console.log("请求球队信息的 URL: ", teamUrl);

//     teamResponse = await asyncFetch(teamUrl);
//     console.log("Team Response: ", teamResponse);

//     // 验证返回的响应是否有效
//     if (!teamResponse || !teamResponse.data || teamResponse.data.length === 0) {
//       console.error(`未找到球队数据，Team ID: ${teamid}`);
//       return <Custom404 />;
//     }
//   } catch (error) {
//     console.error(`获取球队信息失败，Team ID: ${teamid}, Error:`, error);
//     return <Custom404 />;
//   }

//   const teamInfo = teamResponse.data[0].team; // 确保从正确的字段提取数据

//   // 3. 获取球队的球员列表
//   let seasonTeamPlayers;
//   let totalPage;
//   try {
//     const playersUrl = `/basketball/seasonteamplayer?seasonid=${
//       season.id
//     }&teamid=${teamid}&$limit=${DEFAULT_PAGINATION}&$skip=${
//       DEFAULT_PAGINATION * (page - 1)
//     }`;
//     console.log("请求球员列表的 URL: ", playersUrl);

//     const seasonTeamPlayersResponse = await asyncFetch(playersUrl);
//     seasonTeamPlayers = seasonTeamPlayersResponse?.data || [];
//     totalPage = Math.ceil(seasonTeamPlayersResponse.total / DEFAULT_PAGINATION);
//     console.log("Season Team Players: ", seasonTeamPlayers);
//   } catch (error) {
//     console.error(`获取球队球员数据失败，Team ID: ${teamid}, Error:`, error);
//     return <Custom404 />;
//   }

//   // 4. 获取球队赛季数据
//   let teamSeasonData;
//   try {
//     const teamRankUrl = `/basketball/teamrank?teamid=${teamid}`;
//     console.log("请求球队赛季数据的 URL: ", teamRankUrl);

//     const teamRankResponse = await asyncFetch(teamRankUrl);
//     teamSeasonData = teamRankResponse?.data || [];
//     console.log("Team Season Data: ", teamSeasonData);
//   } catch (error) {
//     console.error(`获取球队赛季数据失败，Team ID: ${teamid}, Error:`, error);
//     return <Custom404 />;
//   }

//   const handlePageChange = (newPage: number): void => {
//     const currentParams = new URLSearchParams(searchParams?.toString());
//     currentParams.set("page", newPage.toString());
//     router.push(`${pathName}?${currentParams.toString()}`);
//   };

//   return (
//     <div className="container">
//       <div className="flex flex-wrap">
//         {/* 左侧：返回队伍列表的链接 */}
//         <div className="w-full md:w-3/12">
//           <div className="bg-gray-100 p-4 rounded shadow">
//             {/* 修改后的返回按钮 */}
//             <Link href={`/basketball/${competition}/teams`} legacyBehavior>
//               <a className="block text-center text-blue-600 font-bold mb-4">
//                 返回该赛季队伍列表
//               </a>
//             </Link>

//             {/* 队名 + 队员列表 标题 */}
//             <div className="text-xl font-bold text-center mb-4">
//               {teamInfo.name} 队员列表
//             </div>

//             {/* 球员列表 */}
//             <div
//               className="bg-gray-100 p-4 rounded shadow mt-4"
//               style={{ maxHeight: "500px", overflowY: "scroll" }}
//             >
//               <div className="flex flex-col justify-start">
//                 {seasonTeamPlayers.map((seasonPlayer: any) => {
//                   if (!seasonPlayer.player) {
//                     return null;
//                   }
//                   return (
//                     <div
//                       key={seasonPlayer.player.id}
//                       className="relative w-full p-2 bg-white shadow-lg rounded-lg m-2"
//                     >
//                       <Link
//                         href={`/basketball/${competition}/players/${seasonPlayer.player.id}`}
//                         legacyBehavior
//                       >
//                         <a className="block">
//                           <PlayerCard
//                             player={seasonPlayer.player}
//                             params={params}
//                           />
//                         </a>
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 右侧：展示球队的详细信息 */}
//         <div className="w-full md:w-9/12 pl-4">
//           <div className="bg-gray-100 p-4 rounded shadow">
//             {teamInfo ? (
//               <>
//                 {/* 显示球队头像 */}
//                 <div className="text-center">
//                   {teamInfo.logosrc && (
//                     <img
//                       src={teamInfo.logosrc}
//                       alt={`${teamInfo.name} Logo`}
//                       className="mx-auto mb-4 h-24"
//                     />
//                   )}
//                   <h2 className="text-2xl font-bold">{teamInfo.name}</h2>
//                   <p className="text-gray-600">{teamInfo.description}</p>
//                 </div>

//                 {/* 显示赛季名称 */}
//                 <div className="text-center mt-4">
//                   <h3 className="text-xl font-bold text-green-600">
//                     当前赛季: {season.name}
//                   </h3>
//                 </div>

//                 {/* 队长信息部分 */}
//                 <div className="bg-white p-4 rounded-lg shadow mt-4">
//                   <div className="flex items-center space-x-1">
//                     <span>队长:</span>
//                     <span>{teamInfo.captain}</span>
//                   </div>
//                   <p>
//                     邮箱:{" "}
//                     <a
//                       href={`mailto:${teamInfo.email}`}
//                       className="text-blue-600 underline"
//                     >
//                       {teamInfo.email}
//                     </a>
//                   </p>
//                   <p>电话: {teamInfo.tel}</p>
//                   <p>微信: {teamInfo.wechat}</p>
//                 </div>

//                 {/* 显示球队赛季数据 */}
//                 <div className="bg-gray-100 p-4 rounded shadow mt-4">
//                   <h2 className="text-lg font-bold mb-2">球队赛季数据</h2>
//                   {teamSeasonData.length > 0 ? (
//                     teamSeasonData.map((seasonData: any) => (
//                       <div
//                         key={seasonData.id}
//                         className="p-2 mb-2 bg-white rounded shadow-md"
//                       >
//                         <p>胜场: {seasonData.win}</p>
//                         <p>负场: {seasonData.lose}</p>
//                         <p>总得分: {seasonData.total_score}</p>
//                         <p>对手得分: {seasonData.oppo_score}</p>
//                         <p>得分差: {seasonData.score_diff}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p>暂无球队赛季数据。</p>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <p>未能加载球队详细信息。</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import TeamInformation from "@/components/basketball/teams/TeamInformation";
import TeamImage from "@/components/basketball/teams/TeamImage";
import PlayerCard from "@/components/basketball/players/PlayerCard";
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
            <div className="ttext-lg font-bold mb-2 text-center border border-gray-400 p-2 rounded-md">
              {teamInfo.name} 球员列表
            </div>

            {/* 球员列表 */}
            <div
              className="bg-gray-100 p-4 rounded shadow mt-4"
              style={{ maxHeight: "800px", overflowY: "scroll" }}
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
                        legacyBehavior
                      >
                        <a className="block">
                          <PlayerCard
                            player={seasonPlayer.player}
                            params={params}
                          />
                        </a>
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
                {/* 显示球队头像 */}
                <div className="text-center">
                  {teamInfo.logosrc && (
                    <img
                      src={teamInfo.logosrc}
                      alt={`${teamInfo.name} Logo`}
                      className="mx-auto mb-4 h-24"
                    />
                  )}
                  <h2 className="text-2xl font-bold">{teamInfo.name}</h2>
                  <p className="text-gray-600">{teamInfo.description}</p>
                  <p className="text-gray-600 font-bold">赛季: {season.name}</p>
                </div>

                {/* 队长信息部分 */}
                <div className="bg-white p-4 rounded-lg shadow mt-4">
                  <div className="flex items-center space-x-1">
                    <span>队长:</span>
                    <span>{teamInfo.captain}</span>
                  </div>
                  <p>
                    邮箱:{" "}
                    <a
                      href={`mailto:${teamInfo.email}`}
                      className="text-blue-600 underline"
                    >
                      {teamInfo.email}
                    </a>
                  </p>
                  <p>电话: {teamInfo.tel}</p>
                  <p>微信: {teamInfo.wechat}</p>

                  {/* 增加球队编号 */}
                  <p>球队编号: {teamInfo.id}</p>
                </div>

                {/* 显示球队赛季数据 */}
                <div className="bg-gray-100 p-4 rounded shadow mt-4">
                  <h2 className="text-lg font-bold mb-2">球队赛季数据</h2>

                  {/* 表格外部增加滚动容器 */}
                  <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <table className="min-w-full bg-white border-collapse">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b">球员</th>
                          <th className="py-2 px-4 border-b">得分</th>
                          <th className="py-2 px-4 border-b">篮板</th>
                          <th className="py-2 px-4 border-b">助攻</th>
                          <th className="py-2 px-4 border-b">抢断</th>
                          <th className="py-2 px-4 border-b">盖帽</th>
                          <th className="py-2 px-4 border-b">投篮%</th>
                          <th className="py-2 px-4 border-b">三分%</th>{" "}
                          {/* 修正的三分球列 */}
                          <th className="py-2 px-4 border-b">罚球%</th>
                          <th className="py-2 px-4 border-b">犯规</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seasonTeamPlayers.map((player: any) => {
                          const avg = playerSeasonAverages.find(
                            (p: any) => p.playerid === player.player.id
                          );
                          return (
                            <tr key={player.player.id}>
                              <td className="py-2 px-4 border-b">
                                {player.player.name}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.points !== undefined
                                  ? avg.points.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.rebound !== undefined
                                  ? avg.rebound.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.assist !== undefined
                                  ? avg.assist.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.steal !== undefined
                                  ? avg.steal.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.block !== undefined
                                  ? avg.block.toFixed(1)
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.fgp !== undefined
                                  ? `${(avg.fgp * 100).toFixed(1)}%`
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
                                {avg?.["3gp"] !== undefined
                                  ? `${(avg["3gp"] * 100).toFixed(1)}%`
                                  : "N/A"}
                              </td>{" "}
                              {/* 修正三分球字段 */}
                              <td className="py-2 px-4 border-b">
                                {avg?.ftp !== undefined
                                  ? `${(avg.ftp * 100).toFixed(1)}%`
                                  : "N/A"}
                              </td>
                              <td className="py-2 px-4 border-b">
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
