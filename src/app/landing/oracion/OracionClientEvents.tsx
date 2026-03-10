"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function OracionLandingTracker() {
  useEffect(() => {
    posthog.capture("oracion_landing_viewed");
  }, []);

  return null;
}

export function trackOracionCtaClick(location: string) {
  posthog.capture("oracion_cta_clicked", {
    location,
    page: "oracion_landing",
    destination: "https://www.skool.com/conecta-con-dios-2729/about",
  });
}

export function trackOracionVideoPlay() {
  posthog.capture("oracion_hero_video_played", { page: "oracion_landing" });
}

export function trackFaqItemOpened(question: string) {
  posthog.capture("faq_item_opened", {
    question,
    page: "oracion_landing",
  });
}
