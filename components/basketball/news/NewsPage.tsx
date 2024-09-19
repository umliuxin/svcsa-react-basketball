"use client";
import React, { useEffect, useState } from "react";
import { asyncFetch } from "@/utils/fetch";
import NewsList from "./NewsList";

interface NewsPageProps {}

const NewsPage: React.FC<NewsPageProps> = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  useEffect(() => {
    async function fetchNews() {
      const news = await asyncFetch(`/basketball/news?$sort[id]=-1&$limit=200`);
      setNews(news.data);
      setLoading(false);
    }
    fetchNews();
  }, []);
  
  return (
    <div>{loading ? <p>News Loading...</p> : <NewsList newsList={news} />}</div>
  );
};
export default NewsPage;
