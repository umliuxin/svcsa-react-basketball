type BbSeasonMatch = {
  id: number;
  scoreteama: number;
  scoreteamb: number;
  round: number;
  state: number;
  groupid: number;
  starttime: string;
  seasonid: number;
  court: string;
  teama: BbTeam;
  teamb: BbTeam;
  season: BbSeason;
};