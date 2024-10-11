"use client";

import React from "react";
import { Card } from "@nextui-org/react";
import TeamImage from "../teams/TeamImage";
import { formatDateTime } from "@/utils/formatDateTime";
import { getGroupName } from "@/utils/get-group-name";
import { useRouter } from "next/navigation";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import CustomLink from "@/components/shared/links";
import type { CompetitionGroup } from "@/utils/variables";

interface MatchContentsProps {
  match: BbSeasonMatch;
  withLink?: boolean;
}

const ScheduleList: React.FC<MatchContentsProps> = ({ match, withLink }) => {
  const { teama, teamb, court, starttime, groupid } = match;
  const router = useRouter();

  const competitionName = COMPETITIONID_TO_GROUPNAME[
    match.season.competitionid
  ] as CompetitionGroup;

  const clickHandler = (): void => {
    if (!withLink) return;
    router.push(`/basketball/${competitionName}/matches/${match.id}`);
  };
  return (
    <Card
      className="shadow-lg mb-5 w-full"
      radius="lg"
      isPressable={withLink}
      onPress={clickHandler}
    >
      <div className="flex items-center justify-between w-full">
        {/* Team A Section */}
        <div className="flex-1 flex items-center justify-start space-x-4">
          {/* Team A Logo */}
          <TeamImage
            imageClass="w-24 h-24 bg-slate-100"
            team={teama}
            textClass="text-center font-medium text-xl font-thin text-zinc-800"
          />
          {/* Team A Name */}
          <h4>
            <CustomLink
              type="teams"
              id={teama.id}
              competition={competitionName}
            >
              {teama.name}
            </CustomLink>
          </h4>
        </div>

        {/* Match Info Section */}
        <div className="flex flex-col flex-1 items-center justify-center gap-1">
          <h3 className="text-gray-500 text-sm">{formatDateTime(starttime)}</h3>
          <div className="flex gap-2 text-4xl">
            <h2>{match.scoreteama}</h2>
            <h2>:</h2>
            <h2>{match.scoreteamb}</h2>
          </div>
          <div className="text-gray-500 text-sm">
            {groupid !== undefined && (
              <span className="mr-3">{getGroupName(groupid)}</span>
            )}
            <span>{court}</span>
          </div>
        </div>

        {/* Team B Section */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Team B Name */}
          <h4>
            <CustomLink
              type="teams"
              id={teamb.id}
              competition={competitionName}
            >
              {teamb.name}
            </CustomLink>
          </h4>
          {/* Team B Logo */}
          <TeamImage
            imageClass="w-24 h-24 bg-slate-100"
            team={teamb}
            textClass="text-center font-medium text-xl font-thin text-zinc-800"
          />
        </div>
      </div>
    </Card>
  );
};

export default ScheduleList;
