"use clinet";
import { useEffect, useState } from "react";
import NewsLogo from "./NewsLogo";
import Link from "next/link";
import { Pagination } from "@nextui-org/react";
import { asyncFetch } from "@/utils/fetch";
import Custom404 from "@/components/404";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";

interface NewsListProps {
  newsList: BbNews[];
}
const NewsList: React.FC<NewsListProps> = ({ newsList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const currentNewsList = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      {currentNewsList.map((news, index) => {
        const [season, setSeason] = useState<BbSeason | null>(null);
        useEffect(() => {
          async function fetchSeason() {
            const seasonData = await asyncFetch(
              `/basketball/season/${news.seasonid}`
            );
            setSeason(seasonData);
          }
          fetchSeason();
        }, [news.seasonid]);
        if (!season) {
          return <Custom404 />;
        }
        const competitionid = season.competitionid;
        const groupName = COMPETITIONID_TO_GROUPNAME[competitionid];
        const CATEGORY_TO_URL: Record<string, string> = {
          bb_result: `/basketball/${groupName}/matches/${news.matchid}`,
          bb_schedule: `/basketball/${groupName}/matches`,
        };
        const categoryUrl = CATEGORY_TO_URL[news.category] ?? "#";
        return (
          <div key={index}>
            <div className="grid grid-cols-10 gap-4 min-h-16">
              <NewsLogo news={news} />
              <div className="col-start-3 col-span-8 cursor-pointer py-3 hover:bg-slate-300">
                <Link href={categoryUrl}>
                  <p className="font-bold">{news.title}</p>
                  {news.content}{" "}
                </Link>
              </div>
            </div>
            <hr className="border-gray-300" />
          </div>
        );
      })}
      <Pagination
        className="grid justify-items-center mt-2"
        isCompact
        showControls
        total={totalPages}
        initialPage={1}
        onChange={handlePageChange}
        page={currentPage}
      />
    </div>
  );
};
export default NewsList;
