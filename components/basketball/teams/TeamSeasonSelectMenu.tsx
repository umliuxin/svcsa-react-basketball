"use client";

import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import {
  Select,
  SelectItem,
} from "@nextui-org/react";

interface TeamSeasonSelectMenuProps {
  seasons: BbSeason[];
}

const TeamSeasonSelectMenu: React.FC<TeamSeasonSelectMenuProps> = ({ seasons }) => {
  return (
    <Select
      placeholder="-----Select a season-----"
      className="max-w-[20%]"
      items={seasons}
      aria-labelledby="selected season"
    >
      {(season) => (
        <SelectItem
          key={season.id}
          value={season.name}
          href={`/basketball/${
            COMPETITIONID_TO_GROUPNAME[season.competitionid]
          }/teams?season=${season.id}`}
        >
          {season.name}
        </SelectItem>
      )}
    </Select>
  );
};

export default TeamSeasonSelectMenu;
