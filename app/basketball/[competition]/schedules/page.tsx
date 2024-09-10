import Custom404 from "@/components/404";
import ScheduleList from "@/components/basketball/schedules/ScheduleList";
import { getRecentSeasonByGroup } from "@/utils/get-recent-seasons";

export default async function Page({ params, searchParams }: any) {
  // fetch current season
  let season = await getRecentSeasonByGroup(params.competition);

  let seasonId = season?.id;

  if (searchParams.season) {
    seasonId = searchParams.season;
  }

  if (!seasonId) {
    return <Custom404 />;
  }

  return (
    <section>
      <h1 className="text-2xl py-4">{season?.name} 未来赛程</h1>

      <ScheduleList seasonId={seasonId} />
    </section>
  );
}
