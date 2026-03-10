"use client";

import { trackOracionVideoPlay } from "./OracionClientEvents";

export function OracionHeroVideo() {
  return (
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-[2px] shadow-[0_24px_50px_-32px_rgba(54,57,114,0.75)] sm:max-w-[520px]">
      <video
        src="https://media.suivelas.com/oracion"
        controls
        playsInline
        preload="metadata"
        onPlay={trackOracionVideoPlay}
        className="aspect-video w-full bg-[#0f1328]"
      />
    </div>
  );
}
