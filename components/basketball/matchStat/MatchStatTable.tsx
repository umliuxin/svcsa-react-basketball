import React from 'react';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';


interface MatchStatTableProps {
    playerStats:BbStat[];
}

const MatchStatTable: React.FC<MatchStatTableProps> = ({playerStats}) => {
    return (
        <div className="overflow-x-auto">
          <Table aria-label="Basketball player statistics" className="w-full border-collapse">
            <TableHeader>
              <TableColumn className="p-2 border border-gray-300 text-left w-[150px]">球员</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">得分</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">两分球</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">三分球</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">罚球</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">前场</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">后场</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">篮板</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">助攻</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">抢断</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">盖帽</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">失误</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">犯规</TableColumn>
              <TableColumn className="p-2 border border-gray-300 text-center w-[50px]">效率</TableColumn>
            </TableHeader>
            <TableBody>
              {playerStats.map((p, index) => (
                <TableRow key={index} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                >
                  <TableCell className={`p-2 border border-gray-300 text-left ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.player.name}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.points}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>
                    {p['2pointshit']} - {p['2pointsshot']}
                  </TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>
                    {p['3pointshit']} - {p['3pointsshot']}
                  </TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>
                    {p['1pointshit']} - {p['1pointsshot']}
                  </TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.offensiverebound}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.rebound - p.offensiverebound}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.rebound}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.assist}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.steal}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.block}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.turnover || 0}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>{p.foul}</TableCell>
                  <TableCell className={`p-2 border border-gray-300 text-center ${index === playerStats.length - 1 ? 'font-bold' : ''}`}>
                    {p.points +
                      p.offensiverebound +
                      p.rebound +
                      p.assist +
                      p.steal +
                      p.block -
                      p.turnover -
                      p['3pointsshot'] -
                      p['2pointsshot'] -
                      p['1pointsshot']}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    );
}

export default MatchStatTable