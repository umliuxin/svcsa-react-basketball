"use client";

import { asyncFetch } from '@/utils/fetch';
import MatchStatTable from "@/components/basketball/matchStat/MatchStatTable";
import React, { useEffect, useState } from 'react';

interface PlayerStatProps {
    name: string;
    points: number;
    shot2pt: string;
    shot3pt: string;
    shot1pt: string;
    offensiveRebound: number;
    defensiveRebound: number;
    rebound: number;
    assist: number;
    steal: number;
    block: number;
    turnover: number;
    foul: number;
    effectiveFieldGoal: number;
}

interface MatchStatProps {
    match: BbSeasonMatch;
    stat: BbStat[];
}

const MatchStatContents: React.FC<MatchStatProps> = ({ match, stat }) => {
    const teamAid = match.teama.id;
    const teamBid = match.teamb.id;

    const [teamAdata, setTeamAdata] = useState<PlayerStatProps[]>([]);
    const [teamBdata, setTeamBdata] = useState<PlayerStatProps[]>([]);
    const [teamAtotal, setTeamAtotal] = useState({
        '1pointshit': 0,
        '1pointsshot': 0,
        '2pointshit': 0,
        '2pointsshot': 0,
        '3pointshit': 0,
        '3pointsshot': 0,
        points: 0,
        assist: 0,
        steal: 0,
        block: 0,
        turnover: 0,
        offensiverebound: 0,
        rebound: 0,
        foul: 0,
    });
    const [teamBtotal, setTeamBtotal] = useState({
        '1pointshit': 0,
        '1pointsshot': 0,
        '2pointshit': 0,
        '2pointsshot': 0,
        '3pointshit': 0,
        '3pointsshot': 0,
        points: 0,
        assist: 0,
        steal: 0,
        block: 0,
        turnover: 0,
        offensiverebound: 0,
        rebound: 0,
        foul: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const tempTeamAdata: PlayerStatProps[] = [];
            const tempTeamBdata: PlayerStatProps[] = [];

            const tempTeamAtotal = { ...teamAtotal };
            const tempTeamBtotal = { ...teamBtotal };

            for (const s of stat) {
                try {
                    // Fetch player information
                    const response = await asyncFetch(`/basketball/seasonteamplayer/${s.playerid}`);

                    if (!response.ok) {
                        console.error(`Failed to fetch player data: ${response.status} - ${response.statusText}`);
                        continue;  // Skip to the next iteration if the fetch fails
                    }

                    const playerInfo = await response.json();  // Parse the response as JSON

                    // Proceed with creating the player stat and pushing to the respective teams
                    const newPlayerStat: PlayerStatProps = {
                        name: s.player.name,
                        points: s.points,
                        shot2pt: `${s['2pointshit']}-${s['2pointsshot']}`,
                        shot3pt: `${s['3pointshit']}-${s['3pointsshot']}`,
                        shot1pt: `${s['1pointshit']}-${s['1pointsshot']}`,
                        offensiveRebound: s.offensiverebound,
                        defensiveRebound: s.rebound - s.offensiverebound,
                        rebound: s.rebound,
                        assist: s.assist,
                        steal: s.steal,
                        block: s.block,
                        turnover: s.turnover,
                        foul: s.foul,
                        effectiveFieldGoal: s.points + s.offensiverebound + s.rebound + s.assist + s.steal + s.block - s.turnover - s['3pointsshot'] - s['2pointsshot'] - s['1pointsshot']
                    };

                    // Sort player data into appropriate teams
                    if (playerInfo.teamid === teamAid) {
                        tempTeamAdata.push(newPlayerStat);
                        tempTeamAtotal['1pointshit'] += s['1pointshit'];
                        tempTeamAtotal['1pointsshot'] += s['1pointsshot'];
                        tempTeamAtotal['2pointshit'] += s['2pointshit'];
                        tempTeamAtotal['2pointsshot'] += s['2pointsshot'];
                        tempTeamAtotal['3pointshit'] += s['3pointshit'];
                        tempTeamAtotal['3pointsshot'] += s['3pointsshot'];
                        tempTeamAtotal.points += s.points;
                        tempTeamAtotal.assist += s.assist;
                        tempTeamAtotal.steal += s.steal;
                        tempTeamAtotal.block += s.block;
                        tempTeamAtotal.turnover += s.turnover;
                        tempTeamAtotal.offensiverebound += s.offensiverebound;
                        tempTeamAtotal.rebound += s.rebound;
                        tempTeamAtotal.foul += s.foul;
                    } else if (playerInfo.teamid === teamBid) {
                        tempTeamBdata.push(newPlayerStat);
                        tempTeamBtotal['1pointshit'] += s['1pointshit'];
                        tempTeamBtotal['1pointsshot'] += s['1pointsshot'];
                        tempTeamBtotal['2pointshit'] += s['2pointshit'];
                        tempTeamBtotal['2pointsshot'] += s['2pointsshot'];
                        tempTeamBtotal['3pointshit'] += s['3pointshit'];
                        tempTeamBtotal['3pointsshot'] += s['3pointsshot'];
                        tempTeamBtotal.points += s.points;
                        tempTeamBtotal.assist += s.assist;
                        tempTeamBtotal.steal += s.steal;
                        tempTeamBtotal.block += s.block;
                        tempTeamBtotal.turnover += s.turnover;
                        tempTeamBtotal.offensiverebound += s.offensiverebound;
                        tempTeamBtotal.rebound += s.rebound;
                        tempTeamBtotal.foul += s.foul;
                    }
                } catch (error) {
                    console.error(`Error fetching player data for ID: ${s.playerid}`, error);
                    continue;  // Continue the loop even if an error occurs
                }
            }

            // Update state after all data is processed
            setTeamAdata(tempTeamAdata);
            setTeamBdata(tempTeamBdata);
            setTeamAtotal(tempTeamAtotal);
            setTeamBtotal(tempTeamBtotal);
        };

        fetchData();
    }, [stat, teamAid, teamBid]);  // Dependency array for the effect

    const teamAtotalStat: PlayerStatProps = {
        name: "球队",
        points: teamAtotal.points,
        shot2pt: `${teamAtotal['2pointshit']}-${teamAtotal['2pointsshot']}`,
        shot3pt: `${teamAtotal['3pointshit']}-${teamAtotal['3pointsshot']}`,
        shot1pt: `${teamAtotal['1pointshit']}-${teamAtotal['1pointsshot']}`,
        offensiveRebound: teamAtotal.offensiverebound,
        defensiveRebound: teamAtotal.rebound - teamAtotal.offensiverebound,
        rebound: teamAtotal.rebound,
        assist: teamAtotal.assist,
        steal: teamAtotal.steal,
        block: teamAtotal.block,
        turnover: teamAtotal.turnover,
        foul: teamAtotal.foul,
        effectiveFieldGoal: teamAtotal.points + teamAtotal.offensiverebound + teamAtotal.rebound + teamAtotal.assist + teamAtotal.steal + teamAtotal.block - teamAtotal.turnover - teamAtotal['3pointsshot'] - teamAtotal['2pointsshot'] - teamAtotal['1pointsshot']
    };

    const teamBtotalStat: PlayerStatProps = {
        name: "球队",
        points: teamBtotal.points,
        shot2pt: `${teamBtotal['2pointshit']}-${teamBtotal['2pointsshot']}`,
        shot3pt: `${teamBtotal['3pointshit']}-${teamBtotal['3pointsshot']}`,
        shot1pt: `${teamBtotal['1pointshit']}-${teamBtotal['1pointsshot']}`,
        offensiveRebound: teamBtotal.offensiverebound,
        defensiveRebound: teamBtotal.rebound - teamBtotal.offensiverebound,
        rebound: teamBtotal.rebound,
        assist: teamBtotal.assist,
        steal: teamBtotal.steal,
        block: teamBtotal.block,
        turnover: teamBtotal.turnover,
        foul: teamBtotal.foul,
        effectiveFieldGoal: teamBtotal.points + teamBtotal.offensiverebound + teamBtotal.rebound + teamBtotal.assist + teamBtotal.steal + teamBtotal.block - teamBtotal.turnover - teamBtotal['3pointsshot'] - teamBtotal['2pointsshot'] - teamBtotal['1pointsshot']
    };

    return (
        <div>
            <MatchStatTable teamName={match.teama.name} playerStats={teamAdata} totalStat={teamAtotalStat}/>
            <MatchStatTable teamName={match.teamb.name} playerStats={teamBdata} totalStat={teamBtotalStat}/>
        </div>
    );
};

export default MatchStatContents;
