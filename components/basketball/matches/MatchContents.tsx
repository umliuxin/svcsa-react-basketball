"use client";

import MatchList from "@/components/basketball/matches/MatchList";
import React, { useEffect, useState } from "react";
import { asyncFetch } from "@/utils/fetch";
import { TeamSelector } from "@/components/basketball/teams/TeamSelector";
import { BasketballScoreIcon } from "@/components/shared/icons";
import { Pagination } from "@nextui-org/react";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
const DEFAULT_PAGINATION = 25;

interface MatchContentsProps {
  seasonId: number;

}

const MatchContents: React.FC<MatchContentsProps> = ({ seasonId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [matchList, setMatchList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const teamId = parseInt(searchParams?.get("teamid") ?? "", 10);
  const [totalPage, setTotalPage] = useState(1);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
  const endOfTodayISO = endOfToday.toISOString();

  useEffect(() => {
    async function fetchMatches() {
      let matchFetchUrl = `/basketball/match?seasonid=${seasonId}&$limit=${DEFAULT_PAGINATION}&starttime[$lte]=${endOfTodayISO}&$sort[starttime]=-1`;
      let teamFetchUrl = `/basketball/seasonteam?seasonid=${seasonId}&$limit=20`;

      if (page > 1) {
        matchFetchUrl += `&$skip=${DEFAULT_PAGINATION * (page - 1)}`;
      }
      if (teamId) {
        matchFetchUrl += `&$or[0][teamaid]=${teamId}&$or[1][teambid]=${teamId}`;
      }
      const matchListPromise = asyncFetch(matchFetchUrl);
      const teamListPromise = asyncFetch(teamFetchUrl);

      // Promise.all is to make sure the non-dependent requests can be fired in parallel
      await Promise.all([matchListPromise, teamListPromise]).then(
        ([matchListData, teamListData]) => {
          setMatchList(matchListData.data);
          setTeamList(teamListData.data);
          setTotalPage(Math.ceil(matchListData.total / DEFAULT_PAGINATION));
        }
      );
    }
    fetchMatches();
  }, [seasonId, page, teamId, endOfTodayISO]);

  const handlePageChange = (newPage: number): void => {
    const currentParams = new URLSearchParams(searchParams?.toString());

    currentParams.set("page", newPage.toString());

    router.push(`${pathName}?${currentParams.toString()}`);
  };

  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <TeamSelector
            seasonTeams={teamList}
            allBtnText="All Matches"
            allBtnIcon={<BasketballScoreIcon fill="currentColor" size={36} />}
          />
        </div>
        <div className="w-full md:w-9/12 pl-4">
          <MatchList matches={matchList} />
          {totalPage > 1 && (
            <Pagination
              total={totalPage}
              initialPage={page}
              size={"lg"}
              className="flex justify-center"
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchContents;
