export const MEN_OPEN = 'men-open';
export const MEN_SENIOR = 'men-senior';
export const WOMEN_OPEN = 'women-open';

export const ALL_COMPETITION_GROUPS = [MEN_OPEN, MEN_SENIOR, WOMEN_OPEN];

export const GROUPNAME_TO_COMPETITIONID: Record<string, number> = {
  [MEN_OPEN]: 1,
  [MEN_SENIOR]: 4,
  [WOMEN_OPEN]: 2,
};

export const COMPETITIONID_TO_GROUPNAME: Record<number, string> = {
  1: MEN_SENIOR,
  4: MEN_SENIOR,
  2: WOMEN_OPEN,
};


