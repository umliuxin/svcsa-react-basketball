import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useState } from "react";

interface TeamCardProp {
  team: any;
}

const TeamCard: React.FC<TeamCardProp> = ({ team }) => {
  const [visibility, setVisibility] = useState("invisible");
  return (
    <Card key={team.id} className="relative" isPressable>
      <CardBody className="justify-center items-center h-40 hover:opacity-50">
        <Image
          width={100}
          height={100}
          alt={team.name}
          src={team.logosrc}
          onError={() => {
            setVisibility("visible");
          }}
        />
        <p className={`${visibility} absolute font-medium text-6xl`}>{team.shortname.substring(0,1).toUpperCase()}</p>
      </CardBody>
      <CardFooter className="h-15 bg-neutral-300 justify-center">
        <p className="text-small">{team.shortname}</p>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
