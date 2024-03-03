"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@nextui-org/react";
import Image from "next/image";


export default function GlobalNav() {
  return (
    <Navbar maxWidth="xl">
      <NavbarBrand className="max-w-fit">
        <Image
          src="/logo.png"
          alt="SVCSA Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
        {/* <p className="font-bold text-inherit pr-3">Official Site</p> */}
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link color="foreground" href="#">
            Games
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Teams
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Players
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Standing
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Seasons
          </Link>
        </NavbarItem>
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