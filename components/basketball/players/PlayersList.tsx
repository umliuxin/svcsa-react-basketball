"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Pagination } from "@nextui-org/react";
import { asyncFetch } from "@/utils/fetch";
import PlayerCard from "@/components/basketball/players/PlayerCard";

const DEFAULT_PAGINATION = 20;

interface PlayersListProp {
  seasonId: number;
}

const PlayersList: React.FC<PlayersListProp> = ({seasonId}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const teamId = parseInt(searchParams?.get("teamid") ?? "", 10);

  const [seasonPlayers, setSeasonPlayers] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      let fetchUrl = `/basketball/seasonteamplayer?seasonid=${seasonId}&$limit=20&$skip=${
        DEFAULT_PAGINATION * (page - 1)
      }`;
      if (teamId) {
        fetchUrl += `&teamid=${teamId}`;
      }
      const { data: seasonPlayers, total } = await asyncFetch(fetchUrl);
      setSeasonPlayers(seasonPlayers);
      setTotalPage(Math.ceil(total / DEFAULT_PAGINATION));
      setLoading(false);
    }
    if (page) {
      fetchItems();
    }
  }, [page, seasonId, teamId]);

  const handlePageChange = (newPage: number): void => {
    const currentParams = new URLSearchParams(searchParams?.toString());

    currentParams.set("page", newPage.toString());

    router.push(`${pathName}?${currentParams.toString()}`);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded shadow">
          <div className="flex flex-wrap">
            {seasonPlayers.map((seasonPlayer: BbSeasonTeamPlayer) => {
              if (!seasonPlayer.player) {
                return;
              }
              return (
                <div
                  key={seasonPlayer.player.id}
                  className="relative w-3/12 p-2"
                >
                  <PlayerCard player={seasonPlayer.player} />
                </div>
              );
            })}
          </div>

          <Pagination
            total={totalPage}
            initialPage={page}
            size={"lg"}
            className="flex justify-center"
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default PlayersList;
