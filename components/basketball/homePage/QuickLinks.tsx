import { getRecentSeasons } from "@/utils/get-recent-seasons";
import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import Link from "next/link";
import React from "react";

interface QuickLinksProps {}

const QuickLinks: React.FC<QuickLinksProps> = async () => {
  const seasons = await getRecentSeasons();
  return (
    <div className="my-20" data-testid="quick-links">
      <div className="text-center text-3xl font-bold mt-28 mb-10">
        Explore SVCSA 🏀
      </div>
      <div className="flex">
        {seasons.map((season: BbSeason, index) => (
          <div
            className="m-auto relative w-36 h-36 md:w-56 md:h-56 lg:w-80 lg:h-80 group cursor-pointer"
            key={index}
            data-testid="competition-links"
          >
            <img
              className="w-full h-full object-cover aspect-square rounded-md group-hover:opacity-50"
              src={`${COMPETITIONID_TO_GROUPNAME[season.competitionid]}.jpg`}
              alt={season.name}
            />
            <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-30 py-1 text-white font-bold rounded-b-md">
              {season.name}
            </div>
            <div className="flex flex-col justify-center items-center text-center absolute top-0 left-0 w-full h-full md:gap-y-1 lg:gap-y-2 text-black font-semibold text-sm md:text-base lg:text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={`/basketball/${
                  COMPETITIONID_TO_GROUPNAME[season.competitionid]
                }/schedules`}
              >
                Schedules
              </Link>
              <Link
                href={`/basketball/${
                  COMPETITIONID_TO_GROUPNAME[season.competitionid]
                }/matches`}
              >
                Results
              </Link>
              <Link
                href={`/basketball/${
                  COMPETITIONID_TO_GROUPNAME[season.competitionid]
                }/standing`}
              >
                Standing
              </Link>
              <Link
                href={`/basketball/${
                  COMPETITIONID_TO_GROUPNAME[season.competitionid]
                }/players`}
              >
                Players
              </Link>
              <Link
                href={`/basketball/${
                  COMPETITIONID_TO_GROUPNAME[season.competitionid]
                }/teams`}
              >
                Teams
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
