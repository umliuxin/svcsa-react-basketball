import { getRecentSeasons } from "@/utils/get-recent-seasons";
import { Link } from "@nextui-org/react";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import HomePageNews from "@/components/basketball/news/HomePageNews";

export default async function Page() {
  const seasons = await getRecentSeasons();
  return (
    <section>
      <h1>Hello, basketball league page!</h1>
      <section>
        <h3>Standings </h3>

        {seasons.map((season: BbSeason) => {
          return (
            <Link
              key={season.name}
              className="block"
              data-testid="standing-link"
              href={`/basketball/${
                COMPETITIONID_TO_GROUPNAME[season.competitionid]
              }/standing`}
            >
              {season.name}
            </Link>
          );
        })}
      </section>

      <br />
      <section>
        <h3>Teams</h3>
        {seasons.map((season: BbSeason) => {
          return (
            <Link
              key={season.id}
              className="block"
              data-testid="teams-link"
              href={`/basketball/${
                COMPETITIONID_TO_GROUPNAME[season.competitionid]
              }/teams`}
            >
              {season.name}
            </Link>
          );
        })}
      </section>
      <br />
      <section>
        <HomePageNews />
      </section>
    </section>
  );
}
