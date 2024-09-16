import React from 'react';
import PlayerImage from './PlayerImage';

import { Card, CardBody, CardFooter, Link } from '@nextui-org/react';


interface PlayerCardProp {
  player: BbPlayer;
  params: any;
}

const PlayerCard: React.FC<PlayerCardProp> = ({player, params}) => {
  if(!player) return;

  return (
    <Link key ={player.id} href={`/basketball/${params.competition}/players/${player.id}`}>
    <Card className="relative" isPressable>
      <CardBody className="justify-center items-center overflow-hidden w-full h-40 hover:opacity-50">
        <PlayerImage player={player} imageClass="w-full" />
      </CardBody>
      <CardFooter className="h-10 justify-center bg-slate-100">
        <p className="text-small">{player.name}</p>
      </CardFooter>
    </Card>
    </Link>
  );
}

export default PlayerCard;