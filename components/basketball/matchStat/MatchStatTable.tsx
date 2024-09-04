import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';


interface MatchStatTableProps {
    playerStats:BbStat[];
}

const MatchStatTable: React.FC<MatchStatTableProps> = ({playerStats}) => {
    return (
        <Table aria-label="Player statistics table">
          <TableHeader>
            <TableColumn>球员</TableColumn>
            <TableColumn>得分</TableColumn>
            <TableColumn>两分球</TableColumn>
            <TableColumn>三分球</TableColumn>
            <TableColumn>罚球</TableColumn>
            <TableColumn>前场</TableColumn>
            <TableColumn>后场</TableColumn>
            <TableColumn>篮板</TableColumn>
            <TableColumn>助攻</TableColumn>
            <TableColumn>抢断</TableColumn>
            <TableColumn>盖帽</TableColumn>
            <TableColumn>失误</TableColumn>
            <TableColumn>犯规</TableColumn>
            <TableColumn>效率</TableColumn>
          </TableHeader>
          <TableBody>
            {playerStats.map((p, index) => (
              <TableRow key={index}>
                <TableCell>{p.player.name}</TableCell>
                <TableCell>{p.points}</TableCell>
                <TableCell>{p['2pointshit']} - {p['2pointsshot']}</TableCell>
                <TableCell>{p['3pointshit']} - {p['3pointsshot']}</TableCell>
                <TableCell>{p['1pointshit']} - {p['1pointsshot']}</TableCell>
                <TableCell>{p.offensiverebound}</TableCell>
                <TableCell>{p.rebound - p.offensiverebound}</TableCell>
                <TableCell>{p.rebound}</TableCell>
                <TableCell>{p.assist}</TableCell>
                <TableCell>{p.steal}</TableCell>
                <TableCell>{p.block}</TableCell>
                <TableCell>{p.turnover || 0}</TableCell>
                <TableCell>{p.foul}</TableCell>
                <TableCell>
                  {p.points + p.offensiverebound + p.rebound + p.assist + p.steal + p.block - p.turnover - p['3pointsshot'] - p['2pointsshot'] - p['1pointsshot']}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}

export default MatchStatTable