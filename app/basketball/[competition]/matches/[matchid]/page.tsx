import Custom404 from '@/components/404';
import { asyncFetch } from '@/utils/fetch';
import MatchStatContents from '@/components/basketball/matchStat/MatchStatContents';

export default async function Page({ params, searchParams }: any) {
    // fetch all stat data
    // TODO:
    // get stats by match id on API side
    var data = await asyncFetch(
        `/basketball/playermatchstat?$limit=10000`
    );
    /// filter data with current match id
    var filteredStat = data.data.filter((d: any) => d.matchid == params.matchid);
    
    // fetch current match
    var match = await asyncFetch(
        `/basketball/match/${params.matchid}`
    );
    console.log(match);

    if(!match) {
        return (
            <Custom404 />
        )
    }

    return (
        <div>
            <MatchStatContents match={match} stat={filteredStat}></MatchStatContents>
        </div>
    );
}
