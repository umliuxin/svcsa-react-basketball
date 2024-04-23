"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

// Define props interface
interface TeamsListProps {
  teams: BbSeasonTeam[];
}

const TeamList: React.FC<TeamsListProps> = ({ teams }) => {
  return (
    <div className="gap-4 grid grid-cols-2 md:grid-cols-6">
      {teams.map((singleTeam, index) => {
        return (
          <Card key={index} isPressable>
            <CardBody className="justify-center items-center h-40 hover:opacity-50">
              <Image
                width={100}
                height={100}
                alt={singleTeam.team?.name}
                src={
                  singleTeam.team?.logosrc === "http://svcsa.org/uploads/null"
                    ? "http://www.svcsa.org/images/teamlogo.jpg"
                    : singleTeam.team?.logosrc
                }
                
              />
            </CardBody>
            <CardFooter className="h-15 bg-neutral-300 justify-center">
              <p className="text-small">{singleTeam.team?.shortname}</p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
export default TeamList;
