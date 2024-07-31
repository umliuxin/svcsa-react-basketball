import React from 'react';
import PlayerImage from './PlayerImage';

import { Card, CardBody, CardFooter } from '@nextui-org/react';


interface PlayerCardProp {
  player: BbPlayer;
}

const PlayerCard: React.FC<PlayerCardProp> = ({player}) => {
  if(!player) return;

  return (
    <Card key={player.id} className="relative" isPressable>
      <CardBody className="justify-center items-center overflow-hidden w-full h-40 hover:opacity-50">
        <PlayerImage player={player} imageClass="w-full" />
      </CardBody>
      <CardFooter className="h-10 justify-center bg-slate-100">
        <p className="text-small">{player.name}</p>
      </CardFooter>
    </Card>
  );
}

export default PlayerCard;