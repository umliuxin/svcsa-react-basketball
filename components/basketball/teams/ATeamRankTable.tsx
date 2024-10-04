"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface ATeamRankTableProps {
  teamRank: any[];
}

const ATeamRankTable: React.FC<ATeamRankTableProps> = ({ teamRank }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2 border-l-4 border-lime-600 ps-2">
        球队赛季表现
      </h2>
      {teamRank.length > 0 ? (
        <Table
          aria-label="球队赛季表现"
          className="min-w-full bg-white rounded-xl"
        >
          <TableHeader>
            <TableColumn className="text-white bg-lime-600 text-center">
              球队
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              积分
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              胜
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              负
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              弃权
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              得分
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              失分
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              净胜分
            </TableColumn>
          </TableHeader>
          <TableBody>
            {teamRank.map((team) => (
              <TableRow key={team.teamid}>
                <TableCell className="text-center">{team.team?.name}</TableCell>
                <TableCell className="text-center">{team.point}</TableCell>
                <TableCell className="text-center">{team.win}</TableCell>
                <TableCell className="text-center">{team.lose}</TableCell>
                <TableCell className="text-center">{team.forfeit}</TableCell>
                <TableCell className="text-center">
                  {team.total_score}
                </TableCell>
                <TableCell className="text-center">{team.oppo_score}</TableCell>
                <TableCell className="text-center">{team.score_diff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>当前没有球队排名数据。</p>
      )}
    </div>
  );
};

export default ATeamRankTable;
