import Custom404 from '@/components/404';
import TeamList from '@/components/basketball/teams/TeamList';
import { asyncFetch } from '@/utils/fetch';
import { getRecentSeasonByGroup } from '@/utils/get-recent-seasons';
import { GROUPNAME_TO_COMPETITIONID } from '@/utils/variables';
import SeasonSelectMenu from '@/components/basketball/teams/TeamSelectMenu';

//Using 'force-static' to force useSearchParams() to return empty values.
export const dynamic = 'force-static';

// Return a list of `params` to populate the [slug] dynamic segment
export function generateStaticParams() {
  return [
    { competition: 'men-open', playerid: '12' },
    { competition: 'women-open', playerid: '12' },
    { competition: 'men-senior', playerid: '12' },
  ];
}

export default function Page({ params, searchParams }: any) {
  return (
    <div className="container">
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12">
          <div className="bg-gray-100 p-4 rounded shadow">
            {/* Content for the 3-column section */}
            <h2 className="text-xl font-bold mb-2">Sidebar</h2>
            <p>This is the sidebar content.</p>
          </div>
        </div>
        <div className="w-full md:w-9/12 pl-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            {/* Content for the 9-column section */}
            <h2 className="text-xl font-bold mb-2">Main Content</h2>
            <p>This is the main content area.</p>
            <section>
              {JSON.stringify(params)}
              <br></br>
              {JSON.stringify(searchParams)}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
