import { getRecentSeasons } from "@/utils/get-recent-seasons";
import HomePageNews from "@/components/basketball/news/HomePageNews";
import QuickLinks from "@/components/basketball/homePage/QuickLinks";
import Carousel from "@/components/basketball/homePage/PicCarousel";

export default async function Page() {
  const seasons = await getRecentSeasons();
  return (
    <section>
      <section>
        <Carousel />
      </section>
      <section>
        <QuickLinks seasons={seasons} />
      </section>
      <section>
        <HomePageNews />
      </section>
    </section>
  );
}
