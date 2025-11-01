'use client';

import { Box } from '@chakra-ui/react';

export default function GradientBG() {
  return (
    <Box
      position="absolute"
      inset={0}
      zIndex={0}
      pointerEvents="none"
      style={{
        background: 'linear-gradient(90deg, rgba(240,248,255,1) 0%, rgba(210,230,255,0.8) 35%, rgba(82,134,255,0.7) 100%)',
        opacity: 0.8,
      }}
    />
  );
}


