"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableColumn,
} from "@nextui-org/react";
import React from "react";

interface MatchSumTableProps {
  sections: number;
  teamAname: string;
  teamBname: string;
  teamAscores: number[];
  teamBscores: number[];
}

function formatStatsDataForTable(
  sections: number,
  teamAname: string,
  teamBname: string,
  teamAscores: number[],
  teamBscores: number[]
) {
  const columns = ["队名", "第一节", "第二节", "第三节", "第四节"];
  const dataTeamA = [teamAname, ...teamAscores.slice(0, 4)];
  const dataTeamB = [teamBname, ...teamBscores.slice(0, 4)];
  if (sections >= 4) {
    columns.push("第一加时");
    dataTeamA.push(teamAscores[4]);
    dataTeamB.push(teamBscores[4]);
  }
  if (sections >= 5) {
    columns.push("第二加时");
    dataTeamA.push(teamAscores[5]);
    dataTeamB.push(teamBscores[5]);
  }
  columns.push("总分");
  dataTeamA.push(teamAscores.reduce((acc, score) => acc + score, 0));
  dataTeamB.push(teamBscores.reduce((acc, score) => acc + score, 0));

  return {
    columns,
    dataTeamA,
    dataTeamB,
  };
}

const MatchSumTable: React.FC<MatchSumTableProps> = ({
  sections,
  teamAname,
  teamBname,
  teamAscores,
  teamBscores,
}) => {
  const { columns, dataTeamA, dataTeamB } = formatStatsDataForTable(
    sections,
    teamAname,
    teamBname,
    teamAscores,
    teamBscores
  );
  return (
    <div className="p-5 bg-gray-50 rounded-lg overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-800 mt-10 mb-2">Summary</h1>

      <Table className="w-full border-collapse">
        <TableHeader>
          {columns.map((col) => (
            <TableColumn
              key={col}
              className="p-2 border border-gray-300 text-center"
            >
              {col}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            {dataTeamA.map((cell, idx) => (
              <TableCell
                key={`teamA_${idx}`}
                className="p-2 border border-gray-300 text-center"
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {dataTeamB.map((cell, idx) => (
              <TableCell
                key={`teamA_${idx}`}
                className="p-2 border border-gray-300 text-center"
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchSumTable;
