"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

import posthog from "posthog-js";

import { cn } from "@/lib/utils";
import { linktreeLinks, type LinktreeLink } from "./linktree-links";

const linkAccentClasses: Record<LinktreeLink["id"], string> = {
  prayer_guide_free: "from-[#585ca6] via-[#6f73c9] to-[#8c89d9]",
  prayer_course_full: "from-[#4c4f96] via-[#5e63b8] to-[#7e83d4]",
  youtube_channel: "from-[#595ea9] via-[#767ad1] to-[#9aa0eb]",
  tiktok_profile: "from-[#49548d] via-[#5863ab] to-[#7887cf]",
  instagram_profile: "from-[#4f579e] via-[#6974c2] to-[#94a0e6]",
};

export default function LinktreeClient() {
  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    if (hasTrackedViewRef.current) {
      return;
    }

    hasTrackedViewRef.current = true;

    try {
      posthog.capture("linktree_viewed", {
        page: "linktree",
        link_count: linktreeLinks.length,
      });
    } catch {
      // Ignore analytics errors and keep the page interactive.
    }
  }, []);

  const handleLinkClick = (link: LinktreeLink) => {
    try {
      posthog.capture("linktree_link_clicked", {
        page: "linktree",
        link_id: link.id,
        link_label_es: link.label,
        destination: link.href,
        category: link.category,
      });
    } catch {
      // Ignore analytics errors and allow the external link to open.
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="w-full flex justify-center items-center my-4 gap-4">
        <a
          className="bg-white size-14 flex items-center justify-center rounded-full"
          target="_blank"
          href="https://www.instagram.com/sui.velas/"
        >
          <FaInstagram className="size-8 shrink-0 text-[#585ca6]"></FaInstagram>
        </a>
        <a
          className="bg-white size-14 flex items-center justify-center rounded-full"
          target="_blank"
          href="https://www.tiktok.com/@suivelas_col"
        >
          <FaTiktok className="size-8 shrink-0 text-[#585ca6]"></FaTiktok>
        </a>
      </div>
      <div className="space-y-3">
        {linktreeLinks.map((link, index) => (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick(link)}
            className={cn(
              "group relative block overflow-hidden rounded-xl border border-[#dfe1ff] bg-white px-5 py-2 shadow-[0_20px_44px_-34px_rgba(60,67,138,0.45)] transition duration-200 hover:-translate-y-0.5 hover:border-[#c8cdfd] hover:shadow-[0_28px_56px_-36px_rgba(60,67,138,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#585ca6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f4ff]",
            )}
          >
            <div className="flex items-start gap-4 justify-center">
              <div className="min-w-0 flex-1">
                <h2 className="mt-2  font-semibold leading-6 text-[#1c2142] ">
                  {link.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#4f567f] sm:text-[0.96rem]">
                  {link.description}
                </p>
              </div>
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#d8dcff] bg-[#fafaff] text-[#585ca6] transition group-hover:border-[#c0c7ff] group-hover:bg-[#f4f5ff]">
                <ArrowUpRight className="size-4" strokeWidth={2.3} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
