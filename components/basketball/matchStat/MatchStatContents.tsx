"use client";

import MatchStatTable from "@/components/basketball/matchStat/MatchStatTable";
import React from 'react';

interface MatchStatProps {
    match: BbSeasonMatch;
    teamAdata: BbStat[];
    teamBdata: BbStat[];
}

const MatchStatContents: React.FC<MatchStatProps> = ({ match, teamAdata, teamBdata }) => {
    return (
        <div className="py-5">
            <h2 className="text-2xl font-bold text-gray-800 mb-2"> {match.teama.name} </h2>
            <MatchStatTable playerStats={teamAdata}/>
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2"> {match.teamb.name} </h2>
            <MatchStatTable playerStats={teamBdata}/>
        </div>
    );
};

export default MatchStatContents;
