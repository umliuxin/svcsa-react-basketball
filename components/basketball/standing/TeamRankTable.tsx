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

// Define props interface
interface TeamRankTableProps {
  teamRank: BbTeamrank[];
}

// Define component
const TeamRankTable: React.FC<TeamRankTableProps> = ({ teamRank }) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn className="text-white bg-lime-600">排名</TableColumn>
        <TableColumn className="text-white bg-lime-600">球队</TableColumn>
        <TableColumn className="text-white bg-lime-600">积分</TableColumn>
        <TableColumn className="text-white bg-lime-600">胜</TableColumn>
        <TableColumn className="text-white bg-lime-600">负</TableColumn>
        <TableColumn className="text-white bg-lime-600">弃权</TableColumn>
        <TableColumn className="text-white bg-lime-600">得分</TableColumn>
        <TableColumn className="text-white bg-lime-600">失分</TableColumn>
        <TableColumn className="text-white bg-lime-600">净胜分</TableColumn>
      </TableHeader>
      <TableBody>
        {teamRank.map((row, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.team?.name}</TableCell>
              <TableCell>{row.point}</TableCell>
              <TableCell>{row.win}</TableCell>
              <TableCell>{row.lose}</TableCell>
              <TableCell>{row.forfeit}</TableCell>
              <TableCell>{row.total_score}</TableCell>
              <TableCell>{row.oppo_score}</TableCell>
              <TableCell>{row.score_diff}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TeamRankTable;
