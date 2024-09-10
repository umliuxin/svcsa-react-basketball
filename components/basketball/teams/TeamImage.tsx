'use client';

import React from 'react';
import { Image } from '@nextui-org/react';
import { useState } from 'react';

interface TeamImageProp {
  team: BbSeasonTeam['team'];
  imageClass?: string;
  textClass?:string;
}

const TeamImage: React.FC<TeamImageProp> = ({
  team,
  imageClass,
  textClass,
}) => {
  const [imageLoadingError, setImageLoadingError] = useState(false);
  if (!team)
    return (
      <p className="absolute font-medium text-8xl font-thin text-zinc-800">
        Team
      </p>
    );

  const hasImage =
    team.logosrc &&
    !team.logosrc.includes('null') &&
    team.logosrc !== 'http://www.svcsa.org/uploads/';

  if (hasImage && !imageLoadingError) {
    return (
      <Image
        loading="lazy"
        className={imageClass}
        alt={team.name}
        src={team.logosrc}
        onError={() => {
          setImageLoadingError(true);
        }}
      />
    );
  }
  return (
    <div className={imageClass + ' relative flex items-center justify-center'}>
      <p className={textClass}>
        {team.shortname.substring(0, 2).toUpperCase()}
      </p>
    </div>
  );
};

export default TeamImage;
