type BbSeasonMatch = {
    id: number;
    scoreteama: number;
    scoreteamb: number;
    state: number;
    starttime: string;
    seasonid: number;
    court: string;
    teama: BbTeam;
    teamb: BbTeam;
    // round?
}