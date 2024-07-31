'use client';

import React from 'react';
import { Listbox, ListboxItem, cn } from '@nextui-org/react';
import TeamImage from './TeamImage';
import {
  faRankingStar,
  faChevronDown,
  faPeopleGroup,
  faDatabase,
  faBasketball,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TeamSelectorProp {
  seasonTeams: BbSeasonTeam[];
}

export const TeamSelector: React.FC<TeamSelectorProp> = ({ seasonTeams }) => {
  const filteredTeam = seasonTeams.filter((t) => !!t);
  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 bg-white">
      <Listbox
        variant="faded"
        aria-label="Listbox menu with icons"
        topContent={
          <div className="flex gap-2 items-center px-2">
            <FontAwesomeIcon
              fixedWidth
              className="w-8 h-8"
              icon={faPeopleGroup}
              size="xl"
            />
            <div>All Players</div>
          </div>
        }
      >
        {filteredTeam.map((seasonTeam) => {
          return (
            <ListboxItem key={seasonTeam.teamid}>
              <div className="flex gap-2 items-center">
                <TeamImage
                  imageClass="w-8 h-8 bg-slate-100"
                  team={seasonTeam.team}
                  textClass="text-center font-medium text-xl font-thin text-zinc-800"
                />
                <div> {seasonTeam.team?.name}</div>
              </div>
            </ListboxItem>
          );
        })}
      </Listbox>
    </div>
  );
};
