"use clinet"
import { useState } from "react";
import NewsLogo from "./NewsLogo";
import Link from "next/link";
import { Pagination } from "@nextui-org/react";

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
      {currentNewsList.map((news, index) => (
        <div key={index}>
          <div className="grid grid-cols-10 gap-4 min-h-16">
            <NewsLogo news={news} />
            <div className="col-start-3 col-span-8 cursor-pointer py-3 hover:bg-slate-300">
              <Link href={news.category == "bb_schedule" ? "/basketball" : "#"}>
                <p className="font-bold">{news.title}</p>
                {news.content}{" "}
              </Link>
            </div>
          </div>
          <hr className="border-gray-300" />
        </div>
      ))}
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
