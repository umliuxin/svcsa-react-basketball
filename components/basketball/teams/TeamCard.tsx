import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import { useState } from 'react';

interface TeamCardProp {
  team: BbSeasonTeam["team"];
}

const TeamCard: React.FC<TeamCardProp> = ({ team }) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);

  if(!team) return;

  const hasImage =
    team.logosrc &&
    !team.logosrc.includes('null') &&
    team.logosrc !== 'http://www.svcsa.org/uploads/';

  return (
    <Card key={team.id} className="relative" isPressable>
      <CardBody className="justify-center items-center h-40 hover:opacity-50">
        {hasImage && !imageLoadingError ? (
          <Image
            loading="lazy"
            className="w-full"
            alt={team.name}
            src={team.logosrc}
            onError={() => {
              setImageLoadingError(true);
            }}
          />
        ) : (
          <p className="absolute font-medium text-8xl font-thin text-zinc-800">
            {team.shortname.substring(0, 1).toUpperCase()}
          </p>
        )}
      </CardBody>
      <CardFooter className="h-10 justify-center bg-slate-100">
        <p className="text-small">{team.shortname}</p>
      </CardFooter>
    </Card>
  );
};

export default TeamCard;
