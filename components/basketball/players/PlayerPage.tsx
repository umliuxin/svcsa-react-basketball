import { Image } from "@nextui-org/react";
interface PlayerPageProp {
  seasonTeamPlayer: BbSeasonTeamPlayer;
}
const PlayerPage: React.FC<PlayerPageProp> = ({ seasonTeamPlayer }) => {
  if (!seasonTeamPlayer) {
    return;
  }
  return(
    <div className="flex flex-wrap">
              <section className="md:w-9/12">
                <h1 className="text-4xl font-bold my-5 ms-3 inline-block p-2">
                  {seasonTeamPlayer.player?.name}
                </h1>
                <div className="my-5 ms-3 font-semibold text-2xl border-l-4 border-lime-600 ps-2">
                  Player Information
                </div>
                <div className="flex gap-10 mb-5 ms-3">
                  <div className="flex items-center">
                    <div className="font-bold">Number</div>
                    <div className="box-border h-20 w-20 bg-slate-200 rounded-full ms-2 flex items-center justify-center text-xl">
                      {seasonTeamPlayer.playernumber}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-bold">Height</div>
                    <div className="box-border h-20 w-20 bg-slate-200 rounded-full ms-2 flex items-center justify-center text-xl">
                      {seasonTeamPlayer.player?.height}cm
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-bold">Weight</div>
                    <div className="box-border h-20 w-20 bg-slate-200 rounded-full ms-2 flex items-center justify-center text-lg">
                      {seasonTeamPlayer.player?.weight}kg
                    </div>
                  </div>
                </div>
                <div className="flex gap-16 ms-3">
                  <div>
                    <p className="font-bold">Email</p>
                    <p>{seasonTeamPlayer.player?.email}</p>
                  </div>
                  <div>
                    <p className="font-bold">Team</p>
                    <p>{seasonTeamPlayer.team?.name}</p>
                  </div>
                  <div>
                    <p className="font-bold">Season</p>
                    <p>{seasonTeamPlayer.season?.name}</p>
                  </div>
                </div>
              </section>
              <section className="md:w-3/12">
                <div>
                  <Image
                    src={seasonTeamPlayer.player?.photosrc}
                    alt="Player Image"
                    className="w-60 h-80 object-cover"
                  />
                </div>
              </section>
            </div>
  );
};
export default PlayerPage;