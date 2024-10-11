"use client";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import TeamImage from "./TeamImage";
import { COMPETITIONID_TO_GROUPNAME, MEN_OPEN } from "@/utils/variables";
import { useRouter } from "next/navigation";

interface TeamCardProp {
  team: BbSeasonTeam["team"];
  season?: BbSeason;
}

const TeamCard: React.FC<TeamCardProp> = ({ team, season }) => {
  const router = useRouter();
  if (!team) return;

  const competition = season ? COMPETITIONID_TO_GROUPNAME[season?.competitionid] : MEN_OPEN;


  const clickHandler = (): void => {
    router.push(`/basketball/${competition}/teams/${team.id}`);
  };
  return (
    <Card key={team.id} className="relative" isPressable onPress={clickHandler}>
      <CardBody className="justify-center items-center h-60 hover:opacity-50 overflow-hidden">
        <TeamImage team={team} />
      </CardBody>
      <CardFooter className="h-10 justify-center bg-slate-100">
        <p className="text-small">{team.shortname}</p>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
