import { asyncFetch } from "@/utils/fetch";
import { GROUPNAME_TO_COMPETITIONID } from '@/utils/variables';

/**
 * A function to get recent seasons
 * @returns Promise<any>
 */
export const getRecentSeasons = async function (groupName?: string): Promise<BbSeason[]> {
  let baseUrl = "/basketball/season?$sort[starttime]=-1&";
  if (groupName) {
    baseUrl += `&competitionid=${GROUPNAME_TO_COMPETITIONID[groupName]}&$limit=1`;
  } else {
    baseUrl += `&$limit=3`;
  }
  const { data: seasons } = await asyncFetch(baseUrl);

  return seasons;
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
