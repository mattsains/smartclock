import React from 'react';
import Image from './components/primatives/image';
import Text from './components/primatives/text';

export default function (platform) {
  const iconSize = 180;
  const iconY = (320 - iconSize) / 2;

  return [
    (<Image
      key="icon"
      src="assets/sunny.png"
      platform={platform}
      x={0}
      y={iconY}
      width={iconSize}
      height={iconSize}
    />),
    (<Text font={`${iconSize}px Serif`} x={180} y={iconY} textBaseline="top" style="white" key="temp" text="15°C" />),
  ];
}
