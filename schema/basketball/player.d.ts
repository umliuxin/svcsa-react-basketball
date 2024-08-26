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

type BbPlayerSeasonAverage = {
  foul: number;
  points: number;
  assist: number;
  steal: number;
  block: number;
  rebound: number;
  fgp: number;
  ["3gp"]: number;
  ftp: number;
}