'use client';
import { Player } from '@lottiefiles/react-lottie-player';

export default function LoadingAnimation() {
  return (
    <Player
      autoplay
      loop
      src="/lotties/loading.json"
      style={{ height: '300px', width: '300px' }}
    ></Player>
  );
}
