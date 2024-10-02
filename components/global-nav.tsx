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
} from '@fortawesome/free-solid-svg-icons';
import { COMPETITIONID_TO_GROUPNAME } from '@/utils/variables';

import Image from 'next/image';
interface GlobalNavProps {

  seasons: BbSeason[]
}


const GlobalNav: React.FC<GlobalNavProps> = ({seasons}) => {
  const router = useRouter();

  const icons = {
    score: <BasketballScoreIcon fill="currentColor" size={36} />,

    chevron: <FontAwesomeIcon fixedWidth icon={faChevronDown} size="sm" />,
    schedule: <FontAwesomeIcon fixedWidth icon={faCalendar} size="xl" />,
    standing: <FontAwesomeIcon fixedWidth icon={faRankingStar} size="xl" />,
    player: <FontAwesomeIcon fixedWidth icon={faPeopleGroup} size="xl" />,
    team: <FontAwesomeIcon fixedWidth icon={faBasketball} size="xl" />,
    stat: <FontAwesomeIcon fixedWidth icon={faDatabase} size="xl" />,
  };


  const globalNavData: any[] = seasons.map((season) => {
    const competition = COMPETITIONID_TO_GROUPNAME[season.competitionid];
    return {
      title: competition,
      subMenu: [
        {
          icon: icons.schedule,
          text: "Schedule",
          link: `/basketball/${competition}/schedules`,
        },
        {
          icon: icons.score,
          text: "Results",
          link: `/basketball/${competition}/matches`,
        },
        {
          icon: icons.standing,
          text: "Standing",
          link: `/basketball/${competition}/standing`,
        },
        {
          icon: icons.player,
          text: "Players",
          link: `/basketball/${competition}/players`,
        },
        {
          icon: icons.player,
          text: "Teams",
          link: `/basketball/${competition}/teams`,
        },
      ],
    };
  });

  return (
    <Navbar maxWidth="xl" isBordered className="h-32 bg-[url('/nav-bg.jpg')] bg-cover">
      <NavbarBrand className="max-w-fit">
        <Link href='/basketball'>
        <Image
          src="/logo2.png"
          alt="SVCSA Logo"
          className="dark:invert"
          width={80}
          height={80}
          priority
        />
        <span className='text-white ms-3 me-4 text-4xl font-bold'>SVCSA</span>
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
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium text-white"
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
                  base: 'gap-4',
                }}
                onAction={(idx) => {
                  router.push(group.subMenu[idx].link);
                }}
              >
                {group.subMenu.map((sub: any, idx: number) => {
                  return (
                    <DropdownItem
                      key={idx}
                      description="Checkout match schedule"
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
          <Link href="svcsa.org/ctfc" className="no-underline text-current text-white">
            Track Field
          </Link>
        </NavbarItem>
      </NavbarContent>
      

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" className='bg-sky-100 bg-opacity-80'>
            Join the league
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default GlobalNav;