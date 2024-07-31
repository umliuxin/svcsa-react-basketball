type BbPlayer = {
  description?: string | undefined;
  id: number;
  name: string;
  email: string;
  weight: number;
  height: number;
  photosrc: string;
};

type BbSeasonTeamPlayer = {
  team?: BbTeam;
  season?: BbSeason;
  player?: BbPlayer;
  playernumber:number;
  seasonid: number;
  teamid: number;
  playerid: number;
}