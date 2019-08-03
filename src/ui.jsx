import React from 'react';
import Image from './components/primatives/image';

export default function (platform) {
  return (
    <Image
      src="https://dummyimage.com/100/ffffff/000000"
      platform={platform}
      x={0}
      y={0}
    />
  );
}
