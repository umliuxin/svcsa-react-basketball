import React from "react";
import { formatDate } from "@/utils/formatDateTime";
import MatchCard from "@/components/basketball/matches/MatchCard";

// Define props interface
interface MatchListProps {
  matches: BbSeasonMatch[];
  withLink: boolean;
}

const getMatchByDate = (
  matches: BbSeasonMatch[]
): Record<string, BbSeasonMatch[]> => {
  const matchMap: Record<string, BbSeasonMatch[]> = {};

  matches.forEach((match) => {
    const date = formatDate(match.starttime);
    matchMap[date] ? matchMap[date].push(match) : (matchMap[date] = [match]);
  });

  return matchMap;
};

const MatchList: React.FC<MatchListProps> = ({ matches, withLink }) => {
  const groupedMatches = getMatchByDate(matches);

  return (
    <div>
      {Object.entries(groupedMatches).map(([date, matches]) => {
        return (
          <div key={date}>
            <h3 className="items-center text-xl mt-5 mb-3">{date}</h3>
            {matches
              .sort((a, b) => a.groupid - b.groupid)
              .map((match) => (
                <MatchCard key={match.id} match={match} withLink={withLink} />
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default MatchList;
