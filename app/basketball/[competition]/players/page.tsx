import Custom404 from '@/components/404';
import TeamList from '@/components/basketball/teams/TeamList';
import { asyncFetch } from '@/utils/fetch';
import { getRecentSeasonByGroup } from '@/utils/get-recent-seasons';
import { GROUPNAME_TO_COMPETITIONID } from '@/utils/variables';
import SeasonSelectMenu from '@/components/basketball/teams/TeamSelectMenu';

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = 'force-static';
export default async function Page({ params, searchParams }: any) {
  


  return (
    <section>
      {JSON.stringify(params)}
      <br></br>
      {JSON.stringify(searchParams)}
    </section>

  );
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  return [
    { competition: 'men-open' },
    { competition: 'women-open' },
    { competition: 'men-senior' },
  ];
}
