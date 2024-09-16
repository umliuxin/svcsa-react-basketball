import React from "react";
import { Card } from "@nextui-org/react";
import TeamImage from "../teams/TeamImage";
import { formatDateTime } from "@/utils/formatDateTime";

interface MatchContentsProps {
  match: BbSeasonMatch;
}

const ScheduleList: React.FC<MatchContentsProps> = ({ match }) => {
  const { teama, teamb, court, starttime } = match;
  return (
    <Card className="shadow-lg mb-4" radius="lg">
      <div className="flex items-center justify-between">
        {/* Team A Section */}
        <div className="flex-1 flex items-center justify-start space-x-4">
          {/* Team A Logo */}
          <TeamImage
            imageClass="w-24 h-24 bg-slate-100"
            team={teama}
            textClass="text-center font-medium text-xl font-thin text-zinc-800"
          />
          {/* Team A Name */}
          <h4>{teama.name}</h4>
        </div>

        {/* Match Info Section */}
        <div className="flex flex-col flex-1 items-center justify-center gap-1">
          <h3 className="text-gray-500 text-sm">{formatDateTime(starttime)}</h3>
          <div className="flex gap-2 text-4xl">
            <h2>{match.scoreteama}</h2>
            <h2>:</h2>
            <h2>{match.scoreteamb}</h2>
          </div>
        </div>

        {/* Team B Section */}
        <div className="flex-1 flex items-center justify-end space-x-4">
          {/* Team B Name */}
          <h4>{teamb.name}</h4>
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
