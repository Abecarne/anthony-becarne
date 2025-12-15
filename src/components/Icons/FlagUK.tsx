import cn from "@/lib/utils";
import type { IconProps } from "./types";

export default function FlagUK({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={cn("stroke-current stroke-2", className)}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40" stroke="#fff" strokeWidth="8" />
      <path d="M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <rect x="24" width="12" height="40" fill="#fff" />
      <rect y="14" width="60" height="12" fill="#fff" />
      <rect x="27" width="6" height="40" fill="#C8102E" />
      <rect y="17" width="60" height="6" fill="#C8102E" />
    </svg>
  );
}
