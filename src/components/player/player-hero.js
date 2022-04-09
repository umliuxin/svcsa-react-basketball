import React from 'react';
import { Box, Image, Heading } from 'grommet';

export default function PlayerHero(props) {

  if (!props.player) {
    return 'No Player Found'
  }
  return (
    <Box
      direction="row"
      border={{ color: 'brand', size: 'large' }}
      pad="medium"
    >
      <Image
        fit="cover"
        src={`http://svcsa.org/uploads/${props.player.PlayerPhotoSrc}`}
      />

      <Heading margin="none">{props.player.PlayerName}</Heading>
    </Box>
  );
}
