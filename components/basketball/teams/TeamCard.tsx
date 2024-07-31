import { Card, CardBody, CardFooter,  } from '@nextui-org/react';
import TeamImage from './TeamImage';

interface TeamCardProp {
  team: BbSeasonTeam["team"];
}

const TeamCard: React.FC<TeamCardProp> = ({ team }) => {

  if(!team) return;

  return (
    <Card key={team.id} className="relative" isPressable>
      <CardBody className="justify-center items-center h-40 hover:opacity-50">
        <TeamImage team={team} />
      </CardBody>
      <CardFooter className="h-10 justify-center bg-slate-100">
        <p className="text-small">{team.shortname}</p>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
