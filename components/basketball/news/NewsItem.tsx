import Link from "next/link"
import NewsLogo from "./NewsLogo"
import { useEffect, useState } from "react";
import { asyncFetch } from "@/utils/fetch";
import Custom404 from "@/components/404";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";

interface NewsItemProps {
    news: BbNews
}
const NewsItem: React.FC<NewsItemProps> = ({news}) => {
    const [season, setSeason] = useState<BbSeason | null>(null);
  useEffect(()=> {
    async function fetchSeason() {
      const seasonData = await asyncFetch(`/basketball/season/${news.seasonid}`);
      setSeason(seasonData);
    }
    fetchSeason();
  }, [news.seasonid])
  if (!season) {
    return <Custom404 />;
  }
  const competitionid = season.competitionid;
  const groupName = COMPETITIONID_TO_GROUPNAME[competitionid];
  const CATEGORY_TO_URL: Record<string, string> = {
    "bb_result" : `/basketball/${groupName}/matches/${news.matchid}`,
    "bb_schedule" : `/basketball/${groupName}/matches`,
  };
  const categoryUrl = CATEGORY_TO_URL[news.category] ?? "#";
    return(
        <div >
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
    )
}
export default NewsItem;