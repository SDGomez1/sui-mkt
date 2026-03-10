"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";

import { trackOracionVideoPlay, trackOracionVideoUnmuted } from "./OracionClientEvents";

export function OracionHeroVideo() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastTimeRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(video.muted);
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          const mutedAttempt = video.play();
          if (mutedAttempt) {
            mutedAttempt
              .then(() => {
                setIsPlaying(true);
              })
              .catch(() => {
                setIsPlaying(false);
              });
          }
        });
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      setIsFullscreen(document.fullscreenElement === wrapper);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
      return;
    }

    video.pause();
    setIsPlaying(false);
  }, []);

  const handleToggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (!video.muted) {
      trackOracionVideoUnmuted();
    }
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }

    if (wrapper.requestFullscreen) {
      void wrapper.requestFullscreen();
    }
  }, []);

  const handleSeeking = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = lastTimeRef.current;
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    lastTimeRef.current = video.currentTime;
    if (video.duration) {
      setProgress(video.currentTime / video.duration);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[2px] shadow-[0_24px_50px_-32px_rgba(54,57,114,0.75)] sm:max-w-[520px]"
    >
      <video
        ref={videoRef}
        src="https://media.suivelas.com/oracion"
        autoPlay
        playsInline
        preload="metadata"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        onPlay={(event) => {
          setIsPlaying(true);
          trackOracionVideoPlay();
        }}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => {
          const video = videoRef.current;
          if (!video) return;
          setIsMuted(video.muted);
        }}
        onLoadedMetadata={() => {
          const video = videoRef.current;
          if (!video) return;
          if (video.duration) {
            setProgress(video.currentTime / video.duration);
          }
        }}
        onSeeking={handleSeeking}
        onTimeUpdate={handleTimeUpdate}
        onClick={handleTogglePlay}
        className="aspect-video w-full bg-[#0f1328]"
      />

      {isMuted && isPlaying ? (
        <button
          type="button"
          onClick={handleToggleMute}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 px-3 text-center sm:gap-3"
          aria-label="Activar sonido"
        >
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-[#1b1d33] shadow-[0_16px_34px_-20px_rgba(0,0,0,0.55)]">
            <span className="absolute inset-0 rounded-full bg-white/60 opacity-80 animate-ping" />
            <VolumeX className="relative h-6 w-6" strokeWidth={2.2} />
          </span>
          <span className="w-[88vw] max-w-[260px] rounded-2xl bg-[#101428]/90 px-3 py-2 text-[10px] font-semibold uppercase leading-4 tracking-[0.05em] text-white shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)] sm:w-auto sm:rounded-full sm:px-4 sm:text-sm sm:leading-5 sm:tracking-[0.08em]">
            Tu video se esta reproduciendo has click para escuchar
          </span>
        </button>
      ) : null}

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40">
        <div
          className="h-full bg-white transition-[width] duration-150"
          style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }}
        />
      </div>

      {!isMuted ? (
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleTogglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b1d33] shadow-[0_10px_22px_-16px_rgba(0,0,0,0.45)] transition hover:bg-white"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" strokeWidth={2.2} />
            ) : (
              <Play className="h-4 w-4 translate-x-[1px]" strokeWidth={2.2} />
            )}
          </button>
          <button
            type="button"
            onClick={handleToggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b1d33] shadow-[0_10px_22px_-16px_rgba(0,0,0,0.45)] transition hover:bg-white"
            aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" strokeWidth={2.2} /> : <Volume2 className="h-4 w-4" strokeWidth={2.2} />}
          </button>
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1b1d33] shadow-[0_10px_22px_-16px_rgba(0,0,0,0.45)] transition hover:bg-white"
            aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            <Maximize2 className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
