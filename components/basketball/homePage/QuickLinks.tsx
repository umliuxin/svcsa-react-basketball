import Link from "next/link";
import React from "react";

interface QuickLinksProps {}
const competitions = ["men-open", "women-open", "men-senior"];

const QuickLinks: React.FC<QuickLinksProps> = () => {
  return (
    <div className="mb-20">
      <div className="text-center text-3xl font-bold my-10">
        Expore SVCSA 🏀
      </div>
      <div className="flex">
        {competitions.map((competition, index) => (
          <div className="m-auto relative w-32 h-32 min-h-full md:w-48 md:h-48 lg:w-80 lg:h-80 group cursor-pointer">
            <img
              className="w-full h-full object-cover aspect-square rounded-md group-hover:opacity-50"
              src={`${competition}.jpg`}
              alt={competition}
            />
            <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-30 py-1 text-white font-bold rounded-b-md">
              {competition}
            </div>
            <div className="flex flex-col justify-center items-center text-center absolute top-0 left-0 w-full h-full gap-y-2 text-black font-semibold text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={`/basketball/${competition}/schedules`}>
                Schedules
              </Link>
              <Link href={`/basketball/${competition}/matches`}>Results</Link>
              <Link href={`/basketball/${competition}/standing`}>Standing</Link>
              <Link href={`/basketball/${competition}/players`}>Players</Link>
              <Link href={`/basketball/${competition}/teams`}>Teams</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
