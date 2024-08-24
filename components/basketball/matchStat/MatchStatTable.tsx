import React from 'react';

interface PlayerStatProps {
    name: string;
    points: number;
    shot2pt: string;
    shot3pt: string;
    shot1pt: string;
    offensiveRebound: number;
    defensiveRebound: number;
    rebound: number;
    assist: number;
    steal: number;
    block: number;
    turnover: number;
    foul: number;
    effectiveFieldGoal: number;
}

interface MatchStatTableProps {
    teamName: string;
    playerStats:PlayerStatProps[];
    totalStat: PlayerStatProps;
}

const MatchStatTable: React.FC<MatchStatTableProps> = ({ teamName, playerStats, totalStat}) => {

    return (
        <div>
            <h1 className='statTeamTitle'>{teamName}</h1>
            <table className='statTable'>
                <thead>
                    <tr>
                        <th>球员</th>
                        <th>得分</th>
                        <th>两分球</th>
                        <th>三分球</th>
                        <th>罚球</th>
                        <th>进攻篮板</th>
                        <th>防守篮板</th>
                        <th>篮板</th>
                        <th>助攻</th>
                        <th>抢断</th>
                        <th>盖帽</th>
                        <th>失误</th>
                        <th>犯规</th>
                        <th>效率</th>
                    </tr>
                </thead>
                <tbody>
                    {playerStats.map((player, index) => (
                        <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.points}</td>
                            <td>{player.shot2pt}</td>
                            <td>{player.shot3pt}</td>
                            <td>{player.shot1pt}</td>
                            <td>{player.offensiveRebound}</td>
                            <td>{player.defensiveRebound}</td>
                            <td>{player.rebound}</td>
                            <td>{player.assist}</td>
                            <td>{player.steal}</td>
                            <td>{player.block}</td>
                            <td>{player.turnover}</td>
                            <td>{player.foul}</td>
                            <td>{player.effectiveFieldGoal}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>球队</td>
                        <td>{totalStat.points}</td>
                        <td>{totalStat.shot2pt}</td>
                        <td>{totalStat.shot3pt}</td>
                        <td>{totalStat.shot1pt}</td>
                        <td>{totalStat.offensiveRebound}</td>
                        <td>{totalStat.defensiveRebound}</td>
                        <td>{totalStat.rebound}</td>
                        <td>{totalStat.assist}</td>
                        <td>{totalStat.steal}</td>
                        <td>{totalStat.block}</td>
                        <td>{totalStat.turnover}</td>
                        <td>{totalStat.foul}</td>
                        <td>{totalStat.effectiveFieldGoal}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default MatchStatTable