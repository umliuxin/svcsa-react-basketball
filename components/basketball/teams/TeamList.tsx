"use client";

import React from "react";
import TeamCard from "./TeamCard";

// Define props interface
interface TeamsListProps {
  teams: BbSeasonTeam[];
}

const TeamList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {teams.map((singleTeam, index) => {
        return <TeamCard team={singleTeam.team} season={singleTeam.season} key={index} />;
      })}
    </div>
  );
};
export default TeamList;
