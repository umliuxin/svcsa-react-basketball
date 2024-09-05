import React from 'react';
import { formatDateTime } from '@/utils/formatDateTime';

// Define props interface
interface MatchListProps {
  matches: BbSeasonMatch[];
  timeOption?: string;
  teamOption?: string;
}

const competitionMapping: { [key: number]: string } = {
  1: 'men-open',
  2: 'women-open',
  4: 'men-senior',
  // Add more mappings as needed
};

const getCompetitionName = (id: number) => {
  return competitionMapping[id] || 'unknown-competition';
};

const MatchList: React.FC<MatchListProps> = ({
  matches,
  timeOption,
  teamOption,
}) => {
  const filterMatches = (
    matches: any[],
    timeOption: string = 'all',
    teamOption: string = 'all'
  ) => {
    // Get the current date
    const currentDate = new Date();

    switch (timeOption) {
      case 'week':
        // Calculate the date 1 week ago
        const oneWeekAgo = new Date(
          currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
        );
        // Filter matches within 1 week
        return matches.filter(
          (match) =>
            new Date(match.starttime) >= oneWeekAgo &&
            (teamOption === 'all' ||
              match.teama.id.toString() === teamOption ||
              match.teamb.id.toString() === teamOption)
        );
      case 'month':
        // Calculate the date 1 month ago
        const oneMonthAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        // Filter matches within 1 month
        return matches.filter(
          (match) =>
            new Date(match.starttime) >= oneMonthAgo &&
            (teamOption === 'all' ||
              match.teama.id.toString() === teamOption ||
              match.teamb.id.toString() === teamOption)
        );
      case '3months':
        // Calculate the date 3 months ago
        const threeMonthsAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 3,
          currentDate.getDate()
        );
        // Filter matches within 3 months
        return matches.filter(
          (match) =>
            new Date(match.starttime) >= threeMonthsAgo &&
            (teamOption === 'all' ||
              match.teama.id.toString() === teamOption ||
              match.teamb.id.toString() === teamOption)
        );
      case 'all':
      default:
        // Return all matches
        return matches.filter(
          (match) =>
            teamOption === 'all' ||
            match.teama.id.toString() === teamOption ||
            match.teamb.id.toString() === teamOption
        );
    }
  };

  const filteredMatches = filterMatches(matches, timeOption, teamOption);

  const sortedMatches = filteredMatches.sort((a, b) => {
    // Convert starttime strings to Date objects for comparison
    const dateA = new Date(a.starttime);
    const dateB = new Date(b.starttime);

    // Compare the dates
    return dateB.getTime() - dateA.getTime();
  });

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
          {sortedMatches.map((match, index) => (
            <tr key={index}>
              <td>
                {match.round === 0 ? '常规赛' : `季后赛第 ${match.round} 轮`}
              </td>
              <td>{formatDateTime(match.starttime)}</td>
              <td>{match.court}</td>
              <td>
                {match.teama.shortname} vs. {match.teamb.shortname}
              </td>
              <td>
                {match.state === 0
                  ? '未开赛'
                  : match.state === 1
                  ? `${match.scoreteama} : ${match.scoreteamb}`
                  : '弃权'}
              </td>
              <td>
                {match.state === 0 ? (
                  '未开赛'
                ) : match.state === 1 ? (
                  <a href={`/basketball/${getCompetitionName(match.season.competitionid)}/matches/${match.id}`}>技术统计</a>
                ) : (
                  '无'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchList;
