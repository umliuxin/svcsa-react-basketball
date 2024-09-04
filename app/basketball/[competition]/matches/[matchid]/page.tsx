import Custom404 from '@/components/404';
import { asyncFetch } from '@/utils/fetch';
import MatchStatContents from '@/components/basketball/matchStat/MatchStatContents';
import "../match.css"

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

    return (
        <div className='matchStat'>
            <MatchStatContents match={match} teamAdata={teamAdata} teamBdata={teamBdata}></MatchStatContents>
        </div>
    );
}
