'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { BasketballScoreIcon } from './shared/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faRankingStar,
  faChevronDown,
  faPeopleGroup,
  faDatabase,
  faBasketball,
  faList
} from '@fortawesome/free-solid-svg-icons';
import {
  COMPETITIONID_TO_GROUPNAME,
  MEN_OPEN,
  WOMEN_OPEN,
} from "@/utils/variables";
import Image from 'next/image';

interface GlobalNavProps {

  seasons: BbSeason[]
}


const GlobalNav: React.FC<GlobalNavProps> = ({seasons}) => {
  const router = useRouter();

  const icons = {
    score: (
      <BasketballScoreIcon fill="currentColor" size={32} />
    ),
    chevron: (
      <FontAwesomeIcon
        fixedWidth
        icon={faChevronDown}
        size="sm"
      />
    ),
    schedule: (
      <FontAwesomeIcon
        fixedWidth
        icon={faCalendar}
        size="xl"
      />
    ),
    standing: (
      <FontAwesomeIcon
        fixedWidth
        icon={faRankingStar}
        size="xl"
      />
    ),
    player: (
      <FontAwesomeIcon
        fixedWidth
        icon={faPeopleGroup}
        size="xl"
      />
    ),
    team: (
      <FontAwesomeIcon
        fixedWidth
        icon={faBasketball}
        size="xl"
      />
    ),
    stat: (
      <FontAwesomeIcon
        fixedWidth
        icon={faDatabase}
        size="xl"
      />
    ),
    list: (
      <FontAwesomeIcon
        fixedWidth
        icon={faList}
        size="xl"
      />
    ),
  };

  const getCompetitionTitle = (competition: string) => {
    switch (competition) {
      case MEN_OPEN:
        return "Men's league";
      case WOMEN_OPEN:
        return "Women's league";
      default:
        break;
    }
    return '';
  }
  const globalNavData: any[] = seasons.map((season) => {
    const competition = COMPETITIONID_TO_GROUPNAME[season.competitionid];
    return {
      title: getCompetitionTitle(competition),
      subMenu: [
        {
          icon: icons.list,
          text: "Home",
          link: `/basketball/${competition}/`,
          subtitle: "Overview of the competition and latest news",
        },
        {
          icon: icons.score,
          text: "Results",
          link: `/basketball/${competition}/matches`,
          subtitle: "Recent match scores and results",
        },
        {
          icon: icons.standing,
          text: "Standing",
          link: `/basketball/${competition}/standing`,
          subtitle: "Current team rankings and positions",
        },
        {
          icon: icons.schedule,
          text: "Schedule",
          link: `/basketball/${competition}/schedules`,
          subtitle: "Upcoming matches and fixtures",
        },
        {
          icon: icons.team,
          text: "Teams",
          link: `/basketball/${competition}/teams`,
          subtitle: "Details and statistics for all teams",
        },
        {
          icon: icons.player,
          text: "Players",
          link: `/basketball/${competition}/players`,
          subtitle: "Player profiles and stats",
        },
      ],
    };
  });

  return (
    <Navbar maxWidth="xl" isBordered className="h-32 bg-gray-300">
      <NavbarBrand className="max-w-fit">
        <Link href="/basketball">
          <Image
            src="/logo.png"
            alt="SVCSA Logo"
            className="dark:invert"
            width={80}
            height={80}
            priority
          />
          <span className="text-gray-800 ms-3 me-4 text-4xl font-bold">
            SVCSA
          </span>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        {globalNavData.map((group, index) => {
          return (
            <Dropdown key={index} className="pr-4">
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium text-gray-800"
                    endContent={icons.chevron}
                    radius="sm"
                    variant="light"
                  >
                    {group.title}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label="Competition submenu"
                className="w-[340px]"
                itemClasses={{
                  base: "gap-4",
                }}
                onAction={(idx) => {
                  router.push(group.subMenu[idx].link);
                }}
              >
                {group.subMenu.map((sub: any, idx: number) => {
                  return (
                    <DropdownItem
                      key={idx}
                      description={sub.subtitle}
                      startContent={sub.icon}
                    >
                      {sub.text}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          );
        })}
        <NavbarItem>
          <Link
            href="/basketball/history"
            className="no-underline text-current text-gray-800"
          >
            历史赛季
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link
            href="http://svcsa.org/ctfc"
            className="no-underline text-current text-gray-800"
          >
            田径锦标赛
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default GlobalNav;