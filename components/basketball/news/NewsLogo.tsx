"use client"
import { Image } from "@nextui-org/react";
import { useState } from "react";
interface NewsPageProps {
  news: BbNews;
}

const NewsLogo: React.FC<NewsPageProps> = ({ news }) => {
  const NULL = "http://svcsa.org/uploads/null";
  const [imageLoadingError, setImageLoadingError] = useState(false);
  return (
    <div className="col-span-2 font-bold justify-self-center self-center">
      <Image
        src={news.image === NULL ? "/logo2.png" : news.image}
        alt="news logo"
        width={80}
        onError={() => {
          setImageLoadingError(true);
        }}
        className={imageLoadingError ? "hidden" : ""}
      />
      {imageLoadingError ? (
        <p className="font-medium text-6xl">
          {news.content
            .substring(
              news.content.indexOf("team") + 5,
              news.content.indexOf("team") + 6
            )
            .toUpperCase()}
        </p>
      ) : null}
    </div>
  );
};
export default NewsLogo;