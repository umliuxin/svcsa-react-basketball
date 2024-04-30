import React from "react";
import { formatDateTime } from "@/utils/formatDateTime";

// Define props interface
interface MatchListProps {
  matches: BbSeasonMatch[];
}

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <div className="match-table-container">
        <table className="match-list-table">
          <thead>
            <tr>
              <th>比赛轮次</th>
              <th>比赛时间</th>
              <th>场地</th>
              <th>对阵</th>
              <th>比分</th>
              <th>技术统计</th>
            </tr>
          </thead>
          <tbody>
          {matches.map((match, index) => (
            <tr key={index}>
              <td>{/* round???? in PHP, match.round, 0 常规赛, 1+ 季后赛第x轮. */} </td>
              <td>{formatDateTime(match.starttime)}</td>
              <td>{match.court}</td>
              <td>{match.teama.shortname} vs. {match.teamb.shortname}</td>
              <td>{match.scoreteama} : {match.scoreteamb}</td>
              <td>技术统计</td>
            </tr>
          ))}
          </tbody>
        </table>
    </div>
  );
};
export default MatchList;