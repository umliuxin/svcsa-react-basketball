// Team's players list component
import { Link, Image } from "@nextui-org/react";

interface PlayerListOfTeamProp {
  seasonTeamPlayers: BbSeasonTeamPlayer[];
  params: any;
}

const PlayerListOfTeam: React.FC<PlayerListOfTeamProp> = ({
  seasonTeamPlayers,
  params,
}) => {
  if (!seasonTeamPlayers) {
    return;
  }
  return (
    <div className="mt-5">
      {seasonTeamPlayers.map(
        (seasonteamplayer: BbSeasonTeamPlayer, index: number) => {
          if (!seasonteamplayer.player) {
            return;
          }
          return (
            <div className="flex h-12 items-center cursor-pointer" key={index}>
              <Link
                href={`/basketball/${params.competition}/players/:playerid=${seasonteamplayer.player.id}`}
              >
                <Image
                  src={seasonteamplayer.player.photosrc}
                  alt={seasonteamplayer.player.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ms-3">{seasonteamplayer.player.name}</div>
              </Link>
            </div>
          );
        }
      )}
    </div>
  );
};
export default PlayerListOfTeam;
