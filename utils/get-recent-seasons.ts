import { asyncFetch } from "@/utils/fetch";
import { GROUPNAME_TO_COMPETITIONID} from '@/utils/variables';

/**
 * A function to get recent seasons
 * @returns Promise<any>
 */
export const getRecentSeasons = async function (): Promise<BbSeason[]> {
  const { data: activeSeasons } = await asyncFetch("/api/basketball/active-season", true);

  return activeSeasons;
};

export const getRecentSeasonByGroup = async function (
  groupName: string
): Promise<BbSeason | undefined> {
  const recentSeasons = await getRecentSeasons();
  const competitionId = GROUPNAME_TO_COMPETITIONID[groupName];
  return recentSeasons.find((season) => {
    return season.competitionid === competitionId;
  });
};
