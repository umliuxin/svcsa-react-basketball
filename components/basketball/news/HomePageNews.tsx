"use client"

import { useRouter } from "next/navigation";
import NewsCard from "./NewsCard";
import { Button } from "@nextui-org/react";

interface HomePageNewsProp {
  News: BbNews[];
}

const HomePageNews: React.FC<HomePageNewsProp> = ({ News }) => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/basketball/news')
  }
  return (
    <div className="grid grid-cols-5 bg-slate-950 h-72">
      <div className=" col-span-2 text-white self-center items-center grid justify-items-center mt-7">
        <h3 className="font-semibold text-3xl ">
          News At <span className="text-orange-700">SVCSA</span>
        </h3>
        <Button className="bg-orange-700 text-white mt-3 cursor-pointer" onClick={handleRedirect}>
          More news
        </Button>
      </div>
      <div className="flex gap-5 col-span-3 self-center">
        {News.map((newsObject, index) => {
          return <NewsCard newsObject={newsObject} key={index} />;
        })}
      </div>
    </div>
  );
};
export default HomePageNews;
