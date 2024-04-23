"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import TeamCard from "./TeamCard";

// Define props interface
interface TeamsListProps {
  teams: BbSeasonTeam[];
}

const TeamList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-6">
      {teams.map((singleTeam) => {
        return (
          <TeamCard team={singleTeam.team}/>
        );
      })}
    </div>
  );
};
export default TeamList;
