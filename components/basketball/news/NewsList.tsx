"use clinet";
import { useState } from "react";
import { Pagination } from "@nextui-org/react";
import NewsItem from "./NewsItem";

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
        return (
          <NewsItem news={news} key={index}/>
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
