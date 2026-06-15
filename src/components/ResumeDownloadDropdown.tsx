import { useEffect, useId, useRef, useState } from "react";

export interface ResumeDownloadLink {
  href: string;
  label: string;
  shortLabel?: string;
}

interface ResumeDownloadDropdownProps {
  links: ResumeDownloadLink[];
  label: string;
  tone?: "default" | "inverted";
  menuAlign?: "left" | "right";
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export default function ResumeDownloadDropdown({
  links,
  label,
  tone = "default",
  menuAlign = "right",
  compact = false,
  iconOnly = false,
  className = "",
}: ResumeDownloadDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (links.length === 0) return null;

  const rootClassName = className
    ? `relative ${className}`
    : "relative inline-block";
  const buttonTone =
    tone === "inverted"
      ? "border-white/45 text-white/90 hover:border-white hover:text-white"
      : "border-line-strong text-muted hover:border-accent hover:text-accent";
  const menuTone =
    tone === "inverted"
      ? "border-white/25 bg-ink text-white shadow-raised"
      : "border-line bg-surface text-ink shadow-raised";
  const itemTone =
    tone === "inverted"
      ? "text-white/85 hover:text-white"
      : "text-muted hover:text-accent";
  const menuPosition = menuAlign === "left" ? "left-0" : "right-0";
  const buttonSize = iconOnly
    ? "h-11 w-11 justify-center rounded-full p-0"
    : compact
    ? "justify-center rounded-full px-3 py-2"
    : "justify-center rounded-full px-4 py-3";

  return (
    <div ref={rootRef} className={rootClassName}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={label}
        className={`inline-flex w-full items-center gap-1.5 border bg-transparent text-sm font-semibold transition-colors ${buttonSize} ${buttonTone}`}
      >
        <svg
          className="h-4 w-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
          />
        </svg>
        {!iconOnly && <span>{label}</span>}
        {!iconOnly && (
          <svg
            className={`h-3.5 w-3.5 shrink-0 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className={`absolute ${menuPosition} z-50 mt-2 min-w-56 overflow-hidden rounded-xl border py-1 ${menuTone}`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={encodeURI(link.href)}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 text-left text-sm font-semibold transition-colors ${itemTone}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
