"use client";

import { COMPETITIONID_TO_GROUPNAME } from "@/utils/variables";
import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { BasketballScoreIcon } from "@/components/shared/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  faRankingStar,
  faChevronDown,
  faPeopleGroup,
  faDatabase,
  faBasketball,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchParams, useRouter } from "next/navigation";

interface SeasonMenuProps {
  season: BbSeason;
  isRecentSeason: boolean;
}

const SeasonMenu: React.FC<SeasonMenuProps> = ({ season, isRecentSeason }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const icons = {
    score: <BasketballScoreIcon fill="currentColor" size={100} />,
    chevron: <FontAwesomeIcon fixedWidth icon={faChevronDown} size="sm" />,
    schedule: <FontAwesomeIcon fixedWidth icon={faCalendar} size="6x" />,
    standing: <FontAwesomeIcon fixedWidth icon={faRankingStar} size="6x" />,
    player: <FontAwesomeIcon fixedWidth icon={faPeopleGroup} size="6x" />,
    team: <FontAwesomeIcon fixedWidth icon={faBasketball} size="6x" />,
    stat: <FontAwesomeIcon fixedWidth icon={faDatabase} size="6x" />,
    list: <FontAwesomeIcon fixedWidth icon={faList} size="6x" />,
  };
  return (
    <section className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
      <Card
        className="relative"
        isPressable
        onPress={() => {
          router.push(
            `/basketball/${
              COMPETITIONID_TO_GROUPNAME[season.competitionid]
            }/matches?${new URLSearchParams(searchParams?.toString())}`
          );
        }}
      >
        <CardBody className="justify-center items-center h-60 hover:opacity-50 overflow-hidden">
          {icons.score}
        </CardBody>
        <CardFooter className="h-10 justify-center bg-slate-100">
          <p className="text-small">Results</p>
        </CardFooter>
      </Card>

      <Card
        className="relative"
        isPressable
        onPress={() => {
          router.push(
            `/basketball/${
              COMPETITIONID_TO_GROUPNAME[season.competitionid]
            }/standing?${new URLSearchParams(searchParams?.toString())}`
          );
        }}
      >
        <CardBody className="justify-center items-center h-60 hover:opacity-50 overflow-hidden">
          {icons.standing}
        </CardBody>
        <CardFooter className="h-10 justify-center bg-slate-100">
          <p className="text-small">Standing</p>
        </CardFooter>
      </Card>

      {isRecentSeason && (
        <Card
          className="relative"
          isPressable
          onPress={() => {
            router.push(
              `/basketball/${
                COMPETITIONID_TO_GROUPNAME[season.competitionid]
              }/schedules?${new URLSearchParams(searchParams?.toString())}`
            );
          }}
        >
          <CardBody className="justify-center items-center h-60 hover:opacity-50 overflow-hidden">
            {icons.schedule}
          </CardBody>
          <CardFooter className="h-10 justify-center bg-slate-100">
            <p className="text-small">Schedule</p>
          </CardFooter>
        </Card>
      )}

      <Card
        className="relative"
        isPressable
        onPress={() => {
          router.push(
            `/basketball/${
              COMPETITIONID_TO_GROUPNAME[season.competitionid]
            }/teams?${new URLSearchParams(searchParams?.toString())}`
          );
        }}
      >
        <CardBody className="justify-center items-center h-60 hover:opacity-50 overflow-hidden">
          {icons.team}
        </CardBody>
        <CardFooter className="h-10 justify-center bg-slate-100">
          <p className="text-small">Teams</p>
        </CardFooter>
      </Card>

      <Card
        className="relative"
        isPressable
        onPress={() => {
          router.push(
            `/basketball/${
              COMPETITIONID_TO_GROUPNAME[season.competitionid]
            }/players?${new URLSearchParams(searchParams?.toString())}`
          );
        }}
      >
        <CardBody className="justify-center items-center h-60 hover:opacity-50 overflow-hidden">
          {icons.player}
        </CardBody>
        <CardFooter className="h-10 justify-center bg-slate-100">
          <p className="text-small">Players</p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default SeasonMenu;
