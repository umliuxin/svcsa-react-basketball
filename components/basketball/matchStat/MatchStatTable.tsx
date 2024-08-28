import React from 'react';

interface MatchStatTableProps {
    playerStats:BbStat[];
}

const MatchStatTable: React.FC<MatchStatTableProps> = ({playerStats}) => {
    return (
        <div>
            <table className='statTable'>
                <thead>
                    <tr>
                        <th>球员</th>
                        <th>得分</th>
                        <th>两分球</th>
                        <th>三分球</th>
                        <th>罚球</th>
                        <th>前场</th>
                        <th>后场</th>
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
                    {playerStats.map((p, index) => (
                        <tr key={index}>
                            <td>{p.player.name}</td>
                            <td>{p.points}</td>
                            <td>{p['2pointshit']} - {p['2pointsshot']}</td>
                            <td>{p['3pointshit']} - {p['3pointsshot']}</td>
                            <td>{p['1pointshit']} - {p['1pointsshot']}</td>
                            <td>{p.offensiverebound}</td>
                            <td>{p.rebound - p.offensiverebound}</td>
                            <td>{p.rebound}</td>
                            <td>{p.assist}</td>
                            <td>{p.steal}</td>
                            <td>{p.block}</td>
                            <td>{p.turnover? p.turnover : 0}</td>
                            <td>{p.foul}</td>
                            <td>{p.points + p.offensiverebound + p.rebound + p.assist + p.steal + p.block - p.turnover - p['3pointsshot'] - p['2pointsshot'] - p['1pointsshot']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchStatTable