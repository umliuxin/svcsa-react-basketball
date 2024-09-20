"use client";

import { useRouter } from "next/navigation";
import NewsCard from "./NewsCard";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { asyncFetch } from "@/utils/fetch";

interface HomePageNewsProp {}

const HomePageNews: React.FC<HomePageNewsProp> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function fetchNews() {
      const news = await asyncFetch(`/basketball/news?$sort[id]=-1&$limit=3`);
      setNews(news.data);
      setLoading(false);
    }
    fetchNews();
  }, []);
  const handleRedirect = () => {
    router.push("/basketball/news");
  };
  return (
    <div className="grid grid-cols-5 bg-slate-950 h-72 rounded-md">
      <div className=" col-span-2 text-white self-center items-center grid justify-items-center mt-7">
        <h3 className="font-semibold text-3xl ">
          News At <span className="text-orange-700">SVCSA</span>
        </h3>
        <Button
          className="bg-orange-700 text-white mt-3 cursor-pointer"
          onClick={handleRedirect}
        >
          More news
        </Button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-5 col-span-3 self-center">
          {news.map((newsObject, index) => {
            return <NewsCard newsObject={newsObject} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};
export default HomePageNews;
