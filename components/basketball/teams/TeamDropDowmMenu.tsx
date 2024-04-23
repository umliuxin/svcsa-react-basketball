import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface SeasonDropDownMenuProps {
  seasons: BbSeason[];
}

const SeasonDropDownMenu: React.FC<SeasonDropDownMenuProps> = ({ seasons }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Select Seasons</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={seasons}>
        {(item) => (
          <DropdownItem
            key={item.id}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SeasonDropDownMenu;
