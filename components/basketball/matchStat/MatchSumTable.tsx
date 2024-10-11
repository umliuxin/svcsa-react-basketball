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
import CustomLink from "@/components/shared/links";
import type { CompetitionGroup } from "@/utils/variables";

interface MatchSumTableProps {
  sections: number;
  teamA: BbTeam;
  teamB: BbTeam;
  teamAscores: number[];
  teamBscores: number[];
  competition: CompetitionGroup;
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
  teamA,
  teamB,
  teamAscores,
  teamBscores,
  competition,
}) => {
  const { columns, dataTeamA, dataTeamB } = formatStatsDataForTable(
    sections,
    teamA.name,
    teamB.name,
    teamAscores,
    teamBscores
  );
  return (
    <div className="py-5 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Quarter by quarter
      </h2>

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
                {idx === 0 ? (
                  <CustomLink
                    type="teams"
                    id={teamA.id}
                    competition={competition}
                  >
                    {teamA.name}
                  </CustomLink>
                ) : (
                  cell
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            {dataTeamB.map((cell, idx) => (
              <TableCell
                key={`teamB_${idx}`}
                className="p-2 border border-gray-300 text-center"
              >
                {idx === 0 ? (
                  <CustomLink
                    type="teams"
                    id={teamB.id}
                    competition={competition}
                  >
                    {teamB.name}
                  </CustomLink>
                ) : (
                  cell
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchSumTable;
