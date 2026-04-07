export type LinktreeCategory = "lead_magnet" | "course" | "social";

export type LinktreeLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  category: LinktreeCategory;
};

export const linktreeLinks: LinktreeLink[] = [
  {
    id: "prayer_guide_free",
    label: "Guía gratis de oración",
    description: "",
    href: "https://suivelas.com/landing/oracionForm",
    category: "lead_magnet",
  },
  {
    id: "prayer_course_full",
    label: "Curso completo de oración",
    description: "",
    href: "https://www.skool.com/conecta-con-dios-2729/about",
    category: "course",
  },
  {
    id: "youtube_channel",
    label: "Aprende en YouTube",
    description: "",
    href: "https://www.youtube.com/@suivelas",
    category: "social",
  },
  ];
