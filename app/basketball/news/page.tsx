import NewsPage from "@/components/basketball/news/NewsPage";
import { Image } from "@nextui-org/react";
import { asyncFetch } from "@/utils/fetch";


export default async function Page () {
    const news = await asyncFetch(`/basketball/news?$sort[id]=-1&$limit=200`);
    return (
        <>
        <h2 className="text-center text-3xl my-12">SVCSA News Center</h2>
        <NewsPage newsList={news.data}/>
        </>
        
    );
}