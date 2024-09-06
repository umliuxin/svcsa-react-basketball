"use client";

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@nextui-org/react';
import React from 'react';

interface MatchSumTableProps {
    sections: number;
    teamAname: string;
    teamBname: string;
    teamAscores: number[];
    teamBscores: number[];
}

const MatchSumTable: React.FC<MatchSumTableProps> = ({sections,teamAname, teamBname, teamAscores, teamBscores}) => {
    return (
        <div className="p-5 bg-gray-50 rounded-lg overflow-x-auto">
          <h1 className="text-2xl font-bold text-gray-800 mt-10 mb-2">Summary</h1>
          <Table className="w-full border-collapse">
            <TableHeader>
              <TableCell className="p-2 border border-gray-300 text-center">队名</TableCell>
              <TableCell className="p-2 border border-gray-300 text-center">第一节</TableCell>
              <TableCell className="p-2 border border-gray-300 text-center">第二节</TableCell>
              <TableCell className="p-2 border border-gray-300 text-center">第三节</TableCell>
              <TableCell className="p-2 border border-gray-300 text-center">第四节</TableCell>
              {sections >= 4 ? (
                <TableCell className="p-2 border border-gray-300 text-center">第一加时</TableCell>
              ) : (<></>)}
              {sections >= 5 ? (
                <TableCell className="p-2 border border-gray-300 text-center">第二加时</TableCell>
              ) : (<></>)}
              <TableCell className="p-2 border border-gray-300 text-center font-bold">总分</TableCell>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="p-2 border border-gray-300 text-center">{teamAname}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamAscores[0]}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamAscores[1]}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamAscores[2]}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamAscores[3]}</TableCell>
                {sections >= 4 ? (
                    <TableCell className="p-2 border border-gray-300 text-center">{teamAscores[4]}</TableCell>
                ) : (<></>)}
                {sections >= 5 ? (
                    <TableCell className="p-2 border border-gray-300 text-center">{teamAscores[5]}</TableCell>
                ) : (<></>)}
                <TableCell className="p-2 border border-gray-300 text-center font-bold">{teamAscores.reduce((acc, score) => acc + score, 0)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="p-2 border border-gray-300 text-center">{teamBname}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamBscores[0]}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamBscores[1]}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamBscores[2]}</TableCell>
                <TableCell className="p-2 border border-gray-300 text-center">{teamBscores[3]}</TableCell>
                {sections >= 4 ? (
                    <TableCell className="p-2 border border-gray-300 text-center">{teamBscores[4]}</TableCell>
                ) : (<></>)}
                {sections >= 5 ? (
                    <TableCell className="p-2 border border-gray-300 text-center">{teamBscores[5]}</TableCell>
                ) : (<></>)}
                <TableCell className="p-2 border border-gray-300 text-center font-bold">{teamBscores.reduce((acc, score) => acc + score, 0)}</TableCell>
            </TableRow>
            </TableBody>
          </Table>
        </div>
    );
}

export default MatchSumTable