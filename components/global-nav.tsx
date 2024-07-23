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
import { ALL_COMPETITION_GROUPS } from '@/utils/variables';

import Image from 'next/image';

export default function GlobalNav() {
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

  const globalNavData: any[] = ALL_COMPETITION_GROUPS.map((competition) => {
    return {
      title: competition,
      subMenu: [
        {
          icon: icons.schedule,
          text: 'Schedule',
          link: `/basketball/${competition}/matches`,
        },
        {
          icon: icons.score,
          text: 'Results',
          link: `/basketball/${competition}/matches`,
        },
        {
          icon: icons.standing,
          text: 'Standing',
          link: `/basketball/${competition}/standing`,
        },
        {
          icon: icons.player,
          text: 'Players',
          link: `/basketball/${competition}/player`,
        },
        {
          icon: icons.player,
          text: 'Teams',
          link: `/basketball/${competition}/teams`,
        },
      ],
    };
  });

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarBrand className="max-w-fit">
        <Image
          src="/logo2.png"
          alt="SVCSA Logo"
          className="dark:invert"
          width={48}
          height={48}
          priority
        />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        {globalNavData.map((group, index) => {
          return (
            <Dropdown key={index} className="pr-4">
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium"
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
          <Link href="svcsa.org/ctfc" className="no-underline text-current">
            Track Field
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Join the league
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
