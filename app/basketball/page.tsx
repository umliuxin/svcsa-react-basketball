import getRecentSeasons from "../utils/get-recent-seasons";
import { Link } from "@nextui-org/react";
import { COMPETITIONID_TO_GROUPNAME } from '@/app/utils/variables';

export default async function Page() {
  const seasons = await getRecentSeasons();

  return (
    <section>
      <h1>Hello, basketball league page!</h1>
      <section>
        <h3>Current Season Rank: </h3>

        {seasons.map((season: Season) => {
          return (
            <Link
              key={season.name}
              className="block"
              href={`/basketball/${
                COMPETITIONID_TO_GROUPNAME[season.competitionid]
              }/standing`}
            >
              {season.name}
            </Link>
          );
        })}
      </section>
    </section>
  );
}
