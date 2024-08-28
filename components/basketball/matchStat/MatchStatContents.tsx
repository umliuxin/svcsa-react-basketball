"use client";

import { asyncFetch } from '@/utils/fetch';
import MatchStatTable from "@/components/basketball/matchStat/MatchStatTable";
import React from 'react';

interface MatchStatProps {
    match: BbSeasonMatch;
    teamAdata: BbStat[];
    teamBdata: BbStat[];
}

const MatchStatContents: React.FC<MatchStatProps> = ({ match, teamAdata, teamBdata }) => {
    return (
        <div>
            <h2 className='statTeamTitle'> {match.teama.name} </h2>
            <MatchStatTable playerStats={teamAdata}/>
            <h1 className='statTeamTitle'> {match.teamb.name} </h1>
            <MatchStatTable playerStats={teamBdata}/>
        </div>
    );
};

export default MatchStatContents;
