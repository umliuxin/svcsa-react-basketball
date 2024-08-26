"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

interface PlayerSeasonAverageProp {
  playerSeasonAverage: BbPlayerSeasonAverage;
}

const PlayerSeasonAverage: React.FC<PlayerSeasonAverageProp> = ({
  playerSeasonAverage,
}) => {
  if (!playerSeasonAverage) return;
  return (
    <Table aria-label="statistic table">
      <TableHeader>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">得分</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">篮板</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">助攻</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">抢断</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">盖帽</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">投篮</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">3分</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">罚球</TableColumn>
        <TableColumn className="bg-lime-600 text-sm text-white text-center">犯规</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="row1">
          <TableCell className="text-center">{playerSeasonAverage.points.toFixed(1)}</TableCell>
          <TableCell className="text-center">{playerSeasonAverage.rebound.toFixed(1)}</TableCell>
          <TableCell className="text-center">{playerSeasonAverage.assist.toFixed(1)}</TableCell>
          <TableCell className="text-center">{playerSeasonAverage.steal.toFixed(1)}</TableCell>
          <TableCell className="text-center">{playerSeasonAverage.block.toFixed(1)}</TableCell>
          <TableCell className="text-center">{(playerSeasonAverage.fgp * 100).toFixed(1)}%</TableCell>
          <TableCell className="text-center">{(playerSeasonAverage["3gp"] * 100).toFixed(1)}%</TableCell>
          <TableCell className="text-center">
            {playerSeasonAverage.ftp === null ? 0 : (playerSeasonAverage.ftp * 100).toFixed(1)}%
          </TableCell>
          <TableCell className="text-center">{playerSeasonAverage.foul.toFixed(1)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default PlayerSeasonAverage;
