"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackOracionCtaClick } from "./OracionClientEvents";

interface OracionCtaButtonProps {
  href: string;
  label: string;
  className?: string;
  children?: React.ReactNode;
  location: string;
}

export function OracionCtaButton({
  href,
  label,
  className,
  children,
  location,
}: OracionCtaButtonProps) {
  return (
    <Button asChild className={className} onClick={() => trackOracionCtaClick(location)}>
      <Link href={href}>{children ?? label}</Link>
    </Button>
  );
}
