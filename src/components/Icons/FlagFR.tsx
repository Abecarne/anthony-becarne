import cn from "@/lib/utils";
import type { IconProps } from "./types";

export default function FlagFR({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={cn("stroke-current stroke-2", className)}
      aria-hidden="true"
      focusable="false"
      role="img"
    >
      <rect width="60" height="40" fill="#ED2939" />
      <rect width="40" height="40" fill="#fff" />
      <rect width="20" height="40" fill="#002395" />
    </svg>
  );
}
