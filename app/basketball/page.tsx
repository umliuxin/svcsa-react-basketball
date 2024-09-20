import { getRecentSeasons } from "@/utils/get-recent-seasons";
import HomePageNews from "@/components/basketball/news/HomePageNews";
import QuickLinks from "@/components/basketball/homePage/QuickLinks";

export default async function Page() {
  const seasons = await getRecentSeasons();
  return (
    <section>
      <h1>Welcome to SVCSA</h1>
      <section>Carousel</section>
      <section>
        <QuickLinks />
      </section>
      {/* <section>
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
      </section> */}

    
      {/* <section>
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
      </section> */}
  
      <section>
        <HomePageNews />
      </section>
    </section>
  );
}
