import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";
import TeamInformation from "@/components/basketball/teams/TeamInformation";
import PlayersList from "@/components/basketball/players/PlayersList";
import TeamImage from "@/components/basketball/teams/TeamImage";

export default async function Page({ params }: any) {
  const { competition, teamid } = params;

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

    // 验证返回的响应是否有效
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
  try {
    const playersUrl = `/basketball/seasonteamplayer?seasonid=${season.id}&teamid=${teamid}&$limit=20`;
    console.log("请求球员列表的 URL: ", playersUrl);

    const seasonTeamPlayersResponse = await asyncFetch(playersUrl);
    seasonTeamPlayers = seasonTeamPlayersResponse?.data || [];
    console.log("Season Team Players: ", seasonTeamPlayers);
  } catch (error) {
    console.error(`获取球队球员数据失败，Team ID: ${teamid}, Error:`, error);
    return <Custom404 />;
  }

  return (
    <div className="container">
      <div className="flex flex-wrap">
        {/* 左侧：展示球队信息和球员列表 */}
        <div className="w-full md:w-3/12">
          <div className="bg-gray-100 p-4 rounded shadow">
            <div className="flex gap-2 items-center">
              <TeamImage
                imageClass="w-16 h-16 bg-slate-100"
                team={teamInfo}
                textClass="text-center font-medium text-xl font-thin text-zinc-800"
              />
              <div className="text-xl font-bold mb-2">{teamInfo.name}</div>
            </div>
            <PlayersList seasonTeamPlayers={seasonTeamPlayers} />
          </div>
        </div>

        {/* 右侧：展示球队的详细信息 */}
        <div className="w-full md:w-9/12 pl-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <TeamInformation
              team={teamInfo}
              seasonName={season.name}
              showDetails={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// // // import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// // // import TeamInformation from "@/components/basketball/team/TeamInformation";

// // // const AppRouter = () => (
// // //   <Router>
// // //     <Switch>
// // //       <Route path="/teams/:teamId" component={TeamInformation} />
// // //     </Switch>
// // //   </Router>
// // // );

// // // export default AppRouter;
// // import { useEffect, useState } from "react";
// // import { useParams, useHistory } from "react-router-dom";
// // import { asyncFetch } from "@/utils/fetch";
// // import Custom404 from "@/components/404";
// // import TeamInformation from "@/components/basketball/team/TeamInformation";

// // // const TeamDetails = ({ teamId }) => {
// // //   const { teamId } = useParams();
// // //   const [team, setTeam] = useState(null);
// // //   const history = useHistory(); // 使用 useHistory 钩子
// // //   const location = useLocation(); // 获取location对象，用于访问查询字符串

// // //   useEffect(() => {
// // //     const fetchTeamDetails = async () => {
// // //       const result = await asyncFetch(`/basketball/team/${teamId}`);
// // //       if (result) {
// // //         setTeam(result);
// // //       } else {
// // //         // 如果没有找到队伍
// // //         setTeam(null);
// // //       }
// // //     };

// // //     fetchTeamDetails();
// // //   }, [teamId]);

// // //   if (!team) {
// // //     return <Custom404 />;
// // //   }

// // //   // 返回到teamlist的按钮
// // //   const handleBack = () => {
// // //     history.push("/basketball/teams"); // 这里不是很确定
// // //   };

// // //   // 判断是否显示详细信息
// // //   const showDetails =
// // //     new URLSearchParams(window.location.search).get("showDetails") === "true";

// // //   return (
// // //     <section>
// // //       <h1>{team.name}</h1>
// // //       <p>{team.description}</p>
// // //       <button onClick={handleBack}>返回到队伍列表</button>
// // //       <TeamInformation team={team} showDetails={true} />
// // //     </section>
// // //   );
// // // };

// // // export default TeamDetails;

// // import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// // import TeamDetails from "@/components/basketball/team/TeamDetails";

// // const AppRouter = () => (
// //   <Router>
// //     <Switch>
// //       <Route path="/teams/:teamId" component={TeamDetails} />
// //     </Switch>
// //   </Router>
// // );

// // const TeamPage: React.FC<{ team: any; showDetails: boolean }> = ({ team }) => {
// //   return (
// //     <section>
// //       <TeamHeader team={team} />
// //       <TeamInformation team={team} showDetails={true} />
// //     </section>
// //   );
// // };

// // const TeamHeader: React.FC<{ team: any }> = ({ team }) => {
// //   return (
// //     <div>
// //       <h1>{team.name}</h1>
// //       <img src={team.logoUrl} alt={`${team.name} logo`} />
// //     </div>
// //   );
// // };

// // //Using 'force-static' to force useSearchParams() to return empty values.
// // export const dynamic = "force-static";
// // export default async function Page({ params, searchParams }: any) {
// //   var teamList;
// //   var seasonName;
// //   var showDetails = searchParams.get("details") === "true";
// //   // First check whether the team ID parameter exists.
// //   // If it exists, only obtain and display the information of the team.
// //   if (params.teamId) {
// //     const teamData = await asyncFetch(`/basketball/team/${params.teamId}`);
// //     if (!teamData) {
// //       return <Custom404 />;
// //     }
// //     return <TeamPage team={teamData} showDetails={showDetails} />;
// //   }
// //   if (!searchParams.season) {
// //     // fetch recent season
// //     const season = await getRecentSeasonByGroup(params.competition);
// //     if (!season) {
// //       return <Custom404 />;
// //     }
// //     // fetch team list of the recent season
// //     teamList = await asyncFetch(
// //       `/basketball/seasonteam?seasonid=${season.id}&$limit=1000`
// //     );
// //     seasonName = season.name;
// //   } else {
// //     // Fetch the team list based on the user's requested season ID
// //     teamList = await asyncFetch(
// //       `/basketball/seasonteam?seasonid=${searchParams.season}&$limit=1000`
// //     );
// //     const season = await asyncFetch(
// //       `/basketball/season/${searchParams.season}`
// //     );
// //     seasonName = season.name;
// //   }

// //   var seasons = await asyncFetch(
// //     `/basketball/season?competitionid=${
// //       GROUPNAME_TO_COMPETITIONID[params.competition]
// //     }`
// //   );

// //   return (
// //     <section>
// //       <h1 className="text-center text-2xl mt-8">{seasonName}</h1>
// //       <SeasonSelectMenu seasons={seasons.data} />
// //       <TeamList teams={teamList.data} />
// //     </section>
// //   );
// // }

// // const TeamPage: React.FC<{ team: any; showDetails: boolean }> = ({ team }) => {
// //   return (
// //     <section>
// //       {/* <TeamHeader team={team} /> */}
// //       <TeamInformation team={team} showDetails={true} />
// //     </section>
// //   );
// // };

// // // const TeamHeader: React.FC<{ team: any }> = ({ team }) => {
// // //   return (
// // //     <div>
// // //       <h1>{team.name}</h1>
// // //       <img src={team.logoUrl} alt={`${team.name} logo`} />
// // //     </div>
// // //   );
// // // };

// // import React, { useEffect, useState } from "react";
// // import { useRouter } from "next/router";
// // import { asyncFetch } from "@/utils/fetch";
// // import Custom404 from "@/components/404";
// // import TeamInformation from "@/components/basketball/team/TeamInformation";

// // interface CompetitionData {
// //   id: string;
// //   name: string;
// //   description: string;
// // }

// // const CompetitionPage: React.FC = () => {
// //   const router = useRouter();
// //   const { competition } = router.query;
// //   const [data, setData] = useState<CompetitionData | null>(null);

// //   useEffect(() => {
// //     if (competition) {
// //       async function fetchData() {
// //         try {
// //           const result = await asyncFetch(`/api/competition/${competition}`);
// //           setData(result);
// //         } catch (error) {
// //           console.error("Failed to fetch data", error);
// //           setData(null);
// //         }
// //       }

// //       fetchData();
// //     }
// //   }, [competition]);

// //   if (!data) return <Custom404 />;

// //   return (
// //     <section>
// //       <h1>{data.name}</h1>
// //       <p>{data.description}</p>
// //       {/* Additional components can be rendered here based on fetched data */}
// //     </section>
// //   );
// // };

// // export default CompetitionPage;

// // // Static Generation Helpers for Next.js
// // export async function getStaticPaths() {
// //   const paths = await generateStaticParams();
// //   return {
// //     paths,
// //     fallback: "blocking",
// //   };
// // }

// // export async function getStaticProps({ params }) {
// //   const data = await asyncFetch(`/api/competition/${params.competition}`);
// //   if (!data) {
// //     return {
// //       notFound: true,
// //     };
// //   }
// //   return {
// //     props: {
// //       data,
// //     },
// //     revalidate: 10, // In seconds, optional, for revalidating the pre-rendered data
// //   };
// // }
// // // Assuming Next.js or a similar framework
// // export async function generateStaticParams() {
// //   return [
// //     { params: { competition: "men-open" } },
// //     { params: { competition: "women-open" } },
// //     { params: { competition: "men-senior" } },
// //   ];
// // }

// // page.tsx
// import React, { useEffect, useState } from "react";
// import { useNavigation } from "next/navigation";
// import TeamInformation from "@/components/basketball/team/TeamInformation";
// import Custom404 from "@/components/404";
// import { asyncFetch } from "@/utils/fetch";

// const TeamPage: React.FC = () => {
//   const navigation = useNavigation();
//   const teamId = navigation.query.teamId;
//   const [team, setTeam] = useState(null);
//   const [seasonName, setSeasonName] = useState("");
//   const [otherTeams, setOtherTeams] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const teamDetails = await asyncFetch(`/api/team/${teamId}`);
//         setTeam(teamDetails);
//         const seasonDetails = await asyncFetch(
//           `/api/season/${teamDetails.seasonId}`
//         );
//         setSeasonName(seasonDetails.name);
//         const teams = await asyncFetch(
//           `/api/seasonteam?seasonId=${teamDetails.seasonId}`
//         );
//         setOtherTeams(teams);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     }

//     fetchData();
//   }, [teamId]);

//   if (!team) return <Custom404 />;

//   return (
//     <TeamInformation
//       team={team}
//       seasonName={seasonName}
//       otherTeams={otherTeams}
//     />
//   );
// };

// export default TeamPage;
