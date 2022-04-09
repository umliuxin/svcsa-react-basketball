import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../utils/api/index';
import PlayerHero from '../../components/player/player-hero';

export default function PlayerPage() {
  let params = useParams();

  const [player, setPlayer] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchData(`/bbplayer/${params.playerId}/season/13`).then((data) => {
      setPlayer(data);
      setIsLoaded(true);
    });
  }, [params.playerId]);
  
  if (isLoaded){
    return (
      <PlayerHero player={player} />
    );
  } else {
    return 'LOADING'
  }

    
}
