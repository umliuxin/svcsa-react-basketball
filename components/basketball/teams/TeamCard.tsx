import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface TeamCardProp{
    team: any;
}

const TeamCard: React.FC<TeamCardProp> = ( {team} )=> {
    return (
        <Card key={team.id} isPressable>
            <CardBody className="justify-center items-center h-40 hover:opacity-50">
              <Image
                width={100}
                height={100}
                alt={team.name}
                src={
                  team.logosrc === "http://svcsa.org/uploads/null"
                    ? "http://www.svcsa.org/images/teamlogo.jpg"
                    : team.logosrc
                }  
              />
            </CardBody>
            <CardFooter className="h-15 bg-neutral-300 justify-center">
              <p className="text-small">{team.shortname}</p>
            </CardFooter>
          </Card>
    );
}

export default TeamCard;