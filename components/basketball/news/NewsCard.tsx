"use client";
import Custom404 from "@/components/404";
import { asyncFetch } from "@/utils/fetch";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface NewsCardProp {
  newsObject: BbNews;
}

const NULL = "http://svcsa.org/uploads/null";
const NewsCard: React.FC<NewsCardProp> = ({ newsObject }) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const indexOfTeamName = newsObject.content.indexOf("team") + 5;
  const [season, setSeason] = useState<BbSeason | null>(null);
  useEffect(()=> {
    async function fetchSeason() {
      const seasonData = await asyncFetch(`/basketball/season/${newsObject.seasonid}`);
      setSeason(seasonData);
    }
    fetchSeason();
  }, [newsObject.seasonid])
  if (!season) {
    return <Custom404 />;
  }
  const competitionid = season.competitionid;
  const groupName = COMPETITIONID_TO_GROUPNAME[competitionid];
  const CATEGORY_TO_URL: Record<string, string> = {
    "bb_result" : `/basketball/${groupName}/matches/${newsObject.matchid}`,
    "bb_schedule" : `/basketball/${groupName}/matches`,
  };
  const categoryUrl = CATEGORY_TO_URL[newsObject.category] ?? "#";
  return (
    <Card className="text-white">
      <CardBody className="grid justify-items-center content-center">
        <Image
          src={newsObject.image === NULL ? "/logo.png" : newsObject.image}
          alt="news picture"
          width={60}
          height={60}
          onError={() => {
            setImageLoadingError(true);
          }}
        />
        {imageLoadingError ? (
          <p className="absolute font-medium text-6xl">
            {newsObject.content.substring(
              indexOfTeamName,
              indexOfTeamName + 1
            ).toUpperCase()}
          </p>
        ) : null}
      </CardBody>
      <CardFooter className="flex flex-col text-xs w-48 h-40">
        <h3 className="text-center font-bold leading-6">{newsObject.title}</h3>
        <p className="text-center font-medium text-slate-900">{newsObject.content}</p>
        <a className="text-orange-700 underline cursor-pointer" href={categoryUrl}>learn more</a>
      </CardFooter>
    </Card>
  );
};
export default NewsCard;
