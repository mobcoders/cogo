'use client';

import { Player } from '@lottiefiles/react-lottie-player';
import { useTheme } from 'next-themes';

export default function LoadingAnimation() {
  const { theme } = useTheme();

  let animationUrl = '/lotties/loading.json';

  if (theme === 'dark') {
    animationUrl = '/lotties/loading-dark.json';
  }

  return (
    <Player
      autoplay
      loop
      src={animationUrl}
      style={{ height: '300px', width: '300px' }}
    ></Player>
  );
}
