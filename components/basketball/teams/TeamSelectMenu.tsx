"use client";

import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import {
  Select,
  SelectItem,
} from "@nextui-org/react";

interface SeasonSelectMenuProps {
  seasons: BbSeason[];
}

const SeasonSelectMenu: React.FC<SeasonSelectMenuProps> = ({ seasons }) => {
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

export default SeasonSelectMenu;
