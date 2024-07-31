'use client';

import React from 'react';
import { Image } from '@nextui-org/react';
import { useState } from 'react';

interface PlayerImageProp {
  player: BbPlayer;
  imageClass?: string;
  textClass?: string;
}

const PlayerImage: React.FC<PlayerImageProp> = ({
  player,
  imageClass,
  textClass,
}) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);
  if (!player) return;

  const hasImage =
    player.photosrc &&
    !player.photosrc.includes('null') &&
    player.photosrc !== 'http://www.svcsa.org/uploads/';

  if (hasImage && !imageLoadingError) {
    return (
      <Image
        loading="lazy"
        className={imageClass}
        alt={player.name}
        src={player.photosrc}
        onError={() => {
          setImageLoadingError(true);
        }}
      />
    );
  }
  return (
    <div className={imageClass + ' relative'}>
      <p className={textClass}>{player.name.substring(0, 1).toUpperCase()}</p>
    </div>
  );
};

export default PlayerImage;
