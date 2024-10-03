import { asyncFetch } from "@/utils/fetch";
import Link from "next/link";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";

const EXCLUDE_IDS = [6, 7, 8, 9];
export default async function Page() {
  const allCompetitionsPromise = asyncFetch("/basketball/competition").then(
    (res) => res.data
  );
  const allSeasonsPromise = asyncFetch(
    "/basketball/season?$limit=30&$sort[starttime]=-1"
  ).then((res) => res.data);

  const [allCompetitions, allSeasons]: [BbCompetition[], BbSeason[]] =
    await Promise.all([allCompetitionsPromise, allSeasonsPromise]);

  const competitionMap: Record<number, any> = {};
  allCompetitions.forEach((competition: BbCompetition) => {
    competitionMap[competition.id] = {
      ...competition,
      seasons: [],
    };
  });

  allSeasons.forEach((season: BbSeason) => {
    if (EXCLUDE_IDS.includes(season.id)) {
      return;
    }
    competitionMap[season.competitionid].seasons.push(season);
  });

  return (
    <>
      <h1 className="text-2xl py-4">历史赛季</h1>
      {Object.values(competitionMap).map((data) => {
        return (
          <div key={data.id} className="py-2">
            <h3 className="text-xl py-2">{data.name}</h3>
            {data.seasons.map((season: BbSeason) => {
              return (
                <div key={season.id}>
                  <Link
                    href={`/basketball/${
                      COMPETITIONID_TO_GROUPNAME[season.competitionid]
                    }?season=${season.id}`}
                  >
                    {season.name}
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
