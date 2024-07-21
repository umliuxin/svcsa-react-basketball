'use client'

import Custom404 from '@/components/404';
import TeamList from '@/components/basketball/teams/TeamList';
import { asyncFetch } from '@/utils/fetch';
import { getRecentSeasonByGroup } from '@/utils/get-recent-seasons';
import { GROUPNAME_TO_COMPETITIONID } from '@/utils/variables';
import SeasonSelectMenu from '@/components/basketball/teams/TeamSelectMenu';

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = 'force-dynamic';
export const dynamicParams = true;


// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  return [
    { competition: 'men-open', playerid: "12" },
    { competition: 'women-open', playerid: '12' },
    { competition: 'men-senior', playerid: '12' },
  ];
}

export default function Page({ params, searchParams }: any) {
  


  return (
    <section>
      {JSON.stringify(params)}
      <br></br>
      {JSON.stringify(searchParams)}
    </section>
  );
}

