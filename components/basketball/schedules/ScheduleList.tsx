"use client";

import MatchList from "@/components/basketball/matches/MatchList";
import React, { useEffect, useState } from "react";
import { asyncFetch } from "@/utils/fetch";
import ScheduleCard from "@/components/basketball/schedules/ScheduleCard";
import { Pagination } from "@nextui-org/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import EmptyState from "@/components/shared/empty-state";

const DEFAULT_PAGINATION = 25;

interface MatchContentsProps {
  seasonId: number;
}
function formatDateToUS(dateStr: string): string {
  const date = new Date(dateStr);
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ("0" + date.getDate()).slice(-2);
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function groupMatchesByMatchDay(
  matches: BbSeasonMatch[]
): Record<string, BbSeasonMatch[]> {
  if (!matches) return {};
  const matchDayMap: Record<string, BbSeasonMatch[]> = {};

  matches.forEach((match) => {
    const dateStr = formatDateToUS(match.starttime);
    if (matchDayMap.hasOwnProperty(dateStr)) {
      matchDayMap[dateStr].push(match);
    } else {
      matchDayMap[dateStr] = [match];
    }
  });

  return matchDayMap;
}

const ScheduleList: React.FC<MatchContentsProps> = ({ seasonId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [matchDayList, setMatchDayList] = useState<
    Record<string, BbSeasonMatch[]>
  >({});
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPage, setTotalPage] = useState(1);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999); // Set time to 23:59:59.999
  const endOfTodayISO = endOfToday.toISOString();

  useEffect(() => {
    async function fetchMatches() {
      let matchFetchUrl = `/basketball/match?seasonid=${seasonId}&$limit=${DEFAULT_PAGINATION}&starttime[$gte]=${endOfTodayISO}&$sort[starttime]=1`;

      if (page > 1) {
        matchFetchUrl += `&$skip=${DEFAULT_PAGINATION * (page - 1)}`;
      }

      const matchListPromise = asyncFetch(matchFetchUrl);

      // Promise.all is to make sure the non-dependent requests can be fired in parallel
      await matchListPromise.then((matchListData) => {
        const data = groupMatchesByMatchDay(matchListData.data);
        setMatchDayList(data);
        setTotalPage(Math.ceil(matchListData.total / DEFAULT_PAGINATION));
      });
    }
    fetchMatches();
  }, [page, seasonId, endOfTodayISO]);

  const handlePageChange = (newPage: number): void => {
    const currentParams = new URLSearchParams(searchParams?.toString());

    currentParams.set("page", newPage.toString());

    router.push(`${pathName}?${currentParams.toString()}`);
  };

  // Empty State
  if(Object.keys(matchDayList).length === 0) {
    return (
      <EmptyState />
    )
  }

  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full">
          {Object.entries(matchDayList).map(
            ([matchDay, matches]: [string, BbSeasonMatch[]], idx) => (
              <div className="mt-4" key={idx}>
                <h3 className="text-2xl text-center py-6">{matchDay}</h3>
                {matches.map((match, midx) => (
                  <ScheduleCard key={midx} match={match} />
                ))}
              </div>
            )
          )}

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

export default ScheduleList;
