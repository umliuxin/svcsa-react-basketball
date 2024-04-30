"use client";

import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from "@nextui-org/react";

interface SeasonDropDownMenuProps {
  seasons: BbSeason[];
}

const SeasonDropDownMenu: React.FC<SeasonDropDownMenuProps> = ({ seasons }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">---Select Seasons---</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={seasons}>
        {(item) => <DropdownItem key={item.id}><Link href={`/basketball/${COMPETITIONID_TO_GROUPNAME[item.competitionid]}/teams?season=${item.id}`}>{item.name}</Link></DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SeasonDropDownMenu;
