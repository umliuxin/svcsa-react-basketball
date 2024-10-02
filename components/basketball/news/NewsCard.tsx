"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useState } from "react";

interface NewsCardProp {
  newsObject: BbNews;
}

const NULL = "http://svcsa.org/uploads/null";
const NewsCard: React.FC<NewsCardProp> = ({ newsObject }) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);
  const indexOfTeamName = newsObject.content.indexOf("team") + 5;
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
        <a className="text-orange-700 underline cursor-pointer">learn more</a>
      </CardFooter>
    </Card>
  );
};
export default NewsCard;
