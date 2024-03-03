import { asyncFetch } from "@/utils/fetch";
import { GROUPNAME_TO_COMPETITIONID } from '@/utils/variables';

/**
 * A function to get recent seasons
 * @returns Promise<any>
 */
const getRecentSeasons = async function (groupName?: string): Promise<BbSeason[]> {
  let baseUrl = "/basketball/season?$sort[starttime]=-1&";
  if (groupName) {
    baseUrl += `&competitionid=${GROUPNAME_TO_COMPETITIONID[groupName]}&$limit=1`;
  } else {
    baseUrl += `&$limit=3`;
  }
    const { data: seasons } = await asyncFetch(baseUrl);

  return seasons
};

export default getRecentSeasons;
