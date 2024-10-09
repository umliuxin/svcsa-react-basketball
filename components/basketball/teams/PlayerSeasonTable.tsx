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
import Link from "next/link";

interface PlayerSeasonTableProps {
  playerSeasonAverages: any[];
  competition: string;
}

const PlayerSeasonTable: React.FC<PlayerSeasonTableProps> = ({
  playerSeasonAverages = [], // Ensure it's initialized
  competition,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2 border-l-4 border-lime-600 ps-2">
        球队队员赛季数据
      </h2>

      {/* Table container with fixed header and scrollable body */}
      <div style={{ maxHeight: "150px", overflowY: "auto" }}>
        <Table
          aria-label="球队队员赛季数据"
          selectionMode="single"
          className="min-w-full bg-white rounded-xl"
        >
          <TableHeader>
            <TableColumn className="text-white bg-lime-600 text-center">
              球员
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              得分
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              篮板
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              助攻
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              抢断
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              盖帽
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              投篮%
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              三分%
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              罚球%
            </TableColumn>
            <TableColumn className="text-white bg-lime-600 text-center">
              犯规
            </TableColumn>
          </TableHeader>
          <TableBody>
            {playerSeasonAverages.length > 0 ? (
              playerSeasonAverages.map((avg: any) => {
                const player: BbPlayer = avg.player;
                return (
                  <TableRow key={player.id}>
                    <TableCell className="text-center">
                      <Link
                        href={`/basketball/${competition}/players/${player.id}`}
                        className="text-blue-600"
                      >
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.points !== undefined
                        ? avg.points.toFixed(1)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.rebound !== undefined
                        ? avg.rebound.toFixed(1)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.assist !== undefined
                        ? avg.assist.toFixed(1)
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.steal !== undefined ? avg.steal.toFixed(1) : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.block !== undefined ? avg.block.toFixed(1) : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.fgp !== undefined
                        ? `${(avg.fgp * 100).toFixed(1)}%`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.["3gp"] !== undefined
                        ? `${(avg["3gp"] * 100).toFixed(1)}%`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.ftp !== undefined
                        ? `${(avg.ftp * 100).toFixed(1)}%`
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {avg?.foul !== undefined ? avg.foul.toFixed(1) : "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4">
                  没有球员数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PlayerSeasonTable;
