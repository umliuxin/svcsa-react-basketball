"use client";

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
} from "@nextui-org/react";


import { BasketballScoreIcon } from "./shared/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar,  } from "@fortawesome/free-regular-svg-icons";
import {
  faRankingStar,
  faChevronDown,
  faPeopleGroup,
  faDatabase,
  faBasketball,
} from "@fortawesome/free-solid-svg-icons";


import Image from "next/image";

export default function GlobalNav() {

  const icons = {
    score: <BasketballScoreIcon fill="currentColor" size={36} />,

    chevron: <FontAwesomeIcon fixedWidth icon={faChevronDown} size="sm" />,
    schedule: <FontAwesomeIcon fixedWidth icon={faCalendar} size="xl" />,
    standing: <FontAwesomeIcon fixedWidth icon={faRankingStar} size="xl" />,
    player: <FontAwesomeIcon fixedWidth icon={faPeopleGroup} size="xl" />,
    team: <FontAwesomeIcon fixedWidth icon={faBasketball} size="xl" />,
    stat: <FontAwesomeIcon fixedWidth icon={faDatabase} size="xl" />,
  };

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
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Basketball Men
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Competition submenu"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="Checkout match schedule"
              startContent={icons.schedule}
            >
              Schedule
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Checkout match result"
              startContent={icons.score}
            >
              Results
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="Checkout seaon standing"
              startContent={icons.standing}
            >
              Standing
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Checkout Teams"
              startContent={icons.team}
            >
              Teams
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Checkout players"
              startContent={icons.player}
            >
              Players
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Overcome any challenge with a supporting team ready to respond."
              startContent={icons.stat}
            >
              Statastics
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">田径网站</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Join the league
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
