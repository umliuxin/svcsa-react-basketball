import Custom404 from '@/components/404';
import { asyncFetch } from '@/utils/fetch';
import MatchStatContents from '@/components/basketball/matchStat/MatchStatContents';
import "../match.css"
import MatchSumTable from '@/components/basketball/matchStat/MatchSumTable';

function updateSection(record: string | null): number {
    if (record && record.includes('节 start')) {
        return 1;
    }
    return 0;
}

function isScore(record: string | null): boolean {
    return record ? record.includes('Made') : false;
}

function getScore(record: string | null): number {
    if (record) {
        if (record.includes('Two Point Made')) {
            return 2;
        } else if (record.includes('Three Point Made')) {
            return 3;
        } else if (record.includes('Free Throw Made')) {
            return 1;
        }
    }
    return 0;
}

function getTeamName(record: string | null): string {
    if (!record) return '';
    
    const start = record.indexOf('[');
    const end = record.indexOf(']');
    
    if (start !== -1 && end !== -1) {
        return record.substring(start + 1, end);
    }
    
    return '';
}

export default async function Page({ params, searchParams }: any) {
    // fetch current match data
    var match = await asyncFetch(
        `/basketball/match/${params.matchid}`
    );

    if(!match) {
        return (
            <Custom404 />
        )
    }

    // fetch all stat data of current match
    var data = await asyncFetch(
        `/basketball/playermatchstat?matchid=${params.matchid}&$limit=30`
    );

    var stat:BbStat[] = data.data;

    var seasonid = match.season.id;
    var teamAid = match.teama.id;
    var teamBid = match.teamb.id;
    var teamAname = match.teama.name;
    var teamBname = match.teamb.name;

    var teamAdata : BbStat[] = [];
    var teamBdata : BbStat[] = [];
    var teamAtotal : BbStat = {
        id: 0,
        matchid: match.id,
        playerid: 0,
        starter: 0,
        foul: 0,
        points: 0,
        assist: 0,
        steal: 0,
        block: 0,
        turnover: 0,
        offensiverebound: 0,
        rebound: 0,
        '3pointshit': 0,
        '2pointshit': 0,
        '1pointshit': 0,
        hit: 0,
        '3pointsshot':0,
        '2pointsshot': 0,
        '1pointsshot': 0,
        shot: 0,
        player : {
            id: 0,
            name: "全队",
            email: " ",
            weight: 0,
            height: 0,
            photosrc: " "
        }
    };
    var teamBtotal : BbStat = {
        id: 0,
        matchid: match.id,
        playerid: 0,
        starter: 0,
        foul: 0,
        points: 0,
        assist: 0,
        steal: 0,
        block: 0,
        turnover: 0,
        offensiverebound: 0,
        rebound: 0,
        '3pointshit': 0,
        '2pointshit': 0,
        '1pointshit': 0,
        hit: 0,
        '3pointsshot':0,
        '2pointsshot': 0,
        '1pointsshot': 0,
        shot: 0,
        player : {
            id: 0,
            name: "全队",
            email: " ",
            weight: 0,
            height: 0,
            photosrc: " "
        }
    };

    var response = await asyncFetch(`/basketball/seasonteamplayer?seasonid=${seasonid}&teamid=${teamAid}&$limit=30`);
    var teamAplayers = response.data;

    for (const s of stat) {
        var inTeamA = false;

        for (const p of teamAplayers) {
            if (p.playerid == s.playerid) {
                inTeamA = true;
                break;
            }
        }

        // Sort player data into appropriate teams
        if (inTeamA) {
            teamAdata.push(s);
            teamAtotal['1pointshit'] += s['1pointshit'];
            teamAtotal['1pointsshot'] += s['1pointsshot'];
            teamAtotal['2pointshit'] += s['2pointshit'];
            teamAtotal['2pointsshot'] += s['2pointsshot'];
            teamAtotal['3pointshit'] += s['3pointshit'];
            teamAtotal['3pointsshot'] += s['3pointsshot'];
            teamAtotal.points += s.points;
            teamAtotal.assist += s.assist;
            teamAtotal.steal += s.steal;
            teamAtotal.block += s.block;
            teamAtotal.turnover += s.turnover;
            teamAtotal.offensiverebound += s.offensiverebound;
            teamAtotal.rebound += s.rebound;
            teamAtotal.foul += s.foul;
        } else {
            teamBdata.push(s);
            teamBtotal['1pointshit'] += s['1pointshit'];
            teamBtotal['1pointsshot'] += s['1pointsshot'];
            teamBtotal['2pointshit'] += s['2pointshit'];
            teamBtotal['2pointsshot'] += s['2pointsshot'];
            teamBtotal['3pointshit'] += s['3pointshit'];
            teamBtotal['3pointsshot'] += s['3pointsshot'];
            teamBtotal.points += s.points;
            teamBtotal.assist += s.assist;
            teamBtotal.steal += s.steal;
            teamBtotal.block += s.block;
            teamBtotal.turnover += s.turnover;
            teamBtotal.offensiverebound += s.offensiverebound;
            teamBtotal.rebound += s.rebound;
            teamBtotal.foul += s.foul;
        }
    
    }

    teamAdata.push(teamAtotal);
    teamBdata.push(teamBtotal);

    var matchLogResponse = await asyncFetch(`/basketball/matchlog?matchid=${params.matchid}&$limit=200`);
    if (!matchLogResponse) {
        return (
            <Custom404 />
        )
    }

    var matchLogs:BbMatchLog[] = matchLogResponse.data;
    var section = -1;

    const teamAscores = [0,0,0,0,0,0];
    const teamBscores = [0,0,0,0,0,0];
    for (var log of matchLogs) {
        section += updateSection(log.event);
        if (isScore(log.event)) {
            var teamName = getTeamName(log.event);
            if (teamName == teamAname) {
                teamAscores[section] += getScore(log.event);
            } else if (teamName == teamBname) {
                teamBscores[section] += getScore(log.event);
            }
        }
    }

    console.log(section, teamAscores, teamBscores);

    return (
        <div className='matchStat'>
            <MatchSumTable sections={section} teamAname={teamAname} teamBname={teamBname} teamAscores={teamAscores} teamBscores={teamBscores}></MatchSumTable>
            <MatchStatContents match={match} teamAdata={teamAdata} teamBdata={teamBdata}></MatchStatContents>
        </div>
    );
}
